"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n";
import { useLocale } from "@/components/site/locale-provider";

/**
 * EL / EN language switch. Navigates between the Greek route (root) and the
 * crawlable English route (`/en/...`) so each language has its own URL.
 * Uses a full navigation (not router.push) so the shared root layout re-runs
 * and the whole UI — including header/footer chrome — switches language.
 */
export function LocaleToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  const set = (next: Locale) => {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    const base = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
    const target =
      next === "en" ? (base === "/" ? "/en" : `/en${base}`) : base;
    window.location.assign(target);
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-stone bg-snow/80 p-0.5 text-xs font-medium",
        className,
      )}
      role="group"
      aria-label="Language / Γλώσσα"
    >
      {(["el", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => set(l)}
          aria-pressed={locale === l}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
            locale === l
              ? "bg-ink text-snow"
              : "text-ink-muted hover:text-ink",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
