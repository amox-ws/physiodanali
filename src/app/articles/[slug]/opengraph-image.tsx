import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { getArticleBySlug } from "@/lib/articles";
import { getLocale } from "@/lib/i18n-server";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "PhysioDanali — Άρθρο";

// Per-article social-share image: the article title on the branded canvas.
// Falls back gracefully if the article can't be loaded.
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let title = "Άρθρο & ενημέρωση";
  let eyebrow = "ΑΡΘΡΟ · PHYSIODANALI";
  try {
    const article = await getArticleBySlug(await getLocale(), slug);
    if (article?.title) title = article.title;
    if (article?.category)
      eyebrow = `${article.category.toUpperCase()} · PHYSIODANALI`;
  } catch {
    /* keep defaults */
  }
  return renderOg({
    eyebrow,
    title,
    footer: "physiodanali.gr · Φυσικοθεραπεία κατ' οίκον",
  });
}
