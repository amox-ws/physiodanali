// Shared AI-article generation prompt + schema. NO imports / no "server-only"
// on purpose, so it runs both inside Next (the /api/cron route) AND in a plain
// Node/CI script (scripts/generate-article.ts → the weekly GitHub Action).

export const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

// Real internal routes the article may link to (for SEO internal linking).
export const INTERNAL_ROUTES = [
  ["/chiropractic", "Χειροπρακτική"],
  ["/lymphatic", "Λεμφικό / Brazilian drainage"],
  ["/clinical-pilates", "Clinical Pilates"],
  ["/home-care", "Φυσικοθεραπεία κατ' οίκον"],
  ["/neck-pain", "Αυχεναλγία"],
  ["/low-back-pain", "Οσφυαλγία"],
  ["/hip-pain", "Πόνος ισχίου"],
  ["/contact", "Επικοινωνία / κλείστε ραντεβού"],
] as const;

export const ARTICLE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    slug: { type: "string", description: "english kebab-case" },
    category: { type: "string" },
    excerpt: { type: "string" },
    read_time: { type: "string", description: 'π.χ. "7 λεπτά"' },
    image_query: {
      type: "string",
      description:
        "3-5 ΑΓΓΛΙΚΕΣ λέξεις που περιγράφουν ΣΥΓΚΕΚΡΙΜΕΝΗ σκηνή για το θέμα του άρθρου (Unsplash): ποιος + μέρος σώματος/δραστηριότητα + πλαίσιο. Π.χ. 'runner holding knee on trail', 'woman stretching hip on yoga mat', 'senior walking with cane park'. ΟΧΙ γενικές λέξεις μόνες τους ('physiotherapy', 'therapy', 'pain', 'treatment') — βγάζουν την ίδια φωτογραφία σε κάθε άρθρο. Χωρίς κείμενο/λογότυπα/αίμα.",
    },
    sections: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          heading: { type: "string", description: "κενό '' για την εισαγωγική ενότητα" },
          body: { type: "string" },
        },
        required: ["heading", "body"],
      },
    },
    meta_title: { type: "string" },
    meta_description: { type: "string" },
    keywords: { type: "array", items: { type: "string" } },
    faq: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          question: { type: "string" },
          answer: { type: "string" },
        },
        required: ["question", "answer"],
      },
    },
  },
  required: [
    "title",
    "slug",
    "category",
    "excerpt",
    "read_time",
    "image_query",
    "sections",
    "meta_title",
    "meta_description",
    "keywords",
    "faq",
  ],
} as const;

export const SYSTEM = `Είσαι ο συντάκτης περιεχομένου του blog του PhysioDanali — Κωνσταντίνος Δανάλης, αδειούχος Φυσικοθεραπευτής & Χειροπρακτικός, που προσφέρει φυσικοθεραπεία κατ' οίκον σε Βούλα, Βουλιαγμένη, Βάρη, Γλυφάδα και Άλιμο.

Κοινό: ασθενείς (μη ειδικοί). Γλώσσα: ελληνικά, απλά και ζεστά, επιστημονικά τεκμηριωμένα — όχι φόρτωση με ιατρική ορολογία.

ΚΑΝΟΝΕΣ ΑΣΦΑΛΕΙΑΣ (αυστηροί):
- ΠΟΤΕ εγγυήσεις ή απόλυτες υποσχέσεις θεραπείας («εγγυημένη θεραπεία», «100%», «μόνιμη λύση»). Χρησιμοποίησε «συνήθως», «στις περισσότερες περιπτώσεις», «μπορεί να».
- Μη δίνεις εξατομικευμένη διάγνωση ή δοσολογία· πρότεινε αξιολόγηση από επαγγελματία.
- ΜΗΝ επινοείς στατιστικά, ποσοστά ή μελέτες με ψεύτικα νούμερα. Μίλα σε γενικές, τεκμηριωμένες γραμμές.
- Πρόσθεσε ήπιο disclaimer όπου ταιριάζει (το άρθρο δεν αντικαθιστά εξατομικευμένη αξιολόγηση).

SEO/GEO:
- meta_title έως ~60 χαρακτήρες· meta_description έως ~155.
- 5-8 ελληνικά keywords.
- Τοπικό SEO: ανάφερε φυσικά τις περιοχές και το «κατ' οίκον» όπου ταιριάζει — χωρίς keyword stuffing.
- 3-5 ερωτήσεις FAQ (για AI search / FAQPage).
- Internal links μέσα στο body με markdown [κείμενο](/route), 2-4 σύνδεσμοι, ΜΟΝΟ προς routes από τη λίστα που σου δίνεται.

ΜΟΡΦΗ sections:
- Πρώτη ενότητα: heading="" (εισαγωγή 1-2 παράγραφοι).
- Έπειτα 5-9 ενότητες με heading + body.
- Στο body: παράγραφοι χωρισμένες με κενή γραμμή. Για λίστες, κάθε γραμμή ξεκινά με «• ».
- slug: αγγλικά kebab-case, σχετικό με το θέμα.
- image_query: 3-5 αγγλικές λέξεις που περιγράφουν συγκεκριμένη σκηνή του θέματος (ποιος + μέρος σώματος/δραστηριότητα + πλαίσιο), ΟΧΙ γενικά «physiotherapy/therapy/pain/treatment»· επαγγελματική, μη-γραφική φωτογραφία (όχι αίμα/χειρουργείο/κείμενο).
Επέστρεψε ΜΟΝΟ το δομημένο αντικείμενο.`;

