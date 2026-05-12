"use client";

import { motion } from "framer-motion";
import { home } from "@/lib/content";
import { Reveal, stagger, staggerItem } from "@/components/motion/reveal";

export function WhyUs() {
  const { whyUs } = home;
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="relative bg-snow py-28 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal className="mb-20 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="eyebrow">{whyUs.eyebrow}</span>
            <h2
              id="why-heading"
              className="display mt-5 text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.98] tracking-[-0.02em] text-ink"
            >
              {whyUs.title}
            </h2>
          </div>
        </Reveal>

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="divide-y divide-stone border-t border-stone"
        >
          {whyUs.points.map((p) => (
            <motion.li
              key={p.n}
              variants={staggerItem}
              className="group grid gap-6 py-10 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-2">
                <span
                  className="display text-[clamp(3rem,6vw,5rem)] leading-none text-cobalt transition-colors duration-500 group-hover:text-navy"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {p.n}
                </span>
              </div>
              <div className="lg:col-span-5">
                <h3 className="display text-3xl leading-[1.05] tracking-tight text-ink lg:text-[2.4rem]">
                  {p.title}
                </h3>
              </div>
              <div className="lg:col-span-5">
                <p className="text-base leading-relaxed text-ink-muted">
                  {p.body}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
