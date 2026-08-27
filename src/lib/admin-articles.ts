import "server-only";
import { createClient } from "@/lib/supabase/server";

// Admin-side reads. Run as the authenticated admin (RLS "auth all" → sees
// drafts too). NOT cached — the editor always needs fresh data.

export type Section = { heading?: string; body: string };
export type Faq = { question: string; answer: string };

export type AdminArticle = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  excerpt: string | null;
  read_time: string | null;
  date: string | null;
  image: string | null;
  sections: Section[];
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[];
  faq: Faq[];
  /** Auto-translated English, editable in the editor's English panel. Null
   *  until the first successful translation. */
  title_en: string | null;
  excerpt_en: string | null;
  category_en: string | null;
  read_time_en: string | null;
  sections_en: Section[] | null;
  status: "draft" | "published" | "archived";
  ai_generated: boolean;
  published_at: string | null;
  updated_at: string;
};

export type AdminArticleListItem = Pick<
  AdminArticle,
  "id" | "slug" | "title" | "status" | "category" | "updated_at" | "ai_generated"
>;

export async function listAllArticles(): Promise<AdminArticleListItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("id,slug,title,status,category,updated_at,ai_generated")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as AdminArticleListItem[];
}

export async function getArticleById(id: string): Promise<AdminArticle | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as AdminArticle | null) ?? null;
}
