"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type FaqListProps = {
  items: { question: string; answer: string }[];
};

export function FaqList({ items }: FaqListProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-stone">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <article key={i} className="border-b border-stone">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-8 py-7 text-left transition-colors hover:bg-mist/40 lg:py-9"
            >
              <span className="display flex-1 text-2xl leading-[1.15] tracking-tight text-ink lg:text-[1.85rem]">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors",
                  isOpen
                    ? "border-cobalt bg-cobalt text-snow"
                    : "border-stone text-ink-muted",
                )}
              >
                <Plus className="size-4" strokeWidth={1.5} />
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
                  <p className="max-w-[60ch] pb-9 text-base leading-relaxed text-ink-muted lg:text-lg">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
