import type { Metadata } from "next";
import { Star, Check } from "lucide-react";
import { getContent } from "@/lib/content-i18n";
import { getLocale } from "@/lib/i18n-server";
import { t } from "@/lib/translations";
import {
  PageHero,
  SectionHeader,
  CardGrid,
  CheckList,
  FinalCTA,
  RelatedServices,
} from "@/components/site/page-primitives";
import { Reveal } from "@/components/motion/reveal";
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, medicalProcedureSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { lymphatic } = getContent(locale);
  return {
    title: lymphatic.meta.title,
    description: lymphatic.meta.description,
  };
}

// Section order mirrors the old site's page, which the client asked us to keep
// verbatim: why → indications → therapist → process → reviews.
export default async function LymphaticPage() {
  const locale = await getLocale();
  const tx = t(locale);
  const { lymphatic, lymphaticFaq } = getContent(locale);
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

      {/* Trust strip — the badges and service line the old hero carried */}
      <section className="border-b border-stone bg-snow py-8">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <span className="flex items-center gap-2">
                <span className="flex gap-0.5" aria-label="5 από 5 αστέρια">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-3.5 fill-gold text-gold"
                      strokeWidth={1}
                    />
                  ))}
                </span>
                <span className="text-sm font-medium text-ink">
                  {lymphatic.hero.badges[0]}
                </span>
              </span>
              {lymphatic.hero.badges.slice(1).map((b) => (
                <span key={b} className="text-sm text-ink-muted">
                  {b}
                </span>
              ))}
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-2">
              {lymphatic.hero.trust.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-ink-muted"
                >
                  <Check className="size-4 shrink-0 text-cobalt" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
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

      {/* Indications — fixed parallax photo background */}
      <section className="relative isolate overflow-hidden py-28 text-snow lg:py-36">
        <div
          aria-hidden
          className="parallax-fixed absolute inset-0 -z-20"
          style={{ backgroundImage: "url(/brazilian2g.jpg)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 0%, rgba(30,77,139,0.32) 0%, transparent 60%), linear-gradient(180deg, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.74) 100%)",
          }}
        />
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="mb-14 grid gap-10 lg:mb-16 lg:grid-cols-12 lg:items-end">
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

      {/* Your therapist — the old page's credential list, verbatim */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <p className="eyebrow">{lymphatic.practitioner.eyebrow}</p>
                <h2 className="display mt-5 text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] text-ink">
                  {lymphatic.practitioner.name}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink-muted">
                  {lymphatic.practitioner.role}
                </p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {lymphatic.practitioner.badges.map((b) => (
                    <li
                      key={b}
                      className="rounded-full border border-stone bg-snow px-3.5 py-1.5 text-xs font-medium text-cobalt"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <ul className="divide-y divide-stone-dark/15">
                  {lymphatic.practitioner.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-4 py-5 first:pt-0">
                      <Check
                        className="mt-1 size-5 shrink-0 text-cobalt"
                        strokeWidth={2}
                      />
                      <span className="text-base leading-relaxed text-ink lg:text-lg">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process — 4 steps */}
      <section className="bg-ink py-28 text-snow lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="mb-14 text-center lg:mb-20">
            <p className="text-xs uppercase tracking-[0.22em] text-snow/50">
              {lymphatic.process.eyebrow}
            </p>
            <h2 className="display mt-5 text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.02em] text-snow">
              {lymphatic.process.title}
            </h2>
            <p className="mx-auto mt-6 max-w-[62ch] text-base leading-relaxed text-snow/70 lg:text-lg">
              {lymphatic.process.intro}
            </p>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {lymphatic.process.steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08}>
                <span className="flex size-12 items-center justify-center rounded-full bg-cobalt text-lg font-medium text-snow">
                  {step.n}
                </span>
                <h3 className="display mt-6 text-xl leading-snug tracking-tight text-snow lg:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-snow/70">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={lymphatic.reviews.eyebrow}
            title={lymphatic.reviews.title}
            intro={lymphatic.reviews.intro}
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {lymphatic.reviews.items.map((r, i) => (
              <Reveal key={r.author} delay={i * 0.08} className="h-full">
                <figure className="flex h-full flex-col rounded-[24px] border border-stone bg-porcelain p-8 lg:p-10">
                  <span className="flex gap-0.5" aria-label="5 από 5 αστέρια">
                    {[...Array(5)].map((_, k) => (
                      <Star
                        key={k}
                        className="size-4 fill-gold text-gold"
                        strokeWidth={1}
                      />
                    ))}
                  </span>
                  <blockquote className="mt-5 flex-1 text-base leading-relaxed text-ink lg:text-lg">
                    “{r.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-xs uppercase tracking-[0.18em] text-ink-muted">
                    {r.author}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader eyebrow={tx.faqHeading} title={tx.faqTitle} />
          <FaqList items={lymphaticFaq} />
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
