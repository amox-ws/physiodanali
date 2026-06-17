import "server-only";
import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE, isLocale, toLocale, type Locale } from "@/lib/i18n";

/**
 * Resolve the active locale for server components.
 * Priority: `x-locale` header set by the proxy on /en/* routes (so English is
 * indexable without a cookie) → the `locale` cookie (in-session toggle) →
 * default (Greek).
 */
export async function getLocale(): Promise<Locale> {
  const h = await headers();
  const fromPath = h.get("x-locale");
  if (isLocale(fromPath)) return fromPath;
  const store = await cookies();
  return toLocale(store.get(LOCALE_COOKIE)?.value);
}
