import type { Metadata } from "next";
import { clinicalPilates } from "@/lib/content";
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

export const metadata: Metadata = {
  title: clinicalPilates.meta.title,
  description: clinicalPilates.meta.description,
  alternates: { canonical: "/clinical-pilates" },
};

export default function ClinicalPilatesPage() {
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

      {/* Who is it for */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={clinicalPilates.whoFor.eyebrow}
            title={clinicalPilates.whoFor.title}
            intro={clinicalPilates.whoFor.intro}
          />
          <Reveal>
            <CheckList items={clinicalPilates.whoFor.items} />
          </Reveal>
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
          <SectionHeader
            eyebrow="Συχνές ερωτήσεις"
            title="Ό,τι σας ενδιαφέρει."
          />
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
        title="Ξεκινήστε σήμερα. Στο σπίτι σας."
        titleAccent="Στο σπίτι σας."
        lead="Άμεση κράτηση. Ραντεβού ίδια μέρα, εφόσον υπάρχει διαθεσιμότητα. Καλύπτουμε Βούλα, Βουλιαγμένη, Βάρη, Γλυφάδα και Άλιμο."
      />

      <RelatedServices exclude="clinical-pilates" />
    </>
  );
}
