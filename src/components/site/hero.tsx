"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
// useScroll + useTransform kept for hero text parallax only — single
// composited transform, no layout reflows.
import { useRef } from "react";
import { ArrowRight, Phone, Star } from "lucide-react";
import { home, site } from "@/lib/content";
import { stagger, staggerItem } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { TextReveal } from "@/components/motion/text-reveal";

export function Hero() {
  const { hero } = home;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Single transform on the text block — cheap, runs on compositor.
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-porcelain"
    >
      {/* Tonal gradient background — static, no animation (cheap paint) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(120% 80% at 80% 30%, rgba(15,37,64,0.32) 0%, rgba(15,37,64,0.12) 38%, rgba(247,248,250,0) 70%), radial-gradient(80% 60% at 20% 90%, rgba(126,168,220,0.28) 0%, rgba(247,248,250,0) 60%), linear-gradient(180deg, #eef1f4 0%, #f7f8fa 100%)",
        }}
      />
      {/* Hairline grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0a1628 1px, transparent 1px), linear-gradient(to bottom, #0a1628 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />
      {/* Soft fade so the next section doesn't slam */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-porcelain"
      />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col justify-end px-6 pb-16 pt-44 lg:px-10 lg:pb-24 lg:pt-48"
        style={{ y: textY }}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-[68rem]"
        >
          <motion.span
            variants={staggerItem}
            className="eyebrow inline-block mb-8"
          >
            {hero.eyebrow}
          </motion.span>

          <h1 className="display text-ink text-[clamp(2.75rem,8vw,7.5rem)] tracking-[-0.025em] leading-[0.95] max-w-[18ch]">
            <TextReveal>{"Χειροπρακτική και Φυσικοθεραπεία"}</TextReveal>{" "}
            <span className="display-italic text-cobalt">
              <TextReveal delay={0.15}>{"κατ' οίκον"}</TextReveal>
            </span>{" "}
            <TextReveal delay={0.3}>{"στη Βούλα."}</TextReveal>
          </h1>

          <motion.p
            variants={staggerItem}
            className="mt-10 max-w-[44ch] text-base leading-relaxed text-ink-muted lg:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <Magnetic strength={0.25}>
              <Link
                href={hero.primaryCta.href}
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium tracking-wide text-snow transition-colors duration-500 hover:bg-cobalt"
              >
                <span>{hero.primaryCta.label}</span>
                <ArrowRight
                  className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-snow/40 px-6 py-4 text-sm text-ink transition-colors hover:border-ink/60 hover:bg-snow/80"
              >
                <Phone className="size-4" strokeWidth={1.5} />
                <span>{hero.secondaryCta.label}</span>
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="mt-14 flex items-center gap-4 text-sm text-ink-muted"
          >
            <div className="flex -space-x-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="size-4 fill-gold text-gold"
                  strokeWidth={0}
                />
              ))}
            </div>
            <span>{hero.proofBadge}</span>
            <span className="hidden h-4 w-px bg-stone-dark/50 sm:block" />
            <span className="hidden text-ink-muted sm:block">
              {site.hoursShort}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="scroll-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:flex">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink-muted">
          <span className="block h-px w-10 bg-ink-muted/40" />
          Scroll
        </div>
      </div>
    </section>
  );
}
