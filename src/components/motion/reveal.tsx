"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Horizontal slide-in offset (e.g. -120 = enters from the left). */
  x?: number;
  /** Animation duration in seconds (default 0.7). */
  duration?: number;
  /** Kept for API compat; blur is no longer applied (was GPU-expensive). */
  blur?: boolean;
  as?: "div" | "section" | "article" | "li" | "header";
};

const baseVariants = (y: number, x: number, duration: number): Variants => ({
  hidden: { opacity: 0, y, x },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration, ease: [0.22, 1, 0.36, 1] },
  },
});

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  x = 0,
  duration = 0.7,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={baseVariants(y, x, duration)}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
