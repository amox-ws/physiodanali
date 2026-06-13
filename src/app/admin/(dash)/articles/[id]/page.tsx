import { notFound } from "next/navigation";
import { ArticleEditor } from "@/components/admin/article-editor";
import { getArticleById } from "@/lib/admin-articles";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();
  return <ArticleEditor article={article} />;
}
