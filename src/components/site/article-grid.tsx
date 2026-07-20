"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { stagger, staggerItem } from "@/components/motion/reveal";
import type { Article } from "@/lib/content";
import { useLocale } from "@/components/site/locale-provider";
import { localeHref } from "@/lib/i18n";
import { t } from "@/lib/translations";

export function ArticleGrid({ posts }: { posts: Article[] }) {
  const locale = useLocale();
  const tx = t(locale);
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <motion.article
          key={post.slug}
          variants={staggerItem}
          className="group flex flex-col gap-6"
        >
          <Link
            href={localeHref(post.href, locale)}
            aria-label={post.title}
            className="block"
          >
            <div className="relative aspect-[5/4] overflow-hidden rounded-[24px] bg-stone">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
              />
              {/* Gradient scrim for legibility of the overlaid label */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,22,40,0.55) 0%, transparent 45%)",
                }}
              />
              <div className="absolute inset-0 flex items-start justify-between p-6 lg:p-8">
                <span className="rounded-full bg-snow/90 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ink">
                  {post.category}
                </span>
                <span className="flex size-12 items-center justify-center rounded-full bg-snow/90 text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-cobalt group-hover:text-snow">
                  <ArrowUpRight className="size-5" strokeWidth={1.5} />
                </span>
              </div>
            </div>

            <div className="mt-7">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-ink-muted">
                <Clock className="size-3.5" strokeWidth={1.5} />
                <span>{post.readTime}</span>
                <span className="text-stone-dark/60">·</span>
                <span>{post.date}</span>
              </div>
              <h3 className="display text-[clamp(1.5rem,2.2vw,1.95rem)] leading-[1.1] tracking-tight text-ink transition-colors group-hover:text-cobalt">
                {post.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                {post.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-cobalt">
                {tx.readArticle}
                <ArrowUpRight
                  className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </span>
            </div>
          </Link>
        </motion.article>
      ))}
    </motion.div>
  );
}
