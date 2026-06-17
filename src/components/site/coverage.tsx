"use client";

import { motion } from "framer-motion";
import { useContent } from "@/components/site/locale-provider";
import { Reveal, stagger, staggerItem } from "@/components/motion/reveal";

export function Coverage() {
  const { home } = useContent();
  const { coverage } = home;
  return (
    <section className="relative bg-porcelain py-28 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal className="mb-16 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="display text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.98] tracking-[-0.02em] text-ink">
              {coverage.title}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-base leading-relaxed text-ink-muted">
              {coverage.intro}
            </p>
          </div>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-px overflow-hidden rounded-[28px] border border-stone bg-stone sm:grid-cols-2 lg:grid-cols-5"
        >
          {coverage.areas.map((area, idx) => (
            <motion.article
              key={area.name}
              variants={staggerItem}
              className="group relative isolate overflow-hidden bg-snow p-7 transition-colors duration-500 hover:bg-mist lg:p-8"
            >
              <span className="absolute right-5 top-5 text-[11px] uppercase tracking-[0.22em] text-ink-muted/60">
                0{idx + 1}
              </span>
              <span className="display block break-words text-[clamp(1.75rem,2.5vw,2.5rem)] leading-[0.95] tracking-[-0.02em] text-ink transition-colors duration-500 group-hover:text-cobalt">
                {area.name}
              </span>
              <p className="mt-5 max-w-[28ch] text-sm leading-relaxed text-ink-muted">
                {area.copy}
              </p>
              <div className="mt-8 h-px w-10 bg-cobalt transition-all duration-500 group-hover:w-20" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
