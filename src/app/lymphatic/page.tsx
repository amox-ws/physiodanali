import type { Metadata } from "next";
import { lymphatic, lymphaticFaq } from "@/lib/content";
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
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, medicalProcedureSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: lymphatic.meta.title,
  description: lymphatic.meta.description,
};

export default function LymphaticPage() {
  return (
    <>
      <JsonLd
        data={[
          medicalProcedureSchema({
            name: "Brazilian Lymphatic Drainage",
            description: lymphatic.meta.description,
            url: "/lymphatic",
          }),
          faqSchema(lymphaticFaq),
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

      {/* About / definition */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1] tracking-[-0.02em] text-ink">
                  {lymphatic.about.title}
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-lg leading-relaxed text-ink-muted lg:text-xl">
                  {lymphatic.about.body}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={lymphatic.benefits.eyebrow}
            title={lymphatic.benefits.title}
            intro="Συνδυάζει αισθητικό αποτέλεσμα με θεραπευτική αξία — ιδιαίτερα μετά από επεμβάσεις ή για χρόνια κατακράτηση."
          />
          <Reveal>
            <CheckList items={lymphatic.benefits.items} />
          </Reveal>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={lymphatic.why.eyebrow}
            title={lymphatic.why.title}
            intro="Δεν είναι κοσμετική παρέμβαση — είναι εξειδικευμένη φυσικοθεραπευτική τεχνική με 20+ χρόνια εφαρμογής."
          />
          <CardGrid items={lymphatic.why.items} cols={3} />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow="Συχνές ερωτήσεις"
            title="Ό,τι σας ενδιαφέρει."
          />
          <FaqList items={lymphaticFaq} />
        </div>
      </section>

      {/* Practitioner */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <PractitionerCard />
        </div>
      </section>

      <FinalCTA
        title="Νοιώστε τη διαφορά. Άμεσα."
        titleAccent="τη διαφορά."
        lead="Brazilian lymphatic drainage κατ' οίκον σε Βούλα, Βουλιαγμένη, Βάρη, Γλυφάδα και Άλιμο."
      />

      <RelatedServices exclude="lymphatic" />
    </>
  );
}
