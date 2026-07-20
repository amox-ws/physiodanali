import "server-only";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { Article, ArticleBody } from "@/lib/content";
import { articles as elArticles, articleBodies as elBodies } from "@/lib/content";
import { articles as enArticles, articleBodies as enBodies } from "@/lib/content.en";
import type { Locale } from "@/lib/i18n";

// ─────────────────────────────────────────────────────────────────────
// Article data access.
//
// Greek (el): reads from Supabase (public.articles, status='published') with
//   a static fallback to content.ts when the DB env vars are absent.
// English (en): the CMS stores Greek only, so the published set still comes
//   from the DB and each slug is swapped for its hand-translated version from
//   content.en.ts when one exists. Slugs without a translation fall through to
//   the Greek copy — the article is then listed and readable at /en rather than
//   silently missing, and later edits to the Greek flow through automatically.
// ─────────────────────────────────────────────────────────────────────

export type ArticleFull = Article & { sections: ArticleBody["sections"] };

const SELECT =
  "slug,title,category,excerpt,read_time,date,image,sections,title_en,excerpt_en,category_en,read_time_en,sections_en";
const REVALIDATE = 3600; // safety net; on-demand via revalidateTag("articles")

type Row = {
  slug: string;
  title: string;
  category: string | null;
  excerpt: string | null;
  read_time: string | null;
  date: string | null;
  image: string | null;
  sections: ArticleBody["sections"] | null;
  title_en: string | null;
  excerpt_en: string | null;
  category_en: string | null;
  read_time_en: string | null;
  sections_en: ArticleBody["sections"] | null;
};

/**
 * Swap a Greek DB row for its English copy. Prefers the translation stored at
 * publish time, then a hand-written one from content.en.ts, then leaves the
 * Greek in place so the article is still listed and readable on /en.
 */
function toEnglish(row: DbArticle): ArticleFull {
  if (row.title_en && row.sections_en?.length) {
    return {
      ...row,
      title: row.title_en,
      excerpt: row.excerpt_en ?? row.excerpt,
      // Card labels live in their own columns — without these the English page
      // showed Greek chips ("ΑΥΧΈΝΑΣ", "8 ΛΕΠΤΑ") above English copy.
      category: row.category_en ?? row.category,
      readTime: row.read_time_en ?? row.readTime,
      sections: row.sections_en,
    };
  }
  return staticArticleFull("en", row.slug) ?? row;
}

function hasSupabase() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

function staticSource(locale: Locale) {
  return locale === "en"
    ? { posts: enArticles.posts, bodies: enBodies }
    : { posts: elArticles.posts, bodies: elBodies };
}

function staticArticleFull(locale: Locale, slug: string): ArticleFull | null {
  const { posts, bodies } = staticSource(locale);
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;
  return { ...post, sections: bodies[slug]?.sections ?? [] };
}

function staticAll(locale: Locale, limit?: number): ArticleFull[] {
  const { posts, bodies } = staticSource(locale);
  const all = posts.map((p) => ({
    ...p,
    sections: bodies[p.slug]?.sections ?? [],
  }));
  return limit ? all.slice(0, limit) : all;
}

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return createClient(url, anon, { auth: { persistSession: false } });
}

type DbArticle = ArticleFull &
  Pick<
    Row,
    "title_en" | "excerpt_en" | "category_en" | "read_time_en" | "sections_en"
  >;

function toArticle(r: Row): DbArticle {
  return {
    slug: r.slug,
    title: r.title,
    category: r.category ?? "",
    excerpt: r.excerpt ?? "",
    readTime: r.read_time ?? "",
    date: r.date ?? "",
    href: `/articles/${r.slug}`,
    image: r.image ?? "",
    sections: r.sections ?? [],
    title_en: r.title_en,
    excerpt_en: r.excerpt_en,
    category_en: r.category_en,
    read_time_en: r.read_time_en,
    sections_en: r.sections_en,
  };
}

// ── Greek: cached Supabase reads ──────────────────────────────────────
const dbPublished = unstable_cache(
  async (limit?: number): Promise<DbArticle[]> => {
    let q = db()
      .from("articles")
      .select(SELECT)
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (limit) q = q.limit(limit);
    const { data, error } = await q;
    if (error) throw error;
    return (data as Row[]).map(toArticle);
  },
  ["articles-published"],
  { tags: ["articles"], revalidate: REVALIDATE },
);

const dbBySlug = unstable_cache(
  async (slug: string): Promise<DbArticle | null> => {
    const { data, error } = await db()
      .from("articles")
      .select(SELECT)
      .eq("status", "published")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    return data ? toArticle(data as Row) : null;
  },
  ["article-by-slug"],
  { tags: ["articles"], revalidate: REVALIDATE },
);

// ── Public, locale-aware getters ──────────────────────────────────────
export async function getPublishedArticles(
  locale: Locale,
  limit?: number,
): Promise<ArticleFull[]> {
  if (!hasSupabase()) return staticAll(locale, limit);
  if (locale !== "en") return dbPublished(limit);
  // English: the CMS stores Greek only, so list what is actually published and
  // swap in the hand-translated version per slug when one exists. Without this
  // merge, newly published CMS articles were missing from /en entirely (they
  // resolved on the detail page but were never listed).
  const published = await dbPublished();
  const merged = published.map(toEnglish);
  return limit ? merged.slice(0, limit) : merged;
}

export async function getArticleBySlug(
  locale: Locale,
  slug: string,
): Promise<ArticleFull | null> {
  if (!hasSupabase()) return staticArticleFull(locale, slug);
  const row = await dbBySlug(slug);
  if (!row) return staticArticleFull(locale, slug);
  return locale === "en" ? toEnglish(row) : row;
}

// Draft-capable read for ADMIN PREVIEW only. Uses the service-role key to
// bypass RLS so unpublished drafts are visible. Invoked solely when Next's
// draftMode() is enabled — and that is only ever turned on by the admin-gated
// /api/preview route — so drafts never leak publicly (a draft slug without
// draft mode still 404s). Not cached: previews must always be fresh.
export async function getArticleBySlugPreview(
  slug: string,
): Promise<ArticleFull | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !service) return staticArticleFull("el", slug);
  const sb = createClient(url, service, { auth: { persistSession: false } });
  const { data, error } = await sb
    .from("articles")
    .select(SELECT)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? toArticle(data as Row) : null;
}

// Slugs are shared across locales — used for generateStaticParams / sitemap.
export const getPublishedSlugs = unstable_cache(
  async (): Promise<string[]> => {
    if (!hasSupabase()) return elArticles.posts.map((p) => p.slug);
    const { data, error } = await db()
      .from("articles")
      .select("slug")
      .eq("status", "published");
    if (error) throw error;
    return (data as { slug: string }[]).map((r) => r.slug);
  },
  ["article-slugs"],
  { tags: ["articles"], revalidate: REVALIDATE },
);
