import type { Metadata } from "next";
import { site } from "@/lib/content";
import { privacy } from "@/lib/legal";
import { PageHero } from "@/components/site/page-primitives";
import { LegalProse } from "@/components/site/legal-prose";

export const metadata: Metadata = {
  title: privacy.meta.title,
  description: privacy.meta.description,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumb={privacy.hero.breadcrumb}
        eyebrow={privacy.hero.eyebrow}
        title={privacy.hero.title}
        titleAccent={privacy.hero.titleAccent}
        lead={privacy.hero.lead}
        primaryCta={{ label: "Επικοινωνία", href: "/contact" }}
        secondaryCta={{ label: "Καλέστε τώρα", href: `tel:${site.phone}` }}
      />
      <LegalProse updated={privacy.updated} sections={privacy.sections} />
    </>
  );
}
