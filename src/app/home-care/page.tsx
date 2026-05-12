import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { areaPages, homeCare, homecareFaq, site } from "@/lib/content";
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
  title: homeCare.meta.title,
  description: homeCare.meta.description,
};

export default function HomeCarePage() {
  const areas = Object.values(areaPages);
  return (
    <>
      <JsonLd
        data={[
          medicalProcedureSchema({
            name: "Φυσικοθεραπεία κατ' οίκον",
            description: homeCare.meta.description,
            url: "/home-care",
          }),
          faqSchema(homecareFaq),
          breadcrumbSchema([
            { name: "Αρχική", url: "/" },
            { name: "Υπηρεσίες", url: "/" },
            { name: "Κατ' οίκον", url: "/home-care" },
          ]),
        ]}
      />
      <PageHero
        breadcrumb={homeCare.breadcrumb}
        eyebrow={homeCare.hero.eyebrow}
        title={homeCare.hero.title}
        titleAccent={homeCare.hero.titleAccent}
        lead={homeCare.hero.lead}
        primaryCta={homeCare.hero.primaryCta}
        secondaryCta={homeCare.hero.secondaryCta}
      />

      {/* Conditions */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={homeCare.conditions.eyebrow}
            title={homeCare.conditions.title}
            intro="Μυοσκελετικές, νευρολογικές και μετα-χειρουργικές καταστάσεις — όλες με εξατομικευμένο πλάνο και τον ίδιο φυσικοθεραπευτή σε κάθε συνεδρία."
          />
          <Reveal>
            <CheckList items={homeCare.conditions.items} />
          </Reveal>
        </div>
      </section>

      {/* Methods */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={homeCare.methods.eyebrow}
            title={homeCare.methods.title}
            intro="Όλος ο εξοπλισμός που χρειάζεται μια ολοκληρωμένη συνεδρία — έρχεται σε σας."
          />
          <CardGrid items={homeCare.methods.items} cols={3} />
        </div>
      </section>

      {/* Availability */}
      <section className="bg-ink py-28 text-snow lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <span className="eyebrow text-gold">
                  {homeCare.availability.eyebrow}
                </span>
                <h2 className="display mt-5 text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.98] tracking-[-0.025em] text-snow">
                  {homeCare.availability.title}
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-lg leading-relaxed text-snow/75 lg:text-xl">
                  {homeCare.availability.body}
                </p>
                <div className="mt-10 grid gap-4">
                  {site.hoursList.map((h) => (
                    <div
                      key={h.label}
                      className="flex items-center justify-between border-b border-snow/15 pb-4"
                    >
                      <span className="text-sm uppercase tracking-[0.18em] text-snow/55">
                        {h.label}
                      </span>
                      <span className="display text-xl tracking-tight text-snow">
                        {h.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Service Areas — links to dynamic pages */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow="Περιοχές εξυπηρέτησης"
            title="Σελίδες ανά περιοχή."
            intro="Δείτε αναλυτικά τι ισχύει για τη δική σας περιοχή — διαθεσιμότητα, χρόνος μετάβασης, ραντεβού."
          />
          <Reveal>
            <div className="grid gap-px overflow-hidden rounded-[24px] border border-stone bg-stone sm:grid-cols-2 lg:grid-cols-5">
              {areas.map((a, idx) => (
                <Link
                  key={a.slug}
                  href={`/home-care/${a.slug}`}
                  className="group block bg-snow p-7 transition-colors hover:bg-mist"
                >
                  <span className="text-[11px] uppercase tracking-[0.22em] text-ink-muted/60">
                    0{idx + 1}
                  </span>
                  <span className="display mt-4 block break-words text-[clamp(1.75rem,2.5vw,2.5rem)] leading-[0.95] tracking-[-0.02em] text-ink transition-colors group-hover:text-cobalt">
                    {a.name}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                    {a.highlight}
                  </p>
                  <ArrowUpRight
                    className="mt-6 size-4 text-ink-muted transition-all duration-500 group-hover:rotate-45 group-hover:text-cobalt"
                    strokeWidth={1.5}
                  />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow="Συχνές ερωτήσεις"
            title="Ό,τι σας ενδιαφέρει."
          />
          <FaqList items={homecareFaq} />
        </div>
      </section>

      {/* Practitioner */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <PractitionerCard />
        </div>
      </section>

      <FinalCTA
        title="Στο σπίτι σας. Άμεσα."
        titleAccent="Στο σπίτι σας."
        lead="Καλύπτουμε Βούλα, Βουλιαγμένη, Βάρη, Γλυφάδα και Άλιμο. Ραντεβού αυθημερόν εφόσον υπάρχει διαθεσιμότητα."
      />

      <RelatedServices exclude="home-care" />
    </>
  );
}
