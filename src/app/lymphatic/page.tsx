import type { Metadata } from "next";
import { getContent } from "@/lib/content-i18n";
import { getLocale } from "@/lib/i18n-server";
import { t } from "@/lib/translations";
import {
  PageHero,
  SectionHeader,
  CardGrid,
  CheckList,
  PractitionerCard,
  FinalCTA,
  RelatedServices,
} from "@/components/site/page-primitives";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, medicalProcedureSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { lymphatic } = getContent(locale);
  return {
    title: lymphatic.meta.title,
    description: lymphatic.meta.description,
  };
}

export default async function LymphaticPage() {
  const locale = await getLocale();
  const tx = t(locale);
  const { lymphatic } = getContent(locale);
  return (
    <>
      <JsonLd
        data={[
          medicalProcedureSchema({
            name: "Brazilian Lymphatic Drainage",
            description: lymphatic.meta.description,
            url: "/lymphatic",
          }),
          breadcrumbSchema([
            { name: "Αρχική", url: "/" },
            { name: "Υπηρεσίες", url: "/" },
            { name: "Brazilian Lymphatic", url: "/lymphatic" },
          ]),
        ]}
      />
      <PageHero
        breadcrumb={lymphatic.breadcrumb}
        eyebrow={lymphatic.hero.eyebrow}
        title={lymphatic.hero.title}
        titleAccent={lymphatic.hero.titleAccent}
        lead={lymphatic.hero.lead}
        primaryCta={lymphatic.hero.primaryCta}
        secondaryCta={lymphatic.hero.secondaryCta}
        bgImage="/brazilian.jpg"
      />

      {/* Benefits — fixed parallax photo background */}
      <section className="relative isolate overflow-hidden py-28 text-snow lg:py-36">
        {/* Fixed-attachment parallax photo */}
        <div
          aria-hidden
          className="parallax-fixed absolute inset-0 -z-20"
          style={{ backgroundImage:
            'image-set(url("/brazilian2g.webp") type("image/webp"), url("/brazilian2g.jpg") type("image/jpeg"))' }}
        />
        {/* Dark scrim for legibility */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 0%, rgba(30,77,139,0.32) 0%, transparent 60%), linear-gradient(180deg, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.74) 100%)",
          }}
        />
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="mb-14 grid gap-10 lg:grid-cols-12 lg:items-end lg:mb-16">
            <div className="lg:col-span-7">
              <h2 className="display text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.02em] text-snow">
                {lymphatic.benefits.title}
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-base leading-relaxed text-snow/75 lg:text-lg">
                {tx.lymphaticBenefitsIntro}
              </p>
            </div>
          </Reveal>
          <CheckList items={lymphatic.benefits.items} />
        </div>
      </section>

      {/* Why us */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={lymphatic.why.eyebrow}
            title={lymphatic.why.title}
            intro={tx.lymphaticWhyIntro}
          />
          <CardGrid items={lymphatic.why.items} cols={3} />
        </div>
      </section>

      {/* Practitioner */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <PractitionerCard />
        </div>
      </section>

      <FinalCTA
        title={tx.lymphaticCtaTitle}
        titleAccent={tx.lymphaticCtaAccent}
        lead={tx.lymphaticCtaLead}
      />

      <RelatedServices exclude="lymphatic" />
    </>
  );
}
