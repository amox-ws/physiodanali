"use client";

import { motion } from "framer-motion";

type TextRevealProps = {
  children: string;
  className?: string;
  delay?: number;
};

/**
 * Simple slide-up reveal for headline phrases. Single transform per
 * span, no per-word clipping containers (which were causing layout
 * cost on hero mount). Reduced-motion users get an instant fade.
 */
export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ display: "inline-block", willChange: "transform, opacity" }}
    >
      {children}
    </motion.span>
  );
}
