"use client";

import Image from "next/image";
import { localeHref } from "@/lib/i18n";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useContent, useLocale } from "@/components/site/locale-provider";
import { t } from "@/lib/translations";
import { Reveal } from "@/components/motion/reveal";

// Floating crystalline shards — distinct from the Services orb scene.
const WhyUsScene = dynamic(
  () => import("@/components/three/why-us-scene").then((m) => m.WhyUsScene),
  { ssr: false },
);

// ── Ring geometry ──────────────────────────────────────────────────────
const RING = {
  cx: 300,
  cy: 300,
  outerR: 172,
  innerR: 112,
  gapDeg: 2.6,
};

// Cobalt palette, dark → light, one shade per segment. The two lightest
// are kept deep enough to double as readable label text on the pale bg.
const SEG_COLORS = ["#0f2540", "#1e4d8b", "#2563b0", "#3a72b5", "#5b95cf"];

function polar(r: number, deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [RING.cx + r * Math.cos(rad), RING.cy + r * Math.sin(rad)];
}

type Segment = {
  d: string;
  color: string;
  numX: number;
  numY: number;
  labelXPct: number;
  labelYPct: number;
  hAlign: "left" | "right" | "center";
  vAlign: "top" | "bottom" | "middle";
  // Leader-line endpoints (viewBox coords) from ring edge → label.
  lineX1: number;
  lineY1: number;
  lineX2: number;
  lineY2: number;
  n: string;
  title: string;
};

function buildSegments(
  points: { n: string; title: string }[],
): Segment[] {
  const count = points.length;
  const step = 360 / count;
  return points.map((p, i) => {
    // Start at top (-90°), go clockwise. Trim each end by gap/2.
    const a0 = -90 + i * step + RING.gapDeg / 2;
    const a1 = -90 + (i + 1) * step - RING.gapDeg / 2;
    const mid = (a0 + a1) / 2;

    const [x0o, y0o] = polar(RING.outerR, a0);
    const [x1o, y1o] = polar(RING.outerR, a1);
    const [x1i, y1i] = polar(RING.innerR, a1);
    const [x0i, y0i] = polar(RING.innerR, a0);
    const large = a1 - a0 > 180 ? 1 : 0;

    const d = `M ${x0o} ${y0o} A ${RING.outerR} ${RING.outerR} 0 ${large} 1 ${x1o} ${y1o} L ${x1i} ${y1i} A ${RING.innerR} ${RING.innerR} 0 ${large} 0 ${x0i} ${y0i} Z`;

    const [numX, numY] = polar((RING.outerR + RING.innerR) / 2, mid);

    // Label anchor point outside the ring, expressed as % of the viewBox
    // so HTML labels can be absolutely positioned over the SVG.
    const [lx, ly] = polar(RING.outerR + 60, mid);
    const cosMid = Math.cos((mid * Math.PI) / 180);
    const sinMid = Math.sin((mid * Math.PI) / 180);
    // Horizontal: which side of the ring the label sits on.
    const hAlign: Segment["hAlign"] =
      cosMid > 0.4 ? "right" : cosMid < -0.4 ? "left" : "center";
    // Vertical: above / below / level with the ring — so upper labels sit
    // fully above their anchor and lower labels below (never over the ring).
    const vAlign: Segment["vAlign"] =
      sinMid > 0.4 ? "bottom" : sinMid < -0.4 ? "top" : "middle";

    // Leader line: from just outside the ring edge out toward the label,
    // along the same radial line that connects to this segment.
    const [lineX1, lineY1] = polar(RING.outerR + 4, mid);
    const [lineX2, lineY2] = polar(RING.outerR + 52, mid);

    return {
      d,
      color: SEG_COLORS[i % SEG_COLORS.length],
      numX,
      numY,
      labelXPct: (lx / 600) * 100,
      labelYPct: (ly / 600) * 100,
      hAlign,
      vAlign,
      lineX1,
      lineY1,
      lineX2,
      lineY2,
      n: p.n,
      title: p.title,
    };
  });
}

