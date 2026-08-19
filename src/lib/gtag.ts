// ─────────────────────────────────────────────────────────────────────
// Google Ads conversion tracking (client-provided snippets, Aug 2026).
//
// The base Google tag (gtag.js) is loaded once by <GoogleAds /> with
// Consent Mode v2 — storage defaults to "denied" and flips to "granted"
// only after the visitor accepts the cookie banner. Conversions:
//
//   phoneclick     → any click on a tel: link
//   messageform    → successful contact/booking form submission
//   whatsappclick  → any click on a wa.me link
// ─────────────────────────────────────────────────────────────────────

export const ADS_ID = "AW-16494421065";

/** Google Analytics 4 — the client's existing property (same one his Tag
 *  Manager container reports on). Loaded alongside the Ads tag so a single
 *  gtag.js serves both: ADS_ID measures conversions, GA_ID measures traffic. */
export const GA_ID = "G-R4DCHSJWE7";

export const CONVERSION = {
  phoneClick: "AW-16494421065/bL6ECMXhsbUZEMnIk7k9",
  messageForm: "AW-16494421065/W946CICC4rUZEMnIk7k9",
  whatsappClick: "AW-16494421065/cgU0CPvaurUZEMnIk7k9",
} as const;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire a Google Ads conversion. Safe no-op when gtag isn't loaded. */
export function reportAdsConversion(
  sendTo: (typeof CONVERSION)[keyof typeof CONVERSION],
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function")
    return;
  window.gtag("event", "conversion", { send_to: sendTo });
}
