"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import type { Section, Faq } from "@/lib/admin-articles";

// Server Actions can bypass the proxy matcher (Next 16 docs), so every action
// re-checks the admin allowlist before touching data.
async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdminEmail(user?.email)) throw new Error("Unauthorized");
  return supabase;
}

export type ArticleInput = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  read_time: string;
  date: string;
  image: string;
  sections: Section[];
  meta_title: string;
  meta_description: string;
  keywords: string[];
  faq: Faq[];
};

function toRow(input: ArticleInput) {
  return {
    slug: input.slug.trim(),
    title: input.title.trim(),
    category: input.category.trim() || null,
    excerpt: input.excerpt.trim() || null,
    read_time: input.read_time.trim() || null,
    date: input.date.trim() || null,
    image: input.image.trim() || null,
    sections: input.sections.filter((s) => s.heading?.trim() || s.body.trim()),
    meta_title: input.meta_title.trim() || null,
    meta_description: input.meta_description.trim() || null,
    keywords: input.keywords.map((k) => k.trim()).filter(Boolean),
    faq: input.faq.filter((f) => f.question.trim() && f.answer.trim()),
  };
}

/** Insert (id null) or update. Returns the row id. */
export async function saveArticle(
  id: string | null,
  input: ArticleInput,
): Promise<{ id: string }> {
  const supabase = await requireAdmin();
  const row = toRow(input);

  if (id) {
    const { error } = await supabase.from("articles").update(row).eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/admin");
    return { id };
  }

  const { data, error } = await supabase
    .from("articles")
    .insert({ ...row, status: "draft" })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  return { id: data.id as string };
}

export async function publishArticle(id: string): Promise<void> {
  const supabase = await requireAdmin();
  const { data, error } = await supabase
    .from("articles")
    .update({ status: "published", published_at: new Date().toISOString() })
    .eq("id", id)
    .select("slug")
    .single();
  if (error) throw new Error(error.message);
  revalidateTag("articles", "max");
  revalidatePath("/articles");
  revalidatePath(`/articles/${data.slug}`);
  revalidatePath("/admin");
}

export async function unpublishArticle(id: string): Promise<void> {
  const supabase = await requireAdmin();
  const { data, error } = await supabase
    .from("articles")
    .update({ status: "draft" })
    .eq("id", id)
    .select("slug")
    .single();
  if (error) throw new Error(error.message);
  revalidateTag("articles", "max");
  revalidatePath("/articles");
  revalidatePath(`/articles/${data.slug}`);
  revalidatePath("/admin");
}

export async function deleteArticle(id: string): Promise<void> {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateTag("articles", "max");
  revalidatePath("/articles");
  revalidatePath("/admin");
}
