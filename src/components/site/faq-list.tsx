"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type FaqListProps = {
  items: { question: string; answer: string }[];
};

// One brand accent per question — cycles for longer lists.
const ACCENTS = ["#1e4d8b", "#2563b0", "#0f2540", "#8a6d3b", "#4577b8"];

export function FaqList({ items }: FaqListProps) {
  // Nothing open until the user taps a question.
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3 lg:space-y-4">
      {items.map((item, i) => {
        const isOpen = open === i;
        const accent = ACCENTS[i % ACCENTS.length];
        return (
          <article
            key={i}
            style={{
              ["--accent" as string]: accent,
              borderColor: isOpen ? accent : undefined,
              backgroundColor: isOpen ? `${accent}0d` : undefined,
            }}
            className={cn(
              "group overflow-hidden rounded-2xl border transition-colors duration-300",
              !isOpen &&
                "border-stone bg-snow hover:border-[var(--accent)] hover:bg-[var(--accent)]/[0.03]",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 px-5 py-5 text-left lg:gap-6 lg:px-8 lg:py-7"
            >
              {/* Numbered accent badge */}
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 lg:size-12 lg:text-base"
                style={{
                  backgroundColor: isOpen ? accent : `${accent}1a`,
                  color: isOpen ? "#ffffff" : accent,
                }}
              >
                {i + 1}
              </span>

              <span
                className="display flex-1 text-xl leading-[1.2] tracking-tight text-ink transition-colors duration-300 group-hover:text-[var(--accent)] lg:text-[1.7rem]"
                style={{ color: isOpen ? accent : undefined }}
              >
                {item.question}
              </span>

              <motion.span
                animate={{ rotate: isOpen ? 135 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 lg:size-10"
                style={{
                  borderColor: accent,
                  backgroundColor: isOpen ? accent : "transparent",
                  color: isOpen ? "#ffffff" : accent,
                }}
              >
                <Plus className="size-4" strokeWidth={2} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-4 px-5 pb-7 lg:gap-6 lg:px-8">
                    {/* spacer to align with the badge column */}
                    <span className="hidden w-9 shrink-0 lg:block lg:w-12" />
                    <p className="max-w-[62ch] text-base leading-[1.7] text-ink-muted lg:text-lg">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
