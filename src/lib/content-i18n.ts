import * as el from "@/lib/content";
import * as en from "@/lib/content.en";
import type { Locale } from "@/lib/i18n";

// Locale-aware content. Greek (content.ts) is the source of truth and the
// shape authority; English (content.en.ts) overrides the exports it provides
// and anything missing falls back to Greek. Both modules are plain data, so
// this is safe in both server and client components.
export type SiteContent = typeof el;

export function getContent(locale: Locale): SiteContent {
  if (locale === "en") {
    return { ...el, ...en } as unknown as SiteContent;
  }
  return el;
}
