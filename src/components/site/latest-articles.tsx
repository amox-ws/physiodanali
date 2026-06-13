"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ArticleGrid } from "@/components/site/article-grid";
import type { Article } from "@/lib/content";

export function LatestArticles({ posts }: { posts: Article[] }) {
  return (
    <section
      aria-labelledby="latest-articles-heading"
      className="relative bg-snow py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal className="mb-16 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2
              id="latest-articles-heading"
              className="display text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.98] tracking-[-0.02em] text-ink"
            >
              Οι{" "}
              <span className="display-italic text-cobalt">
                τελευταίες δημοσιεύσεις
              </span>{" "}
              στο blog.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-base leading-relaxed text-ink-muted">
              Επιστημονικά τεκμηριωμένη ενημέρωση από τον Κωνσταντίνο Δανάλη
              — γραμμένη σε απλά ελληνικά, για ασθενείς που θέλουν να
              καταλάβουν τι συμβαίνει στο σώμα τους.
            </p>
            <Link
              href="/articles"
              className="mt-7 inline-flex items-center gap-2 text-sm text-cobalt transition-colors hover:text-ink"
            >
              Δείτε όλα τα άρθρα
              <ArrowUpRight
                className="size-4 transition-transform duration-500 hover:translate-x-0.5 hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </Reveal>

        <ArticleGrid posts={posts} />
      </div>
    </section>
  );
}
