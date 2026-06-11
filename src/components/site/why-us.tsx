"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { home } from "@/lib/content";
import { Reveal, stagger, staggerItem } from "@/components/motion/reveal";

// Floating crystalline shards — distinct from the Services orb scene.
const WhyUsScene = dynamic(
  () => import("@/components/three/why-us-scene").then((m) => m.WhyUsScene),
  { ssr: false },
);

export function WhyUs() {
  const { whyUs } = home;

  const sectionRef = useRef<HTMLElement>(null);
  const [mount3D, setMount3D] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setMount3D(true);
            io.disconnect();
            return;
          }
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      aria-labelledby="why-heading"
      className="relative isolate overflow-hidden py-16 lg:py-20"
      style={{ backgroundColor: "#e8eff8" }}
    >
      {/* Soft blue tonal wash on top of the base blue */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 20%, rgba(30,77,139,0.10) 0%, transparent 65%), radial-gradient(45% 50% at 10% 90%, rgba(126,168,220,0.18) 0%, transparent 60%)",
        }}
      />

      {/* 3D shards */}
      {mount3D && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-90 [mask-image:radial-gradient(80%_75%_at_50%_50%,transparent_0%,transparent_30%,black_85%)]"
        >
          <WhyUsScene />
        </div>
      )}

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* ───── BIG TITLE BLOCK ───── */}
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-8">
              <h2
                id="why-heading"
                className="display text-[clamp(2.75rem,8vw,7rem)] leading-[0.92] tracking-[-0.03em] text-ink"
              >
                Γιατί{" "}
                <span className="display-italic text-cobalt">
                  PhysioDanali.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-base leading-relaxed text-ink-muted lg:text-lg">
                {whyUs.title}
              </p>
              <Link
                href="/about"
                className="group mt-5 inline-flex items-center gap-2 text-base text-cobalt transition-colors hover:text-navy"
              >
                Πλήρες βιογραφικό
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* ───── FEATURE GRID (2 columns) ───── */}
        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:mt-16 lg:gap-x-20"
        >
          {whyUs.points.map((p) => (
            <motion.li
              key={p.n}
              variants={staggerItem}
              className="group relative border-t border-cobalt/20 py-7 lg:py-8"
            >
              {/* Number + title on one baseline */}
              <div className="flex items-baseline gap-4">
                <span className="display-italic shrink-0 text-3xl leading-none tracking-[-0.02em] text-cobalt/45 transition-colors duration-500 group-hover:text-cobalt lg:text-4xl">
                  {p.n}
                </span>
                <h3 className="display text-[clamp(1.65rem,2.4vw,2.35rem)] leading-[1.05] tracking-[-0.02em] text-ink">
                  {p.title}
                </h3>
              </div>
              <p className="mt-4 max-w-[44ch] text-base leading-[1.65] text-ink-muted lg:text-lg">
                {p.body}
              </p>

              {/* Accent line that grows on hover */}
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-0 bg-cobalt transition-all duration-700 group-hover:w-16"
                style={{ marginTop: "-1px" }}
              />
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
