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
 * Two passes. The first asks for the whole article in one tool call — one
 * round trip, and what almost every article needs. But on articles carrying
 * markdown links the model intermittently emits `sections_en` as a *string*
 * of JSON instead of an array, and that string has unescaped quotes inside
 * the bodies, so it cannot be parsed back. Measured: every article with
 * markdown links failed this way, repeatedly; every article without them
 * passed. When that happens we fall back to translating one section at a
 * time — each call then returns a plain string, which the model gets right
 * (9/9 on the article that failed 4/4 in bulk).
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

/** Schema for the per-section fallback: plain strings only, nothing nested. */
const SECTION_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["body_en"],
  properties: { heading_en: { type: "string" }, body_en: { type: "string" } },
} as const;

/** Metadata-only schema, used alongside the per-section pass. */
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
  const block = res.content.find((c) => c.type === "tool_use");
  return block && block.type === "tool_use"
    ? (block.input as Record<string, unknown>)
    : null;
}

/**
 * Fallback path: one call for the metadata, then one per section. Slower, but
 * each response is a flat string the model reliably gets right.
 */
async function translateSectionwise(
  client: Anthropic,
  input: {
    title: string;
    excerpt: string | null;
    category: string | null;
    readTime: string | null;
    sections: ArticleSection[];
  },
): Promise<TranslatedArticle | null> {
  const meta = toolInput(
    await client.messages.create({
      model: MODEL,
      max_tokens: 1000,
      system: SYSTEM,
      tools: [
        {
          name: "emit_meta",
          description: "Return the English title, excerpt, category and read time.",
          input_schema: META_SCHEMA as unknown as Anthropic.Tool["input_schema"],
        },
      ],
      tool_choice: { type: "tool", name: "emit_meta" },
      messages: [
        {
          role: "user",
          content: `Translate these article fields to English.\n\ntitle: ${input.title}\nexcerpt: ${input.excerpt ?? ""}\ncategory: ${input.category ?? ""}\nread_time: ${input.readTime ?? ""}`,
        },
      ],
    }),
  );
  if (typeof meta?.title_en !== "string") {
    console.error("[translate] sectionwise: metadata call failed");
    return null;
  }

  const sections_en: ArticleSection[] = [];
  for (const section of input.sections) {
    const out = toolInput(
      await client.messages.create({
        model: MODEL,
        max_tokens: 8000,
        system: SYSTEM,
        tools: [
          {
            name: "emit_section",
            description: "Return the English translation of one section.",
            input_schema: SECTION_SCHEMA as unknown as Anthropic.Tool["input_schema"],
          },
        ],
        tool_choice: { type: "tool", name: "emit_section" },
        messages: [
          {
            role: "user",
            content: `Heading: ${section.heading ?? ""}\n\nBody:\n${section.body}`,
          },
        ],
      }),
    );
    if (typeof out?.body_en !== "string" || !out.body_en) {
      console.error("[translate] sectionwise: a section came back empty");
      return null;
    }
    sections_en.push({
      ...(typeof out.heading_en === "string" && out.heading_en
        ? { heading: out.heading_en }
        : {}),
      body: out.body_en,
    });
  }

  return {
    title_en: meta.title_en,
    excerpt_en: String(meta.excerpt_en ?? ""),
    category_en: String(meta.category_en ?? ""),
    read_time_en: String(meta.read_time_en ?? ""),
    sections_en,
  };
}

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

    const out = toolInput(res) as TranslatedArticle | null;
    if (!out) {
      console.error("[translate] model returned no tool_use block");
      return null;
    }
    if (out.title_en && Array.isArray(out.sections_en)) return out;

    // sections_en came back as a JSON string (or worse). It is not parseable —
    // the bodies carry unescaped quotes — so retry one section at a time.
    console.warn(
      `[translate] bulk pass gave sections_en as ${typeof out.sections_en}; retrying section by section`,
    );
    return translateSectionwise(client, { ...input, sections });
  } catch (e) {
    console.error("[translate] failed", e);
    return null;
  }
}
