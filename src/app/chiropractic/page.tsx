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

// One brand accent per condition card — adds colour + rhythm.
const COND_ACCENTS = ["#1e4d8b", "#2563b0", "#0f2540", "#8a6d3b", "#4577b8"];
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
      <section
        className="relative isolate overflow-hidden py-28 lg:py-36"
        style={{ backgroundColor: "#eef4fb" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55% 50% at 85% 5%, rgba(30,77,139,0.08) 0%, transparent 60%), radial-gradient(45% 55% at 5% 95%, rgba(126,168,220,0.14) 0%, transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={chiropractic.conditions.eyebrow}
            title={chiropractic.conditions.title}
            intro="Οι πιο συχνές περιπτώσεις που αντιμετωπίζει η χειροπρακτική παρέμβαση — με συνδυαστική προσέγγιση και έμφαση στη διαρκή αποκατάσταση."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {chiropractic.conditions.items.map((item, i) => {
              const accent = COND_ACCENTS[i % COND_ACCENTS.length];
              return (
                <Reveal key={item.title} delay={i * 0.08} className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-[24px] border border-stone bg-snow p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(15,37,64,0.18)] lg:p-10">
                    {/* Top accent bar — grows across the card on hover */}
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-1 w-16 transition-all duration-500 group-hover:w-full"
                      style={{ backgroundColor: accent }}
                    />
                    <h3
                      className="display mt-3 text-[clamp(1.75rem,2.6vw,2.4rem)] leading-tight tracking-tight"
                      style={{ color: accent }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-ink-muted lg:text-lg">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
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
