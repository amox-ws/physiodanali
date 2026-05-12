"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

type CountUpProps = {
  value: string; // e.g. "100+", "23:00", "20", "100%"
  className?: string;
  duration?: number;
};

/**
 * Animates from 0 → numeric portion of `value` when the element
 * scrolls into view, while preserving the suffix (+, %, or anything
 * else after the leading number, e.g. ":00" in "23:00").
 *
 * For values that don't start with a number, falls back to the value as-is.
 */
export function CountUp({ value, className, duration = 1.8 }: CountUpProps) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const numeric = match ? parseFloat(match[1]) : NaN;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(
    Number.isFinite(numeric) ? "0" : value,
  );

  useEffect(() => {
    if (!Number.isFinite(numeric)) return;
    if (!inView) return;
    const isInt = Number.isInteger(numeric);
    const controls = animate(0, numeric, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        setDisplay(isInt ? Math.round(v).toString() : v.toFixed(1));
      },
    });
    return () => controls.stop();
  }, [inView, numeric, duration]);

  if (Number.isFinite(numeric)) {
    return (
      <span ref={ref} className={className}>
        {display}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