export type GeneratedArticle = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  read_time: string;
  image_query: string;
  sections: { heading: string; body: string }[];
  meta_title: string;
  meta_description: string;
  keywords: string[];
  faq: { question: string; answer: string }[];
};

export function buildPrompt(
  topic: { topic: string; target_keywords: string[] } | null,
  existing: { slug: string; title: string }[],
): string {
  const routes = INTERNAL_ROUTES.map(([r, l]) => `  ${r} — ${l}`).join("\n");
  const titles = existing.map((e) => `  - ${e.title} (/articles/${e.slug})`).join("\n");
  const ask = topic
    ? `Γράψε ένα ολοκληρωμένο άρθρο για το θέμα: «${topic.topic}».${
        topic.target_keywords?.length
          ? ` Στόχευσε στα keywords: ${topic.target_keywords.join(", ")}.`
          : ""
      }`
    : `Πρότεινε και γράψε ένα νέο, χρήσιμο άρθρο για ασθενείς, σχετικό με τις υπηρεσίες (φυσικοθεραπεία, χειροπρακτική, λεμφικό, clinical pilates, κατ' οίκον), που ΔΕΝ επικαλύπτει τα υπάρχοντα.`;

  return `${ask}

Routes για internal links (χρησιμοποίησε 2-4, μόνο από εδώ):
${routes}

Υπάρχοντα άρθρα — ΜΗΝ επαναλάβεις θέμα/slug, αλλά μπορείς να συνδέσεις σε σχετικά με [κείμενο](/articles/<slug>):
${titles || "  (κανένα ακόμα)"}`;
}

/**
 * Fetch a relevant landscape photo from Unsplash for the article cover.
 * Returns the image URL (hot-linked CDN) or null. Never throws — if the key
 * is missing or the search fails, the draft simply has no cover (the client
 * can upload one in the editor). Plain fetch so it runs in Node (CI) + Next.
 *
 * Skips photos already used by another article (`usedIds`) and picks randomly
 * among the top unused hits. Taking the #1 result every time gave the same
 * photo to every article with a similar query (6 articles shared one cover).
 */
export type UnsplashPick = {
  id: string;
  raw: string;
  downloadLocation: string | null;
};

const TOP_UNUSED = 6; // random pick among this many top unused hits (relevance)

export async function unsplashImage(
  query: string,
  usedIds: Set<string> = new Set(),
): Promise<UnsplashPick | null> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key || !query?.trim()) return null;
  try {
    for (const page of [1, 2]) {
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query,
      )}&orientation=landscape&per_page=30&page=${page}&content_filter=high`;
      const res = await fetch(url, {
        headers: { Authorization: `Client-ID ${key}` },
      });
      if (!res.ok) return null;
      const data = (await res.json()) as {
        results?: {
          id?: string;
          urls?: { raw?: string; regular?: string };
          links?: { download_location?: string };
        }[];
      };
      const unused = (data.results ?? []).filter(
        (r) => r.id && !usedIds.has(r.id) && (r.urls?.raw ?? r.urls?.regular),
      );
      if (!unused.length) continue;
      const hit = unused[Math.floor(Math.random() * Math.min(TOP_UNUSED, unused.length))];
      // `raw` is the Imgix base URL — accepts ?w=&q=&fm=webp for compression.
      return {
        id: hit.id!,
        raw: (hit.urls?.raw ?? hit.urls?.regular)!,
        downloadLocation: hit.links?.download_location ?? null,
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Storage path for a re-hosted cover. The Unsplash photo id is kept in the
 * filename (slugs never contain "_", so "__" is an unambiguous separator) —
 * that is how `usedUnsplashIds` knows which photos are already taken.
 */
export function coverPath(slug: string, unsplashId: string): string {
  return `covers/${slug}__${unsplashId}.webp`;
}

/** Unsplash ids already used as covers, parsed from the articles' image URLs. */
export function usedUnsplashIds(images: (string | null)[]): Set<string> {
  const ids = new Set<string>();
  for (const img of images) {
    const m = img?.match(/\/covers\/[a-z0-9-]+__([A-Za-z0-9_-]+)\.webp/);
    if (m) ids.add(m[1]);
  }
  return ids;
}

/** Slugify + de-duplicate against existing slugs. */
export function uniqueSlug(raw: string, existingSlugs: Set<string>): string {
  let slug = raw.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
  if (!slug) slug = "arthro";
  let candidate = slug;
  let n = 2;
  while (existingSlugs.has(candidate)) candidate = `${slug}-${n++}`;
  return candidate;
}
