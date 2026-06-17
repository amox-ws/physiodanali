"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLocale } from "@/components/site/locale-provider";
import { t } from "@/lib/translations";

/**
 * Floating, semi-transparent "back to top" button — fixed in the bottom-right
 * corner. Fades in once the user has scrolled past the first viewport and
 * smooth-scrolls to the top on click.
 */
export function ScrollToTop() {
  const tx = t(useLocale());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label={tx.scrollTop}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-6 right-6 z-[60] flex size-12 items-center justify-center rounded-full border border-ink/15 bg-ink/40 text-snow shadow-[0_10px_30px_-10px_rgba(15,37,64,0.5)] transition-colors duration-300 hover:bg-ink/80 lg:bottom-8 lg:right-8 lg:size-14"
        >
          <ArrowUp
            className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 lg:size-6"
            strokeWidth={1.75}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
