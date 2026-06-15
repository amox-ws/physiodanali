"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

// GDPR / ePrivacy cookie consent banner (opt-in).
// Stores the choice in localStorage so it shows only once. Analytics scripts
// must check `hasAnalyticsConsent()` (or listen for the "pd-consent-change"
// event) before loading any non-essential cookie.

const KEY = "pd-cookie-consent";
type Choice = "accepted" | "rejected";

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(KEY) === "accepted";
}

function persist(choice: Choice) {
  try {
    window.localStorage.setItem(KEY, choice);
    // 12-month cookie mirror so server/edge could read it if ever needed.
    document.cookie = `${KEY}=${choice}; path=/; max-age=31536000; samesite=lax`;
    window.dispatchEvent(new CustomEvent("pd-consent-change", { detail: choice }));
  } catch {
    /* storage blocked — banner simply reappears next visit */
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if no prior choice. Runs after mount → no SSR/hydration clash.
    try {
      if (!window.localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function choose(choice: Choice) {
    persist(choice);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Συγκατάθεση cookies"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-[680px] rounded-2xl border border-snow/10 bg-ink/95 p-5 text-snow shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:inset-x-4 sm:bottom-4 lg:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-snow/80">
              Χρησιμοποιούμε απαραίτητα cookies για τη λειτουργία του ιστότοπου
              και, με τη συγκατάθεσή σας, cookies για ανώνυμα στατιστικά. Δείτε
              την{" "}
              <Link
                href="/cookies"
                className="text-gold underline-offset-4 hover:underline"
              >
                Πολιτική Cookies
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose("rejected")}
                className="rounded-full border border-snow/20 px-5 py-2.5 text-sm text-snow transition-colors hover:border-snow/60"
              >
                Απόρριψη
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="rounded-full bg-cobalt px-5 py-2.5 text-sm font-medium text-snow transition-colors hover:bg-azure"
              >
                Αποδοχή
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
