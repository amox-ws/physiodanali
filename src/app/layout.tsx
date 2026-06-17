import type { Metadata, Viewport } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site/site-chrome";
import { LocaleProvider } from "@/components/site/locale-provider";
import { getLocale } from "@/lib/i18n-server";
import { JsonLd } from "@/components/seo/json-ld";
import { localBusinessSchema, personSchema } from "@/lib/seo";

// EB Garamond — Garamond-style serif with full Greek support (Cormorant
// Garamond has no Greek subset). Keeps the --font-cormorant variable so the
// design system (globals.css) is unchanged. Swap here for another Greek serif
// (Literata, Noto Serif Display, GFS Didot) if the brand prefers.
const cormorant = EB_Garamond({
  variable: "--font-cormorant",
  subsets: ["greek", "latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
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

  const defaultTitle = isEn
    ? "PhysioDanali — Chiropractic & Physiotherapy at home"
    : "PhysioDanali — Χειροπρακτική και Φυσικοθεραπεία κατ' οίκον";

  // Long-form marketing description (homepage / OG).
  const description = isEn
    ? "Evidence-based pain treatment and rehabilitation in your own home. Voula, Vouliagmeni, Vari, Glyfada. Until 23:00, Sundays and holidays."
    : "Επιστημονική αντιμετώπιση πόνου και αποκατάσταση στο σπίτι σας. Βούλα, Βουλιαγμένη, Βάρη, Γλυφάδα. Έως τις 23:00, Κυριακές και αργίες.";

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
      canonical: "/",
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
