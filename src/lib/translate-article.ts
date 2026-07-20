import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { MODEL } from "@/lib/article-prompt";

/**
 * Greek → English translation for CMS articles, run at PUBLISH time.
 *
 * Publishing is the right moment: whatever the practitioner edited in the Greek
 * draft is what gets translated, so the two languages can never drift. Re-runs
 * on every publish, so a corrected Greek article yields a corrected English one.
 *
 * Best-effort by design — a failure (no API credit, network, bad output) returns
 * null and is logged. Publishing must never break because a translation didn't
 * come back; the article then simply falls back to the Greek copy on /en, which
 * is exactly the behaviour that existed before.
 */

export type ArticleSection = { heading?: string; body: string };

export type TranslatedArticle = {
  title_en: string;
  excerpt_en: string;
  category_en: string;
  read_time_en: string;
  sections_en: ArticleSection[];
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

export async function translateArticle(input: {
  title: string;
  excerpt: string | null;
  category: string | null;
  readTime: string | null;
  sections: ArticleSection[] | null;
}): Promise<TranslatedArticle | null> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log("[translate] ANTHROPIC_API_KEY not set — skipping translation");
    return null;
  }
  const sections = input.sections ?? [];
  if (!input.title || sections.length === 0) return null;

  try {
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
    if (!block || block.type !== "tool_use") {
      console.error("[translate] model returned no tool_use block");
      return null;
    }
    const out = block.input as TranslatedArticle;
    if (!out?.title_en || !Array.isArray(out.sections_en)) {
      console.error("[translate] malformed translation payload");
      return null;
    }
    return out;
  } catch (e) {
    console.error("[translate] failed", e);
    return null;
  }
}
