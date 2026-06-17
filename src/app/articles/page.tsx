import type { Metadata } from "next";
import { getContent } from "@/lib/content-i18n";
import { getLocale } from "@/lib/i18n-server";
import { getPublishedArticles } from "@/lib/articles";
import { ArticleGrid } from "@/components/site/article-grid";
import { Reveal } from "@/components/motion/reveal";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { articles } = getContent(locale);
  return {
    title: articles.meta.title,
    description: articles.meta.description,
    alternates: { canonical: "/articles" },
  };
}

// ISR safety net; on publish the admin calls revalidateTag("articles").
export const revalidate = 3600;

function renderTitle(title: string, titleAccent?: string) {
  if (!titleAccent || !title.includes(titleAccent)) return title;
  const [before, after] = title.split(titleAccent);
  return (
    <>
      {before}
      <span className="display-italic text-cobalt">{titleAccent}</span>
      {after}
    </>
  );
}

export default async function ArticlesPage() {
  const locale = await getLocale();
  const { articles: a } = getContent(locale);
  const posts = await getPublishedArticles(locale);
  return (
    <section className="bg-snow pt-36 pb-28 lg:pt-44 lg:pb-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <Reveal className="mb-16 max-w-[68rem] lg:mb-20">
          <h1 className="display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.025em] text-ink">
            {renderTitle(a.hero.title, a.hero.titleAccent)}
          </h1>
          <p className="mt-8 max-w-[58ch] text-lg leading-relaxed text-ink-muted lg:text-xl">
            {a.hero.lead}
          </p>
        </Reveal>

        {/* Grid */}
        <ArticleGrid posts={posts} />
      </div>
    </section>
  );
}
