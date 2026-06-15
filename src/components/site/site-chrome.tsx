"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { CookieConsent } from "@/components/site/cookie-consent";

/**
 * Public site chrome (Header + Footer). Hidden on /admin so the CMS has its
 * own layout. Keeps the marketing header/footer out of the back office.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const isAdmin = usePathname()?.startsWith("/admin") ?? false;

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Header />
      <div className="page-stack">
        <main>{children}</main>
      </div>
      <Footer />
      <CookieConsent />
    </>
  );
}
