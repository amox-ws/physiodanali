"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { ADS_ID, GA_ID, CONVERSION, reportAdsConversion } from "@/lib/gtag";
import { hasAnalyticsConsent } from "@/components/site/cookie-consent";

/**
 * Google tag — Ads conversions + GA4 traffic, from one gtag.js load.
 *
 * — Loads gtag.js once with Consent Mode v2: all storage starts "denied"
 *   and is upgraded to "granted" only after the visitor accepts the cookie
 *   banner (listens for the banner's `pd-consent-change` event). Under
 *   denied consent Google still receives cookieless conversion pings, so
 *   the client's ad reporting keeps working within GDPR.
 * — GA4 (`GA_ID`) rides the same tag. The App Router navigates client-side,
 *   so gtag's automatic page_view only fires on the first load; we send one
 *   per route change ourselves, skipping the first to avoid a double count.
 * — A single document-level click listener converts every `tel:` and
 *   `wa.me` link on the site into the client's phoneclick / whatsappclick
 *   conversions — header, footer, landers and any future links included.
 */
export function GoogleAds() {
  const pathname = usePathname();
  const firstView = useRef(true);

  // GA4 page_view on client-side navigation. The initial view is already
  // sent by gtag('config'), so the first run here is a no-op.
  useEffect(() => {
    if (firstView.current) {
      firstView.current = false;
      return;
    }
    window.gtag?.("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  useEffect(() => {
    const grant = () => {
      window.gtag?.("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
    };
    if (hasAnalyticsConsent()) grant();
    const onConsent = (e: Event) => {
      if ((e as CustomEvent).detail === "accepted") grant();
    };
    window.addEventListener("pd-consent-change", onConsent);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      if (!href) return;
      if (href.startsWith("tel:")) {
        reportAdsConversion(CONVERSION.phoneClick);
      } else if (href.includes("wa.me") || href.includes("whatsapp.com")) {
        reportAdsConversion(CONVERSION.whatsappClick);
      }
    };
    document.addEventListener("click", onClick, { capture: true });

    return () => {
      window.removeEventListener("pd-consent-change", onConsent);
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  return (
    <>
      {/* gtag.js is ~194KB — the single heaviest file on the page. It only
          needs to be present before a conversion is *sent*, not before one is
          *queued*: the inline snippet below defines gtag()/dataLayer straight
          away, so clicks land in the queue and gtag.js drains it once it
          arrives. Moving it to idle takes it off the critical path without
          losing a single conversion or breaking Consent Mode. */}
      <Script
        id="gtag-base"
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
        strategy="lazyOnload"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied'
          });
          gtag('js', new Date());
          gtag('config', '${ADS_ID}');
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
