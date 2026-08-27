// One-off backfill: fill the English columns for articles whose publish-time
// translation never landed (/en then falls back to Greek, which is what the
// client reported). Plain Node/tsx — no "server-only", no @/ aliases — same
// shape as generate-article.ts so it runs outside the Next runtime.
//
// The prompt and schema are copied from src/lib/translate-article.ts on
// purpose: that module is server-only, and this script must produce a byte-
// identical result to what publishing would have written.
//
// Env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY
//
//   set -a; . ./.env.local; set +a
//   npx tsx scripts/backfill-en.ts             # ό,τι λείπει
//   npx tsx scripts/backfill-en.ts <slug>...   # συγκεκριμένα
//   DRY_RUN=1 npx tsx scripts/backfill-en.ts   # δείξε τι θα έκανε

import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import { MODEL } from "../src/lib/article-prompt";

type Section = { heading?: string; body: string };
type Translated = {
  title_en: string;
  excerpt_en: string;
  category_en: string;
  read_time_en: string;
  sections_en: Section[];
};

const SYSTEM = `You are a professional medical translator working for a Greek physiotherapy practice.
Translate Greek patient-facing content into natural, clinically accurate British English.

Rules:
- Preserve meaning exactly. Never add, drop or "improve" clinical claims.
- Keep the section structure identical: same number of sections, same order.
- Preserve formatting inside each body verbatim: paragraph breaks (\\n\\n), bullet
  lines starting with "• ", markdown tables (| … |) and markdown links [text](/path).
- Keep internal link paths unchanged (/home-care stays /home-care).
- Keep established brand/method names in English as-is (Brazilian Lymphatic
  Drainage, Clinical Pilates, TECAR, Mulligan, Maitland).
- Write for patients: clear, warm, no jargon where a plain word exists.
- category_en: the English equivalent of the category label (e.g. "Αυχένας" →
  "Neck", "Αθλητική Φυσικοθεραπεία" → "Sports Physiotherapy").
- read_time_en: the same figure in English, formatted "N min" (e.g. "8 λεπτά" →
  "8 min").`;

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["title_en", "excerpt_en", "category_en", "read_time_en", "sections_en"],
  properties: {
    title_en: { type: "string" },
    excerpt_en: { type: "string" },
    category_en: { type: "string" },
    read_time_en: { type: "string" },
    sections_en: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["body"],
        properties: { heading: { type: "string" }, body: { type: "string" } },
      },
    },
  },
} as const;

async function translate(input: {
  title: string;
  excerpt: string | null;
  category: string | null;
  readTime: string | null;
  sections: Section[] | null;
}): Promise<Translated | null> {
  const sections = input.sections ?? [];
  if (!input.title || sections.length === 0) return null;
  const client = new Anthropic();
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    system: SYSTEM,
    tools: [
      {
        name: "emit_translation",
        description: "Return the English translation of the article.",
        input_schema: SCHEMA as unknown as Anthropic.Tool["input_schema"],
      },
    ],
    tool_choice: { type: "tool", name: "emit_translation" },
    messages: [
      {
        role: "user",
        content: `Translate this Greek article to English.\n\n${JSON.stringify(
          {
            title: input.title,
            excerpt: input.excerpt ?? "",
            category: input.category ?? "",
            read_time: input.readTime ?? "",
            sections,
          },
          null,
          2,
        )}`,
      },
    ],
  });
  const block = res.content.find((c) => c.type === "tool_use");
  if (!block || block.type !== "tool_use") return null;
  const out = block.input as Translated;
  if (!out?.title_en || !Array.isArray(out.sections_en)) return null;
  return out;
}

async function main() {
  for (const k of ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "ANTHROPIC_API_KEY"]) {
    if (!process.env[k]) throw new Error(`Λείπει το ${k}`);
  }
  const dry = process.env.DRY_RUN === "1";
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const only = process.argv.slice(2);
  const { data, error } = await db
    .from("articles")
    .select("id,slug,status,title,excerpt,category,read_time,sections,title_en,sections_en")
    .order("updated_at", { ascending: false });
  if (error) throw error;

  const todo = (data ?? []).filter((r) =>
    only.length
      ? only.includes(r.slug as string)
      : !(r.title_en && (r.sections_en as unknown[] | null)?.length),
  );

  console.log(`Προς μετάφραση: ${todo.length}${dry ? "  (DRY RUN)" : ""}\n`);
  let ok = 0;
  const failed: string[] = [];

  for (const r of todo) {
    process.stdout.write(`  ${(r.slug as string).padEnd(42)} `);
    if (dry) { console.log("— θα μεταφραζόταν"); continue; }
    try {
      const en = await translate({
        title: r.title as string,
        excerpt: r.excerpt as string | null,
        category: r.category as string | null,
        readTime: r.read_time as string | null,
        sections: r.sections as Section[] | null,
      });
      if (!en) { console.log("❌ κενή απάντηση"); failed.push(r.slug as string); continue; }
      const { error: e } = await db
        .from("articles")
        .update({
          title_en: en.title_en,
          excerpt_en: en.excerpt_en,
          category_en: en.category_en,
          read_time_en: en.read_time_en,
          sections_en: en.sections_en,
        })
        .eq("id", r.id);
      if (e) { console.log("❌", e.message); failed.push(r.slug as string); continue; }
      console.log(`✅ ${en.title_en.slice(0, 52)}`);
      ok++;
    } catch (e) {
      console.log("❌", (e as Error).message.slice(0, 70));
      failed.push(r.slug as string);
    }
  }
  console.log(`\nΈτοιμα: ${ok} ✅${failed.length ? `   Απέτυχαν: ${failed.join(", ")}` : ""}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
