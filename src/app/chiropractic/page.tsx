import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  Zap,
  Accessibility,
  RefreshCw,
  MoveVertical,
  Sparkles,
  Check,
} from "lucide-react";
import { getContent } from "@/lib/content-i18n";
import { getLocale } from "@/lib/i18n-server";
import { localeHref } from "@/lib/i18n";
import { t } from "@/lib/translations";
import {
  PageHero,
  SectionHeader,
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

// Each condition card links to the page that covers it (client request).
// Order matches chiropractic.conditions.items: neck, low back, sciatica, shoulder.
const COND_LINKS = [
  "/neck-pain",
  "/low-back-pain",
  "/hip-pain",
  "/shoulder-pain",
];
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, medicalProcedureSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { chiropractic } = getContent(locale);
  return {
    title: chiropractic.meta.title,
    description: chiropractic.meta.description,
  };
}

export default async function ChiropracticPage() {
  const locale = await getLocale();
  const tx = t(locale);
  const { chiropractic, chiropracticFaq } = getContent(locale);
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
        bgImage="/xiropraktikks.jpg"
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
            intro={tx.chiropracticConditionsIntro}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {chiropractic.conditions.items.map((item, i) => {
              const accent = COND_ACCENTS[i % COND_ACCENTS.length];
              return (
                <Reveal key={item.title} delay={i * 0.08} className="h-full">
                  <Link
                    href={localeHref(COND_LINKS[i] ?? "/therapies", locale)}
                    className="group relative block h-full overflow-hidden rounded-[24px] border border-stone bg-snow p-8 transition-all duration-500 hover:-translate-y-1 hover:border-cobalt/40 hover:shadow-[0_30px_60px_-20px_rgba(15,37,64,0.18)] lg:p-10"
                  >
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
                  </Link>
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
            intro={tx.chiropracticIndicationsIntro}
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

      {/* Method — vertical timeline over a fixed parallax photo */}
      <section className="relative isolate overflow-hidden py-28 text-snow lg:py-36">
        {/* Fixed-attachment parallax photo */}
        <div
          aria-hidden
          className="parallax-fixed absolute inset-0 -z-20"
          style={{ backgroundImage:
            'image-set(url("/chiropractic2g.webp") type("image/webp"), url("/chiropractic2g.jpg") type("image/jpeg"))' }}
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
          <Reveal className="mb-14 max-w-[760px] lg:mb-16">
            <h2 className="display text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.02em] text-snow">
              {chiropractic.method.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-snow/75 lg:text-xl">
              {tx.chiropracticMethodIntro}
            </p>
          </Reveal>
          <ol className="relative mt-4 space-y-10 lg:space-y-12">
            {/* Connecting line behind the numbered circles */}
            <span
              aria-hidden
              className="absolute left-8 top-8 bottom-8 w-px -translate-x-1/2 bg-gradient-to-b from-gold/60 via-snow/30 to-snow/10"
            />
            {chiropractic.method.steps.map((step, i) => {
              const accent = COND_ACCENTS[i % COND_ACCENTS.length];
              return (
                <Reveal
                  as="li"
                  key={step.title}
                  x={70}
                  y={0}
                  delay={i * 0.1}
                  className="group relative flex items-start gap-6 lg:gap-8"
                >
                  <span
                    className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-full text-snow shadow-[0_14px_34px_-12px_rgba(0,0,0,0.6)] ring-1 ring-snow/15 transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundColor: accent }}
                  >
                    <span className="display text-2xl leading-none">
                      {i + 1}
                    </span>
                  </span>
                  <div className="pt-2.5">
                    <h3 className="display text-2xl leading-tight tracking-tight text-snow lg:text-[1.9rem]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-snow/75 lg:text-lg">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Benefits — dark section with gold checks */}
      <section className="relative isolate overflow-hidden bg-ink py-28 text-snow lg:py-36">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55% 55% at 85% 0%, rgba(184,153,104,0.16) 0%, transparent 60%), radial-gradient(50% 55% at 0% 100%, rgba(30,77,139,0.55) 0%, transparent 65%), #0a1628",
          }}
        />
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="mb-14 max-w-[760px] lg:mb-16">
            <h2 className="display text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.02em] text-snow">
              {chiropractic.benefits.title}
            </h2>
          </Reveal>
          <div className="grid gap-x-12 gap-y-2 sm:grid-cols-2">
            {chiropractic.benefits.items.map((item, i) => (
              <Reveal
                key={item}
                x={i % 2 === 0 ? -60 : 60}
                y={0}
                delay={(i % 2) * 0.08}
                className="group flex items-center gap-5 border-b border-snow/12 py-6"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                  <Check className="size-5" strokeWidth={2.5} />
                </span>
                <span className="text-lg leading-snug text-snow lg:text-xl">
                  {item}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions linked to dedicated pages */}
      <section className="bg-porcelain py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="mb-10">
            <h3 className="display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-tight text-ink">
              {tx.chiropracticConditionPagesTitle}
            </h3>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-[24px] border border-stone bg-stone sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/neck-pain", label: tx.chiropracticCondNeck },
              { href: "/low-back-pain", label: tx.chiropracticCondLowBack },
              { href: "/hip-pain", label: tx.chiropracticCondHip },
              { href: "/shoulder-pain", label: tx.chiropracticCondShoulder },
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
          <SectionHeader eyebrow={tx.faqHeading} title={tx.faqTitle} />
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
        title={tx.chiropracticCtaTitle}
        titleAccent={tx.chiropracticCtaAccent}
        lead={tx.chiropracticCtaLead}
      />

      <RelatedServices exclude="chiropractic" />
    </>
  );
}
