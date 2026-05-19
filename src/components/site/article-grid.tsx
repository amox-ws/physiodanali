"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { stagger, staggerItem } from "@/components/motion/reveal";
import type { Article } from "@/lib/content";

const tints = [
  "linear-gradient(150deg, #1e4d8b 0%, #0f2540 60%, #0a1628 100%)",
  "linear-gradient(150deg, #cdddef 0%, #7ea8dc 100%)",
  "linear-gradient(150deg, #eef1f4 0%, #dde3ea 100%)",
];

const textOnDark = [true, false, false];

export function ArticleGrid({ posts }: { posts: Article[] }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post, idx) => (
        <motion.article
          key={post.slug}
          variants={staggerItem}
          className="group flex flex-col gap-6"
        >
          <Link
            href={post.href}
            aria-label={post.title}
            className="block"
          >
            <div
              className="relative aspect-[5/4] overflow-hidden rounded-[24px]"
              style={{ background: tints[idx % tints.length] }}
            >
              <div
                className="absolute inset-0 mix-blend-overlay opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(60% 60% at 70% 20%, rgba(255,255,255,0.45) 0%, transparent 60%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
                <div className="flex items-start justify-between">
                  <span
                    className={`text-[11px] uppercase tracking-[0.22em] ${
                      textOnDark[idx % textOnDark.length]
                        ? "text-snow/70"
                        : "text-ink/70"
                    }`}
                  >
                    {post.category}
                  </span>
                  <span
                    className={`flex size-12 items-center justify-center rounded-full transition-all duration-500 group-hover:rotate-45 ${
                      textOnDark[idx % textOnDark.length]
                        ? "bg-snow/15 text-snow"
                        : "bg-snow/70 text-ink"
                    }`}
                  >
                    <ArrowUpRight className="size-5" strokeWidth={1.5} />
                  </span>
                </div>
                <span
                  className={`display text-[clamp(2.5rem,4vw,3.5rem)] leading-[0.95] ${
                    textOnDark[idx % textOnDark.length]
                      ? "text-snow/15"
                      : "text-ink/15"
                  }`}
                  style={{ letterSpacing: "-0.04em" }}
                  aria-hidden="true"
                >
                  0{idx + 1}
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
              <h3 className="display mt-5 text-[clamp(1.5rem,2.2vw,1.95rem)] leading-[1.1] tracking-tight text-ink transition-colors group-hover:text-cobalt">
                {post.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                {post.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-cobalt">
                Διαβάστε το άρθρο
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
