import type { Metadata } from "next";
import { articles } from "@/lib/content";
import { getPublishedArticles } from "@/lib/articles";
import { PageHero } from "@/components/site/page-primitives";
import { ArticleGrid } from "@/components/site/article-grid";

export const metadata: Metadata = {
  title: articles.meta.title,
  description: articles.meta.description,
  alternates: { canonical: "/articles" },
};

// ISR safety net; on publish the admin calls revalidateTag("articles").
export const revalidate = 3600;

export default async function ArticlesPage() {
  const posts = await getPublishedArticles();
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
          <ArticleGrid posts={posts} />
        </div>
      </section>
    </>
  );
}
