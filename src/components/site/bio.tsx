"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { home } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Bio() {
  const { bio } = home;
  const [open, setOpen] = useState(true);

  return (
    <section
      id="bio"
      aria-labelledby="bio-heading"
      className="relative bg-snow py-28 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="relative grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-stone">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, #1e4d8b 0%, #0f2540 60%, #0a1628 100%)",
                }}
              />
              <div
                className="absolute inset-0 mix-blend-overlay opacity-50"
                style={{
                  backgroundImage:
                    "radial-gradient(60% 60% at 30% 25%, rgba(255,255,255,0.45) 0%, transparent 60%)",
                }}
              />
              <div className="absolute inset-0 flex items-end justify-end p-10">
                <span
                  className="display text-[clamp(8rem,16vw,14rem)] leading-[0.85] text-snow/15"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  ΚΔ
                </span>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-4 text-sm text-ink-muted">
              <span className="block h-px w-10 bg-stone-dark/60" />
              <span>Photography placeholder · drop in real portrait</span>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">{bio.eyebrow}</span>
              <h2
                id="bio-heading"
                className="display mt-5 text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.98] tracking-[-0.02em] text-ink"
              >
                {bio.name}
              </h2>
              <p className="mt-3 text-lg text-ink-muted">{bio.title}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-10 max-w-[60ch] text-base leading-relaxed text-ink-muted lg:text-lg">
                {bio.intro}
              </p>
              <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-ink-muted lg:text-lg">
                {bio.body}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 border-t border-stone">
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  className="flex w-full items-center justify-between py-6 text-left"
                  aria-expanded={open}
                >
                  <span className="display text-2xl leading-tight tracking-tight text-ink lg:text-3xl">
                    Εξειδικεύσεις
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-5 text-ink-muted transition-transform duration-500",
                      open && "rotate-180",
                    )}
                    strokeWidth={1.5}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: open ? "auto" : 0,
                    opacity: open ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="grid gap-3 pb-8 text-base text-ink-muted lg:grid-cols-2">
                    {bio.specialties.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-3 leading-relaxed"
                      >
                        <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-cobalt" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              <Link
                href="/about"
                className="group mt-4 inline-flex items-center gap-2 text-sm text-cobalt transition-colors hover:text-navy"
              >
                Πλήρες βιογραφικό
                <ArrowUpRight
                  className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
