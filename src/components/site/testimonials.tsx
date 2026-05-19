"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { home } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

export function Testimonials() {
  const { testimonials } = home;
  const [i, setI] = useState(0);
  const t = testimonials[i];

  const prev = () =>
    setI((v) => (v - 1 + testimonials.length) % testimonials.length);
  const next = () => setI((v) => (v + 1) % testimonials.length);

  return (
    <section className="relative bg-porcelain py-28 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal className="mb-12 flex items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Μαρτυρίες</span>
            <h2 className="display mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1] tracking-[-0.02em] text-ink">
              Τι λένε{" "}
              <span className="display-italic text-cobalt">
                οι ασθενείς μας
              </span>
              .
            </h2>
          </div>
        </Reveal>

        <div className="relative grid gap-12 lg:grid-cols-12">
          <div className="absolute -top-12 -left-2 select-none lg:-top-20 lg:left-0">
            <span
              className="display text-[clamp(8rem,18vw,16rem)] leading-none text-cobalt/15"
              aria-hidden="true"
            >
              &ldquo;
            </span>
          </div>

          <div className="relative z-10 lg:col-span-9 lg:col-start-2">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="display text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.25] tracking-[-0.01em] text-ink">
                  {t.quote}
                </p>
                <footer className="mt-10 flex flex-wrap items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-cobalt/10 font-medium text-cobalt">
                    {t.author.charAt(0)}
                  </span>
                  <div>
                    <cite className="not-italic text-sm font-medium text-ink">
                      {t.author}
                    </cite>
                    <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
                      Ασθενής
                    </p>
                  </div>
                  {"condition" in t && t.condition && (
                    <span className="ml-2 inline-flex items-center rounded-full border border-stone bg-snow px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {t.condition}
                    </span>
                  )}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-stone pt-6">
          <span className="text-sm text-ink-muted">
            <span className="text-ink">{i + 1}</span>
            <span className="mx-2 text-ink-muted/60">/</span>
            <span>{testimonials.length}</span>
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Προηγούμενη μαρτυρία"
              className="group flex size-12 items-center justify-center rounded-full border border-stone-dark/40 text-ink transition-all hover:border-cobalt hover:text-cobalt"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Επόμενη μαρτυρία"
              className="group flex size-12 items-center justify-center rounded-full border border-stone-dark/40 text-ink transition-all hover:border-cobalt hover:text-cobalt"
            >
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
