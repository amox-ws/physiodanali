// Weekly AI article generation — run by the GitHub Action (.github/workflows/
// weekly-article.yml). Plain Node/tsx (no "server-only", no @/ aliases) so it
// runs in CI without the Next runtime. Mirrors the orchestration of
// src/lib/generate-article.ts; the prompt/schema are shared via article-prompt.
//
// Env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY,
//      ANTHROPIC_MODEL?, RESEND_API_KEY?, NOTIFY_TO?, NOTIFY_FROM?, SITE_URL?
// DRY_RUN=1 → skip the Claude call + insert (just verify env + Supabase).

import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import {
  MODEL,
  SYSTEM,
  ARTICLE_SCHEMA,
  buildPrompt,
  uniqueSlug,
  type GeneratedArticle,
} from "../src/lib/article-prompt";

function need(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

async function main() {
  const supabase = createClient(
    need("NEXT_PUBLIC_SUPABASE_URL"),
    need("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } },
  );
  const dryRun = process.env.DRY_RUN === "1";
  if (!dryRun) need("ANTHROPIC_API_KEY");

  // 1. Next backlog topic (optional).
  const { data: topics } = await supabase
    .from("article_topics")
    .select("id, topic, target_keywords")
    .eq("status", "pending")
    .order("priority", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(1);
  const topic = topics?.[0] ?? null;

  // 2. Existing articles (dedup + internal links).
  const { data: existing } = await supabase.from("articles").select("slug, title");
  const existingList = (existing ?? []) as { slug: string; title: string }[];
  const existingSlugs = new Set(existingList.map((e) => e.slug));

  if (dryRun) {
    console.log(
      `[dry-run] OK — Supabase reachable. topic=${topic?.topic ?? "(none → AI proposes)"}, existing=${existingList.length}`,
    );
    return;
  }

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

  // 4. Unique slug + insert as DRAFT.
  const slug = uniqueSlug(article.slug, existingSlugs);
  const { data: inserted, error } = await supabase
    .from("articles")
    .insert({
      slug,
      title: article.title,
      category: article.category,
      excerpt: article.excerpt,
      read_time: article.read_time,
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

  // 5. Mark topic drafted.
  if (topic) {
    await supabase.from("article_topics").update({ status: "drafted" }).eq("id", topic.id);
  }

  // 6. Notify owner via Resend (optional, best-effort).
  if (process.env.RESEND_API_KEY) {
    const site = process.env.SITE_URL || "https://physiodanali.vercel.app";
    const reviewUrl = `${site}/admin/articles/${inserted.id}`;
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.NOTIFY_FROM || "PhysioDanali <onboarding@resend.dev>",
          to: process.env.NOTIFY_TO || "info@amox.gr",
          subject: `Νέο άρθρο για έλεγχο: ${inserted.title}`,
          html: `<p>Νέο AI άρθρο για έλεγχο.</p><p><strong>${inserted.title}</strong></p><p><a href="${reviewUrl}">Έλεγχος &amp; δημοσίευση →</a></p>`,
        }),
      });
    } catch (e) {
      console.error("[email] failed", e);
    }
  }

  console.log(
    "✓ Draft created:",
    JSON.stringify({ id: inserted.id, slug: inserted.slug, title: inserted.title }),
  );
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("Generation failed:", e instanceof Error ? e.message : e);
    process.exit(1);
  });
