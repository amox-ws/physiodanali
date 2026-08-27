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

const SECTION_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["body_en"],
  properties: { heading_en: { type: "string" }, body_en: { type: "string" } },
} as const;

const META_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["title_en", "excerpt_en", "category_en", "read_time_en"],
  properties: {
    title_en: { type: "string" },
    excerpt_en: { type: "string" },
    category_en: { type: "string" },
    read_time_en: { type: "string" },
  },
} as const;

function toolInput(res: Anthropic.Message): Record<string, unknown> | null {
  const b = res.content.find((c) => c.type === "tool_use");
  return b && b.type === "tool_use" ? (b.input as Record<string, unknown>) : null;
}

// Same fallback as src/lib/translate-article.ts: articles with markdown links
// make the model emit sections_en as an unparseable JSON string, so translate
// one section at a time instead — each response is then a flat string.
async function translateSectionwise(
  client: Anthropic,
  input: { title: string; excerpt: string | null; category: string | null; readTime: string | null; sections: Section[] },
): Promise<Translated | null> {
  const meta = toolInput(
    await client.messages.create({
      model: MODEL, max_tokens: 1000, system: SYSTEM,
      tools: [{ name: "emit_meta", description: "Return the English title, excerpt, category and read time.", input_schema: META_SCHEMA as unknown as Anthropic.Tool["input_schema"] }],
      tool_choice: { type: "tool", name: "emit_meta" },
      messages: [{ role: "user", content: `Translate these article fields to English.\n\ntitle: ${input.title}\nexcerpt: ${input.excerpt ?? ""}\ncategory: ${input.category ?? ""}\nread_time: ${input.readTime ?? ""}` }],
    }),
  );
  if (typeof meta?.title_en !== "string") return null;

  const sections_en: Section[] = [];
  for (const sec of input.sections) {
    const out = toolInput(
      await client.messages.create({
        model: MODEL, max_tokens: 8000, system: SYSTEM,
        tools: [{ name: "emit_section", description: "Return the English translation of one section.", input_schema: SECTION_SCHEMA as unknown as Anthropic.Tool["input_schema"] }],
        tool_choice: { type: "tool", name: "emit_section" },
        messages: [{ role: "user", content: `Heading: ${sec.heading ?? ""}\n\nBody:\n${sec.body}` }],
      }),
    );
    if (typeof out?.body_en !== "string" || !out.body_en) return null;
    sections_en.push({ ...(typeof out.heading_en === "string" && out.heading_en ? { heading: out.heading_en } : {}), body: out.body_en });
  }
  return {
    title_en: meta.title_en,
    excerpt_en: String(meta.excerpt_en ?? ""),
    category_en: String(meta.category_en ?? ""),
    read_time_en: String(meta.read_time_en ?? ""),
    sections_en,
  };
}

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
  const out = toolInput(res) as Translated | null;
  if (!out) return null;
  if (out.title_en && Array.isArray(out.sections_en)) return out;
  process.stdout.write("(ανά section) ");
  return translateSectionwise(client, { ...input, sections });
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
      // The model occasionally returns a malformed payload; a plain retry
      // clears it. Three attempts, then give up and report the slug.
      let en: Translated | null = null;
      for (let attempt = 1; attempt <= 3 && !en; attempt++) {
        if (attempt > 1) {
          process.stdout.write(`(retry ${attempt}) `);
          await new Promise((r) => setTimeout(r, 2000));
        }
        en = await translate({
          title: r.title as string,
          excerpt: r.excerpt as string | null,
          category: r.category as string | null,
          readTime: r.read_time as string | null,
          sections: r.sections as Section[] | null,
        });
      }
      if (!en) { console.log("❌ κενή απάντηση μετά από 3 προσπάθειες"); failed.push(r.slug as string); continue; }
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
