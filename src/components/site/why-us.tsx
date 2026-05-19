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
      className="relative isolate overflow-hidden py-20 lg:py-28"
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
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <h2
                id="why-heading"
                className="display text-[clamp(3rem,9vw,8rem)] leading-[0.92] tracking-[-0.03em] text-ink"
              >
                Γιατί{" "}
                <span className="display-italic text-cobalt">
                  PhysioDanali.
                </span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pt-6">
              <p className="text-base leading-relaxed text-ink-muted lg:text-lg">
                {whyUs.title}
              </p>
              <Link
                href="/about"
                className="group mt-6 inline-flex items-center gap-2 text-sm text-cobalt transition-colors hover:text-navy"
              >
                Πλήρες βιογραφικό
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* ───── 5 EDITORIAL ROWS ───── */}
        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 lg:mt-20"
        >
          {whyUs.points.map((p) => (
            <motion.li
              key={p.n}
              variants={staggerItem}
              className="group relative border-t border-cobalt/15 py-9 last:border-b lg:py-12"
            >
              <div className="grid gap-x-10 gap-y-6 lg:grid-cols-12 lg:gap-x-14">
                {/* Number */}
                <div className="lg:col-span-2">
                  <span
                    className="display-italic block leading-[0.9] tracking-[-0.02em] text-cobalt/40 transition-colors duration-700 group-hover:text-cobalt"
                    style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
                  >
                    {p.n}
                  </span>
                </div>

                {/* Title + body stacked */}
                <div className="lg:col-span-10">
                  <h3 className="display max-w-[22ch] text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.02em] text-ink transition-transform duration-700 group-hover:-translate-x-0.5">
                    {p.title}
                  </h3>
                  <p className="mt-6 max-w-[60ch] text-base leading-[1.7] text-ink-muted lg:mt-8 lg:text-lg">
                    {p.body}
                  </p>
                </div>
              </div>

              {/* Subtle bottom-left accent line that grows on row hover */}
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-0 bg-cobalt transition-all duration-700 group-hover:w-20"
                style={{ marginBottom: "-1px" }}
              />
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
