"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { CookieConsent } from "@/components/site/cookie-consent";
import { ScrollToTop } from "@/components/site/scroll-to-top";
import { GoogleAds } from "@/components/site/google-ads";
import { useLocale } from "@/components/site/locale-provider";

/**
 * Public site chrome (Header + Footer). Hidden on /admin so the CMS has its
 * own layout. Keeps the marketing header/footer out of the back office.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const isAdmin = usePathname()?.startsWith("/admin") ?? false;
  const en = useLocale() === "en";

  if (isAdmin) return <>{children}</>;

  return (
    <>
      {/* Skip link — WCAG 2.4.1 bypass blocks; invisible until keyboard focus */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-snow"
      >
        {en ? "Skip to content" : "Μετάβαση στο περιεχόμενο"}
      </a>
      <Header />
      <div className="page-stack">
        <main id="main">{children}</main>
      </div>
      <Footer />
      <CookieConsent />
      <ScrollToTop />
      <GoogleAds />
    </>
  );
}
