import type { Metadata } from "next";
import { site } from "@/lib/content";
import { cookies } from "@/lib/legal";
import { PageHero } from "@/components/site/page-primitives";
import { LegalProse } from "@/components/site/legal-prose";

export const metadata: Metadata = {
  title: cookies.meta.title,
  description: cookies.meta.description,
};

export default function CookiesPage() {
  return (
    <>
      <PageHero
        breadcrumb={cookies.hero.breadcrumb}
        eyebrow={cookies.hero.eyebrow}
        title={cookies.hero.title}
        titleAccent={cookies.hero.titleAccent}
        lead={cookies.hero.lead}
        primaryCta={{ label: "Επικοινωνία", href: "/contact" }}
        secondaryCta={{ label: "Καλέστε τώρα", href: `tel:${site.phone}` }}
      />
      <LegalProse updated={cookies.updated} sections={cookies.sections} />
    </>
  );
}
