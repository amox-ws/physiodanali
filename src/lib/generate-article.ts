import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { createServiceClient } from "@/lib/supabase/service";
import { notifyNewDraft } from "@/lib/notify";
import {
  MODEL,
  SYSTEM,
  ARTICLE_SCHEMA,
  buildPrompt,
  uniqueSlug,
  unsplashImage,
  type GeneratedArticle,
} from "@/lib/article-prompt";

// AI article generation (Phase 5). Picks the next backlog topic, asks Claude to
// write a full Greek article in the exact DB shape (structured outputs), and
// inserts it as a DRAFT (ai_generated=true). Never publishes — the client
// reviews and approves in /admin (human-in-the-loop).
//
// The prompt/schema live in @/lib/article-prompt (shared with the CI script
// scripts/generate-article.ts that the weekly GitHub Action runs).

export type GenerateResult = {
  id: string;
  slug: string;
  title: string;
  usedTopicId: string | null;
};

export async function generateAndInsertArticle(): Promise<GenerateResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("Missing ANTHROPIC_API_KEY");
  }
  const supabase = createServiceClient();

  // 1. Next backlog topic (optional).
  const { data: topics } = await supabase
    .from("article_topics")
    .select("id, topic, target_keywords")
    .eq("status", "pending")
    .order("priority", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(1);
  const topic = topics?.[0] ?? null;

  // 2. Existing articles (dedup + internal-link targets).
  const { data: existing } = await supabase.from("articles").select("slug, title");
  const existingList = (existing ?? []) as { slug: string; title: string }[];
  const existingSlugs = new Set(existingList.map((e) => e.slug));

  // 3. Generate (structured output → exact DB shape).
  const client = new Anthropic();
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    system: SYSTEM,
    output_config: {
      effort: "high",
      format: { type: "json_schema", schema: ARTICLE_SCHEMA },
    },
    messages: [{ role: "user", content: buildPrompt(topic, existingList) }],
  });

  const textBlock = res.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text content returned from model");
  }
  const article = JSON.parse(textBlock.text) as GeneratedArticle;

  // 4. Auto cover image (Unsplash; null if no key / no match → client uploads).
  const image = await unsplashImage(article.image_query);

  // 5. Unique slug + insert as DRAFT (never auto-published).
  const candidate = uniqueSlug(article.slug, existingSlugs);
  const { data: inserted, error } = await supabase
    .from("articles")
    .insert({
      slug: candidate,
      title: article.title,
      category: article.category,
      excerpt: article.excerpt,
      read_time: article.read_time,
      image,
      sections: article.sections,
      meta_title: article.meta_title,
      meta_description: article.meta_description,
      keywords: article.keywords,
      faq: article.faq,
      status: "draft",
      ai_generated: true,
    })
    .select("id, slug, title")
    .single();
  if (error) throw new Error(error.message);

  // 5. Mark topic drafted + notify the owner (never throws).
  if (topic) {
    await supabase.from("article_topics").update({ status: "drafted" }).eq("id", topic.id);
  }
  await notifyNewDraft({ id: inserted.id as string, title: inserted.title as string });

  return {
    id: inserted.id as string,
    slug: inserted.slug as string,
    title: inserted.title as string,
    usedTopicId: topic?.id ?? null,
  };
}
