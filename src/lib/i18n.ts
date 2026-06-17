// ─────────────────────────────────────────────────────────────────────
// Bilingual (Greek / English) locale plumbing.
//
// The active locale is stored in a cookie so server components can read it
// per-request (via next/headers) and the client toggle can flip it. Default
// is Greek; English is the alternate. Untranslated strings fall back to
// Greek through the content getters, so the site never shows blanks.
// ─────────────────────────────────────────────────────────────────────

export type Locale = "el" | "en";

export const LOCALES: Locale[] = ["el", "en"];
export const DEFAULT_LOCALE: Locale = "el";
export const LOCALE_COOKIE = "locale";

export function isLocale(v: unknown): v is Locale {
  return v === "el" || v === "en";
}

/** Normalise any cookie value to a valid Locale. */
export function toLocale(v: unknown): Locale {
  return isLocale(v) ? v : DEFAULT_LOCALE;
}
