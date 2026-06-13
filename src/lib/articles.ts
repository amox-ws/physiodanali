import "server-only";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { Article, ArticleBody } from "@/lib/content";

// ─────────────────────────────────────────────────────────────────────
// Article data access — reads from Supabase (table: public.articles).
//
// Public pages use the ANON key; RLS restricts reads to status='published',
// so drafts never leak even though the anon key is public. Results are wrapped
// in unstable_cache with the "articles" tag — the admin publish action calls
// revalidateTag("articles") for instant updates (see Phase 4).
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

export const getPublishedArticles = unstable_cache(
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

export const getArticleBySlug = unstable_cache(
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

export const getPublishedSlugs = unstable_cache(
  async (): Promise<string[]> => {
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
