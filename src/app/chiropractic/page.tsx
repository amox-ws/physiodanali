import type { Metadata } from "next";
import {
  Activity,
  Zap,
  Accessibility,
  RefreshCw,
  MoveVertical,
  Sparkles,
} from "lucide-react";
import { chiropractic, chiropracticFaq } from "@/lib/content";
import {
  PageHero,
  SectionHeader,
  CardGrid,
  CheckList,
  NumberedSteps,
  PractitionerCard,
  FinalCTA,
  RelatedServices,
} from "@/components/site/page-primitives";
import { Reveal } from "@/components/motion/reveal";

// Icons paired to each indication (by order), to give the section visual
// rhythm instead of a flat checklist.
const INDICATION_ICONS = [
  Activity,
  Zap,
  Accessibility,
  RefreshCw,
  MoveVertical,
  Sparkles,
];
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, medicalProcedureSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: chiropractic.meta.title,
  description: chiropractic.meta.description,
};

export default function ChiropracticPage() {
  return (
    <>
      <JsonLd
        data={[
          medicalProcedureSchema({
            name: "Χειροπρακτική κατ' οίκον",
            description: chiropractic.meta.description,
            url: "/chiropractic",
          }),
          faqSchema(chiropracticFaq),
          breadcrumbSchema([
            { name: "Αρχική", url: "/" },
            { name: "Υπηρεσίες", url: "/" },
            { name: "Χειροπρακτική", url: "/chiropractic" },
          ]),
        ]}
      />
      <PageHero
        breadcrumb={chiropractic.breadcrumb}
        eyebrow={chiropractic.hero.eyebrow}
        title={chiropractic.hero.title}
        titleAccent={chiropractic.hero.titleAccent}
        lead={chiropractic.hero.lead}
        primaryCta={chiropractic.hero.primaryCta}
        secondaryCta={chiropractic.hero.secondaryCta}
        bgImage="/chiropractic.jpg"
      />

      {/* Conditions */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={chiropractic.conditions.eyebrow}
            title={chiropractic.conditions.title}
            intro="Οι πιο συχνές περιπτώσεις που αντιμετωπίζει η χειροπρακτική παρέμβαση — με συνδυαστική προσέγγιση και έμφαση στη διαρκή αποκατάσταση."
          />
          <CardGrid items={chiropractic.conditions.items} />
        </div>
      </section>

      {/* Indications */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={chiropractic.indications.eyebrow}
            title={chiropractic.indications.title}
            intro="Αν αναγνωρίζετε κάποια από τις παρακάτω καταστάσεις, η χειροπρακτική κατ' οίκον είναι κατάλληλη επιλογή."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {chiropractic.indications.items.map((item, i) => {
              const Icon = INDICATION_ICONS[i % INDICATION_ICONS.length];
              return (
                <Reveal key={item} delay={i * 0.07} className="h-full">
                  <div className="group flex h-full items-start gap-5 rounded-[24px] border border-stone bg-snow p-7 transition-all duration-500 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-[0_30px_60px_-20px_rgba(15,37,64,0.15)] lg:p-8">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-cobalt/10 text-cobalt transition-colors duration-500 group-hover:bg-cobalt group-hover:text-snow lg:size-14">
                      <Icon className="size-6 lg:size-7" strokeWidth={1.5} />
                    </span>
                    <p className="text-lg font-medium leading-snug text-ink lg:text-xl">
                      {item}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={chiropractic.method.eyebrow}
            title={chiropractic.method.title}
            intro="Τέσσερα βήματα — από την επιστημονική αξιολόγηση μέχρι το πρόγραμμα συντήρησης στο σπίτι."
          />
          <NumberedSteps steps={chiropractic.method.steps} />
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={chiropractic.benefits.eyebrow}
            title={chiropractic.benefits.title}
          />
          <Reveal>
            <CheckList items={chiropractic.benefits.items} />
          </Reveal>
        </div>
      </section>

      {/* Conditions linked to dedicated pages */}
      <section className="bg-porcelain py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="mb-10">
            <h3 className="display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-tight text-ink">
              Σελίδες ανά πάθηση.
            </h3>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-[24px] border border-stone bg-stone sm:grid-cols-3">
            {[
              { href: "/neck-pain", label: "Αυχεναλγία" },
              { href: "/low-back-pain", label: "Οσφυαλγία" },
              { href: "/hip-pain", label: "Ισχιαλγία" },
            ].map((c) => (
              <a
                key={c.href}
                href={c.href}
                className="group flex items-center justify-between bg-snow p-7 transition-colors hover:bg-mist"
              >
                <span className="display text-2xl tracking-[-0.02em] text-ink transition-colors group-hover:text-cobalt lg:text-3xl">
                  {c.label}
                </span>
                <span className="text-ink-muted transition-colors group-hover:text-cobalt">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow="Συχνές ερωτήσεις"
            title="Ό,τι σας ενδιαφέρει."
          />
          <FaqList items={chiropracticFaq} />
        </div>
      </section>

      {/* Practitioner */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <PractitionerCard />
        </div>
      </section>

      <FinalCTA
        title="Έτοιμοι όταν είστε."
        titleAccent="Έτοιμοι"
        lead="Ραντεβού δίνονται έως αυθημερόν, εφόσον υπάρχει διαθεσιμότητα. Καλύπτουμε Βούλα, Βουλιαγμένη, Βάρη, Γλυφάδα, Άλιμο."
      />

      <RelatedServices exclude="chiropractic" />
    </>
  );
}