export function WhyUs() {
  const { home } = useContent();
  const locale = useLocale();
  const tx = t(locale);
  const { whyUs } = home;
  const segments = buildSegments(whyUs.points);

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
                {tx.whyHeading}{" "}
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
                href={localeHref("/about", locale)}
                className="group mt-5 inline-flex items-center gap-2 text-base text-cobalt transition-colors hover:text-navy"
              >
                {tx.whyBioLink}
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </Reveal>

        {/* ───── CIRCULAR DIAGRAM (desktop) ───── */}
        <Reveal className="mt-14 hidden lg:block">
          <div className="relative mx-auto aspect-square w-full max-w-[820px]">
            <svg
              viewBox="0 0 600 600"
              className="absolute inset-0 h-full w-full"
              role="presentation"
            >
              {segments.map((s, i) => (
                <g key={i}>
                  <path
                    d={s.d}
                    fill={s.color}
                    className="origin-center transition-[filter] duration-500"
                  />
                  {/* Leader line connecting the segment to its label */}
                  <line
                    x1={s.lineX1}
                    y1={s.lineY1}
                    x2={s.lineX2}
                    y2={s.lineY2}
                    stroke={s.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.65"
                  />
                  <text
                    x={s.numX}
                    y={s.numY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="display"
                    fill="#ffffff"
                    fontSize="34"
                    style={{ fontWeight: 600 }}
                  >
                    {s.n}
                  </text>
                </g>
              ))}
            </svg>

            {/* Center logo disc */}
            <div className="absolute left-1/2 top-1/2 flex aspect-square w-[42%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-snow shadow-[0_20px_60px_-25px_rgba(15,37,64,0.5)]">
              <Image
                src="/logo-v2.png"
                alt="PhysioDanali"
                width={420}
                height={68}
                className="w-[78%] select-none"
              />
            </div>

            {/* Reason labels positioned around the ring.
                NOTE: an OUTER plain div owns the positioning transform; the
                INNER motion.div animates opacity/scale. Keeping them apart
                prevents framer-motion's transform from wiping out our
                translate(), which previously shoved the left labels over
                the ring. */}
            {segments.map((s, i) => (
              <div
                key={i}
                className="absolute w-[250px] max-w-[36%]"
                style={{
                  left: `${s.labelXPct}%`,
                  top: `${s.labelYPct}%`,
                  transform: `translate(${
                    s.hAlign === "right"
                      ? "8px"
                      : s.hAlign === "left"
                        ? "calc(-100% - 8px)"
                        : "-50%"
                  }, ${
                    s.vAlign === "top"
                      ? "calc(-100% - 4px)"
                      : s.vAlign === "bottom"
                        ? "4px"
                        : "-50%"
                  })`,
                  textAlign:
                    s.hAlign === "right"
                      ? "left"
                      : s.hAlign === "left"
                        ? "right"
                        : "center",
                }}
              >
                <motion.h3
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="display text-[clamp(1.4rem,2vw,2.1rem)] leading-[1.1] tracking-[-0.015em]"
                  style={{ fontWeight: 600, color: s.color }}
                >
                  {s.title}
                </motion.h3>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ───── MOBILE FALLBACK — numbered rows ───── */}
        <ol className="mt-12 flex flex-col gap-4 lg:hidden">
          {whyUs.points.map((p, idx) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: idx * 0.05,
              }}
              className="flex items-center gap-4 border-b border-cobalt/15 pb-4 first:border-t first:pt-4"
            >
              <span
                className="flex size-12 shrink-0 items-center justify-center rounded-full text-snow"
                style={{ backgroundColor: SEG_COLORS[idx % SEG_COLORS.length] }}
              >
                <span className="display text-xl" style={{ fontWeight: 600 }}>
                  {p.n}
                </span>
              </span>
              <h3
                className="display text-[1.5rem] leading-[1.1] tracking-[-0.02em]"
                style={{
                  fontWeight: 600,
                  color: SEG_COLORS[idx % SEG_COLORS.length],
                }}
              >
                {p.title}
              </h3>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
