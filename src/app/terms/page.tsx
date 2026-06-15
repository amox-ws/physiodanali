import type { Metadata } from "next";
import { site } from "@/lib/content";
import { terms } from "@/lib/legal";
import { PageHero } from "@/components/site/page-primitives";
import { LegalProse } from "@/components/site/legal-prose";

export const metadata: Metadata = {
  title: terms.meta.title,
  description: terms.meta.description,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        breadcrumb={terms.hero.breadcrumb}
        eyebrow={terms.hero.eyebrow}
        title={terms.hero.title}
        titleAccent={terms.hero.titleAccent}
        lead={terms.hero.lead}
        primaryCta={{ label: "Επικοινωνία", href: "/contact" }}
        secondaryCta={{ label: "Καλέστε τώρα", href: `tel:${site.phone}` }}
      />
      <LegalProse updated={terms.updated} sections={terms.sections} />
    </>
  );
}
