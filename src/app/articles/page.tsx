import type { Metadata } from "next";
import { articles } from "@/lib/content";
import { ArticleGrid } from "@/components/site/article-grid";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: articles.meta.title,
  description: articles.meta.description,
};

function renderTitle() {
  const { title, titleAccent } = articles.hero;
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

export default function ArticlesPage() {
  return (
    <section className="bg-snow pt-36 pb-28 lg:pt-44 lg:pb-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <Reveal className="mb-16 max-w-[68rem] lg:mb-20">
          <h1 className="display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.025em] text-ink">
            {renderTitle()}
          </h1>
          <p className="mt-8 max-w-[58ch] text-lg leading-relaxed text-ink-muted lg:text-xl">
            {articles.hero.lead}
          </p>
        </Reveal>

        {/* Grid */}
        <ArticleGrid posts={articles.posts} />
      </div>
    </section>
  );
}
