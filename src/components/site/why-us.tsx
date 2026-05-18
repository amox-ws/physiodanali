"use client";

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
      className="relative isolate overflow-hidden bg-snow py-28 lg:py-40"
    >
      {/* Subtle tonal wash so the 3D shards have some depth to play against */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(50% 60% at 80% 30%, rgba(30,77,139,0.06) 0%, transparent 60%), radial-gradient(40% 50% at 10% 80%, rgba(184,153,104,0.05) 0%, transparent 60%)",
        }}
      />

      {/* 3D shard field — masked to fade towards center where text lives */}
      {mount3D && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-90 [mask-image:radial-gradient(80%_75%_at_50%_50%,transparent_0%,transparent_30%,black_85%)]"
        >
          <WhyUsScene />
        </div>
      )}

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
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
