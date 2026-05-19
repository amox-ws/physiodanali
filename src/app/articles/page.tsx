import type { Metadata } from "next";
import { articles } from "@/lib/content";
import { PageHero } from "@/components/site/page-primitives";
import { ArticleGrid } from "@/components/site/article-grid";

export const metadata: Metadata = {
  title: articles.meta.title,
  description: articles.meta.description,
};

export default function ArticlesPage() {
  return (
    <>
      <PageHero
        breadcrumb={articles.breadcrumb}
        eyebrow={articles.hero.eyebrow}
        title={articles.hero.title}
        titleAccent={articles.hero.titleAccent}
        lead={articles.hero.lead}
        primaryCta={{ label: "Κλείστε ραντεβού", href: "/contact" }}
        secondaryCta={{ label: "Καλέστε τώρα", href: "tel:+306944344342" }}
      />

      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <ArticleGrid posts={articles.posts} />
        </div>
      </section>
    </>
  );
}
