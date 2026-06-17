"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/i18n";
import { getContent, type SiteContent } from "@/lib/content-i18n";

const LocaleContext = createContext<Locale>("el");

/** Makes the server-resolved locale available to client components. */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** Locale-aware content bundle for client components. */
export function useContent(): SiteContent {
  return getContent(useLocale());
}
