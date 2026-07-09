import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site/site-chrome";
import { LocaleProvider } from "@/components/site/locale-provider";
import { getLocale } from "@/lib/i18n-server";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessSchema, personSchema } from "@/lib/seo";

// Manrope — minimal geometric sans for display headings, with full Greek
// support. Keeps the --font-cormorant variable name so the design system
// (globals.css → --font-serif → .display/.display-italic) is unchanged.
const cormorant = Manrope({
  variable: "--font-cormorant",
  subsets: ["greek", "latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["greek", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isEn = locale === "en";

  // Path-aware hreflang/canonical (proxy sets x-pathname to the canonical path).
  const path = (await headers()).get("x-pathname") || "/";
  const enPath = path === "/" ? "/en" : `/en${path}`;

  const defaultTitle = isEn
    ? "PhysioDanali — At-Home Chiropractic & Physiotherapy in Glyfada & Voula"
    : "PhysioDanali — Χειροπρακτική & Φυσικοθεραπεία κατ' οίκον σε Γλυφάδα & Βούλα";

  // Long-form marketing description (homepage / OG).
  const description = isEn
    ? "Evidence-based pain treatment and rehabilitation in your own home. Voula, Vouliagmeni, Vari, Glyfada. Every day, Sundays and holidays."
    : "Επιστημονική αντιμετώπιση πόνου και αποκατάσταση στο σπίτι σας. Βούλα, Βουλιαγμένη, Βάρη, Γλυφάδα. Καθημερινά, Κυριακές και αργίες.";

  const ogDescription = isEn
    ? "Evidence-based pain treatment and rehabilitation in your own home. Fast, effective, every day of the week."
    : "Επιστημονική αντιμετώπιση πόνου και αποκατάσταση στο σπίτι σας. Άμεσα, αποτελεσματικά, όλες τις ημέρες της εβδομάδας.";

  const twitterDescription = isEn
    ? "Evidence-based pain treatment and rehabilitation in your own home. Voula, Vouliagmeni, Vari, Glyfada."
    : "Επιστημονική αντιμετώπιση πόνου και αποκατάσταση στο σπίτι σας. Βούλα, Βουλιαγμένη, Βάρη, Γλυφάδα.";

  return {
    title: {
      default: defaultTitle,
      template: "%s · PhysioDanali",
    },
    description,
    metadataBase: new URL("https://physiodanali.gr"),
    // Google Search Console ownership (HTML-tag method). Set the token in the
    // GOOGLE_SITE_VERIFICATION env var when the property is created.
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
    openGraph: {
      title: defaultTitle,
      description: ogDescription,
      locale: isEn ? "en_US" : "el_GR",
      type: "website",
      siteName: "PhysioDanali",
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: twitterDescription,
    },
    alternates: {
      canonical: isEn ? enPath : path,
      languages: {
        el: path,
        en: enPath,
        "x-default": path,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f7f8fa",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="antialiased">
        <JsonLd data={[localBusinessSchema, personSchema]} />
        <LocaleProvider locale={locale}>
          <SiteChrome>{children}</SiteChrome>
        </LocaleProvider>
      </body>
    </html>
  );
}
