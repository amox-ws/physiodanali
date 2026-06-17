"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n";
import { useLocale } from "@/components/site/locale-provider";

/**
 * EL / EN language switch. Writes the locale cookie and refreshes the route
 * so server components re-render in the new language.
 */
export function LocaleToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const set = (next: Locale) => {
    if (next === locale) return;
    // 1 year, site-wide.
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    startTransition(() => router.refresh());
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
