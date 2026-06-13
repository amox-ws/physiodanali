import type { Metadata, Viewport } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site/site-chrome";
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

export const metadata: Metadata = {
  title: {
    default: "PhysioDanali — Χειροπρακτική και Φυσικοθεραπεία κατ' οίκον",
    template: "%s · PhysioDanali",
  },
  description:
    "Επιστημονική αντιμετώπιση πόνου και αποκατάσταση στο σπίτι σας. Βούλα, Βουλιαγμένη, Βάρη, Γλυφάδα. Έως τις 23:00, Κυριακές και αργίες.",
  metadataBase: new URL("https://physiodanali.gr"),
  openGraph: {
    title: "PhysioDanali — Χειροπρακτική και Φυσικοθεραπεία κατ' οίκον",
    description:
      "Επιστημονική αντιμετώπιση πόνου και αποκατάσταση στο σπίτι σας. Άμεσα, αποτελεσματικά, όλες τις ημέρες της εβδομάδας.",
    locale: "el_GR",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f8fa",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="el"
      className={`${cormorant.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="antialiased">
        <JsonLd data={[localBusinessSchema, personSchema]} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
