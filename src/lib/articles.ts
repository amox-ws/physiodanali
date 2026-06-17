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
// English (en): served from the bundled static translations (content.en.ts),
//   since the CMS stores Greek only.
// ─────────────────────────────────────────────────────────────────────

export type ArticleFull = Article & { sections: ArticleBody["sections"] };

const SELECT = "slug,title,category,excerpt,read_time,date,image,sections";
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
};

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

function toArticle(r: Row): ArticleFull {
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
  };
}

// ── Greek: cached Supabase reads ──────────────────────────────────────
const dbPublished = unstable_cache(
  async (limit?: number): Promise<ArticleFull[]> => {
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
  async (slug: string): Promise<ArticleFull | null> => {
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
  if (locale === "en") return staticAll("en", limit);
  if (!hasSupabase()) return staticAll("el", limit);
  return dbPublished(limit);
}

export async function getArticleBySlug(
  locale: Locale,
  slug: string,
): Promise<ArticleFull | null> {
  if (locale === "en") {
    const en = staticArticleFull("en", slug);
    if (en) return en;
    // No English version → fall back to Greek so /en/articles/* never 404s.
  }
  if (!hasSupabase()) return staticArticleFull("el", slug);
  return dbBySlug(slug);
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
