import type { Metadata } from "next";
import { getContent } from "@/lib/content-i18n";
import { getLocale } from "@/lib/i18n-server";
import { t } from "@/lib/translations";
import {
  PageHero,
  SectionHeader,
  CheckList,
  NumberedSteps,
  PractitionerCard,
  FinalCTA,
  RelatedServices,
} from "@/components/site/page-primitives";
import { FaqList } from "@/components/site/faq-list";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  faqSchema,
  medicalProcedureSchema,
} from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { clinicalPilates } = getContent(locale);
  return {
    title: clinicalPilates.meta.title,
    description: clinicalPilates.meta.description,
  };
}

export default async function ClinicalPilatesPage() {
  const locale = await getLocale();
  const tx = t(locale);
  const { clinicalPilates } = getContent(locale);
  return (
    <>
      <JsonLd
        data={[
          medicalProcedureSchema({
            name: "Clinical Pilates κατ' οίκον",
            description: clinicalPilates.meta.description,
            url: "/clinical-pilates",
          }),
          faqSchema(clinicalPilates.faq),
          breadcrumbSchema([
            { name: "Αρχική", url: "/" },
            { name: "Υπηρεσίες", url: "/" },
            { name: "Clinical Pilates", url: "/clinical-pilates" },
          ]),
        ]}
      />

      <PageHero
        breadcrumb={clinicalPilates.breadcrumb}
        eyebrow={clinicalPilates.hero.eyebrow}
        title={clinicalPilates.hero.title}
        titleAccent={clinicalPilates.hero.titleAccent}
        lead={clinicalPilates.hero.lead}
        primaryCta={clinicalPilates.hero.primaryCta}
        secondaryCta={clinicalPilates.hero.secondaryCta}
        bgImage="/clinicalpilates.jpg"
      />

      {/* About */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1] tracking-[-0.02em] text-ink">
                  {clinicalPilates.about.title}
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-lg leading-relaxed text-ink-muted lg:text-xl">
                  {clinicalPilates.about.body}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who is it for — fixed parallax photo background */}
      <section className="relative isolate overflow-hidden py-28 text-snow lg:py-36">
        {/* Fixed-attachment parallax photo */}
        <div
          aria-hidden
          className="parallax-fixed absolute inset-0 -z-20"
          style={{ backgroundImage:
            'image-set(url("/clinical2g.webp") type("image/webp"), url("/clinical2g.jpg") type("image/jpeg"))' }}
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
                {clinicalPilates.whoFor.title}
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-base leading-relaxed text-snow/75 lg:text-lg">
                {clinicalPilates.whoFor.intro}
              </p>
            </div>
          </Reveal>
          <CheckList items={clinicalPilates.whoFor.items} />
        </div>
      </section>

      {/* Process */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={clinicalPilates.process.eyebrow}
            title={clinicalPilates.process.title}
            intro={clinicalPilates.process.intro}
          />
          <NumberedSteps steps={clinicalPilates.process.steps} />
        </div>
      </section>

      {/* Equipment */}
      <section className="bg-ink py-28 text-snow lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <h2 className="display text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.98] tracking-[-0.025em] text-snow">
                  {clinicalPilates.equipment.title}
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-lg leading-relaxed text-snow/75 lg:text-xl">
                  {clinicalPilates.equipment.body}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader eyebrow={tx.faqHeading} title={tx.faqTitle} />
          <FaqList items={clinicalPilates.faq} />
        </div>
      </section>

      {/* Practitioner */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <PractitionerCard />
        </div>
      </section>

      <FinalCTA
        title={tx.clinicalPilatesCtaTitle}
        titleAccent={tx.clinicalPilatesCtaAccent}
        lead={tx.clinicalPilatesCtaLead}
      />

      <RelatedServices exclude="clinical-pilates" />
    </>
  );
}
