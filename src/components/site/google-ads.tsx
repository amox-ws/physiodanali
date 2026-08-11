"use client";

import { useEffect } from "react";
import Script from "next/script";
import { ADS_ID, CONVERSION, reportAdsConversion } from "@/lib/gtag";
import { hasAnalyticsConsent } from "@/components/site/cookie-consent";

/**
 * Google Ads base tag + click-level conversion tracking.
 *
 * — Loads gtag.js once with Consent Mode v2: all storage starts "denied"
 *   and is upgraded to "granted" only after the visitor accepts the cookie
 *   banner (listens for the banner's `pd-consent-change` event). Under
 *   denied consent Google still receives cookieless conversion pings, so
 *   the client's ad reporting keeps working within GDPR.
 * — A single document-level click listener converts every `tel:` and
 *   `wa.me` link on the site into the client's phoneclick / whatsappclick
 *   conversions — header, footer, landers and any future links included.
 */
export function GoogleAds() {
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
      <Script
        id="gtag-base"
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
        strategy="afterInteractive"
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
        `}
      </Script>
    </>
  );
}
