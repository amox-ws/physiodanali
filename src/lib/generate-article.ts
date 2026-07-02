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
  type UnsplashPick,
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

  // 4. Unique slug (also used as the cover-image filename).
  const candidate = uniqueSlug(article.slug, existingSlugs);

  // 5. Auto cover: pick a free Unsplash photo, download it compressed to webp,
  //    and re-host it in our own Storage so the article self-hosts the image
  //    instead of hotlinking Unsplash (null if no key / no match → client
  //    uploads one in the editor).
  const image = await storeCover(
    supabase,
    await unsplashImage(article.image_query),
    candidate,
  );

  // 6. Insert as DRAFT (never auto-published).
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

  // 7. Mark topic drafted + notify the owner (never throws).
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

/**
 * Download the picked Unsplash photo compressed to WebP (via Imgix params) and
 * re-host it in the `article-images` Storage bucket, returning our own public
 * URL. Best-effort: on any failure it falls back to the compressed hotlink,
 * then to null — a broken cover must never fail article generation. Also pings
 * Unsplash's download endpoint per their API guidelines.
 */
async function storeCover(
  supabase: ReturnType<typeof createServiceClient>,
  pick: UnsplashPick | null,
  slug: string,
): Promise<string | null> {
  if (!pick) return null;

  // Imgix: auto format, cap width at 1600, quality 70, force WebP.
  const sep = pick.raw.includes("?") ? "&" : "?";
  const compressed = `${pick.raw}${sep}auto=format&fit=max&w=1600&q=70&fm=webp`;

  // Unsplash API guideline: trigger the download endpoint on use (fire-and-forget).
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (pick.downloadLocation && key) {
    fetch(pick.downloadLocation, {
      headers: { Authorization: `Client-ID ${key}` },
    }).catch(() => {});
  }

  try {
    const res = await fetch(compressed, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) return compressed;
    const bytes = new Uint8Array(await res.arrayBuffer());
    const path = `covers/${slug}-${Date.now()}.webp`;
    const { error } = await supabase.storage
      .from("article-images")
      .upload(path, bytes, { contentType: "image/webp", upsert: true });
    if (error) return compressed; // fall back to the compressed hotlink
    return supabase.storage.from("article-images").getPublicUrl(path).data
      .publicUrl;
  } catch {
    return compressed;
  }
}
