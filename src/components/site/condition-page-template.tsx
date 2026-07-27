"use client";

import { motion } from "framer-motion";
import { Phone, Check, Star } from "lucide-react";
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
import { Reveal, stagger, staggerItem } from "@/components/motion/reveal";
import { FaqList } from "@/components/site/faq-list";
import { useContent, useLocale } from "@/components/site/locale-provider";
import { t } from "@/lib/translations";

export function ConditionPageTemplate({
  slug,
  bgImage,
}: {
  slug: string;
  bgImage?: string;
}) {
  const locale = useLocale();
  const { conditions } = useContent();
  const tx = t(locale);
  const data = conditions[slug];
  return (
    <>
      <PageHero
        breadcrumb={data.breadcrumb}
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        titleAccent={data.hero.titleAccent}
        lead={data.hero.lead}
        primaryCta={data.hero.primaryCta}
        secondaryCta={data.hero.secondaryCta}
        bgImage={bgImage}
      />

      {/* Trust badges + the client's hero quote */}
      {(data.heroBadges || data.heroQuote) && (
        <section className="border-b border-stone bg-snow py-8">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            {data.heroBadges && (
              <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {data.heroBadges.map((b) => (
                  <li key={b} className="text-sm font-medium text-ink">
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {data.heroQuote && (
              <figure className="mt-6 border-l-2 border-gold pl-5">
                <span className="flex gap-0.5" aria-hidden>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3.5 fill-gold text-gold" strokeWidth={1} />
                  ))}
                </span>
                <blockquote className="mt-2 text-base italic leading-relaxed text-ink lg:text-lg">
                  “{data.heroQuote.quote}”
                </blockquote>
                <figcaption className="mt-1.5 text-sm text-ink-muted">
                  {data.heroQuote.author}
                </figcaption>
              </figure>
            )}
          </div>
        </section>
      )}

      {/* "What happens when you call me" */}
      {data.whatHappens && (
        <section className="bg-porcelain py-20 lg:py-24">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <Reveal className="max-w-[70ch]">
              <h2 className="display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-tight tracking-tight text-ink">
                {data.whatHappens.title}
              </h2>
              <blockquote className="mt-6 text-lg italic leading-relaxed text-ink-muted lg:text-xl">
                “{data.whatHappens.quote}”
              </blockquote>
              <p className="mt-4 text-sm text-ink-muted">{data.whatHappens.author}</p>
            </Reveal>
          </div>
        </section>
      )}

      {/* Causes — omitted when a page has no such section */}
      {data.causes.items.length > 0 && (
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={data.causes.eyebrow}
            title={data.causes.title}
            intro={data.causes.intro}
          />
          <Reveal>
            <CheckList items={data.causes.items} />
          </Reveal>
        </div>
      </section>
      )}

      {/* Symptoms */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={data.symptoms.eyebrow}
            title={data.symptoms.title}
            intro={data.symptomsIntro ?? tx.condSymptomsIntro}
          />
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-x-12 gap-y-5 lg:grid-cols-2"
          >
            {data.symptoms.items.map((s, i) => (
              <motion.li
                key={s}
                variants={staggerItem}
                className="flex items-start gap-4 border-b border-stone pb-5 text-base text-ink lg:text-lg"
              >
                {data.symptomIcons?.[i] ? (
                  <span aria-hidden className="text-xl leading-none">
                    {data.symptomIcons[i]}
                  </span>
                ) : (
                  <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-cobalt" />
                )}
                <span className="leading-relaxed">{s}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* The client's two "why do I feel…" explanations, each with its answer */}
      {data.explainers && (
        <section className="bg-snow py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-2 lg:px-10">
            {data.explainers.map((e, i) => (
              <Reveal key={e.question} delay={i * 0.08}>
                <h3 className="display text-[clamp(1.4rem,2.4vw,2rem)] leading-snug tracking-tight text-cobalt">
                  {e.question}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-muted lg:text-lg">
                  {e.answer}
                </p>
                <p className="mt-4 border-l-2 border-gold pl-4 text-base leading-relaxed text-ink">
                  <strong className="font-medium">Λύση →</strong> {e.solution}
                </p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Results */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={data.results.eyebrow}
            title={data.results.title}
          />
          <CardGrid items={data.results.items} cols={3} />
        </div>
      </section>

      {/* Protocol */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={data.protocol.eyebrow}
            title={data.protocol.title}
            intro={data.protocol.intro}
          />
          <NumberedSteps steps={data.protocol.steps} />
        </div>
      </section>

      {/* Mid-page call CTA */}
      {data.midCta && (
        <section className="bg-ink py-16 text-snow lg:py-20">
          <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div>
              <h2 className="display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-tight tracking-tight text-snow">
                {data.midCta.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-snow/70">
                {data.midCta.lead}
              </p>
            </div>
            <a
              href="tel:+306944344342"
              className="inline-flex shrink-0 items-center gap-3 rounded-full bg-snow px-7 py-4 text-sm font-medium text-ink transition-all duration-500 hover:bg-gold"
            >
              <Phone className="size-4" strokeWidth={1.5} />
              6944 344 342
            </a>
          </div>
        </section>
      )}

      {/* Six techniques */}
      {data.techniques && (
        <section className="bg-snow py-28 lg:py-36">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <SectionHeader
              eyebrow={data.techniques.eyebrow}
              title={data.techniques.title}
              intro={data.techniques.intro}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.techniques.items.map((it, i) => (
                <Reveal key={it.title} delay={i * 0.06} className="h-full">
                  <div className="h-full rounded-[24px] border border-stone bg-porcelain p-8">
                    <span aria-hidden className="text-2xl">{it.icon}</span>
                    <h3 className="display mt-4 text-xl leading-snug tracking-tight text-ink lg:text-2xl">
                      {it.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-ink-muted">
                      {it.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* The practitioner's own note, when the page carries one */}
      {data.bio && (
        <section className="bg-snow py-28 lg:py-36">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <Reveal className="max-w-[75ch]">
              <p className="eyebrow">{data.bio.eyebrow}</p>
              <h2 className="display mt-5 text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] text-ink">
                {data.bio.name}
              </h2>
              <p className="mt-3 text-base text-ink-muted">{data.bio.role}</p>
              {data.bio.paragraphs.map((para) => (
                <p key={para.slice(0, 32)} className="mt-5 text-base leading-relaxed text-ink-muted lg:text-lg">
                  {para}
                </p>
              ))}
              <p className="mt-5 text-base text-ink">{data.bio.signoff}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {data.bio.badges.map((b) => (
                  <li key={b} className="rounded-full border border-stone bg-porcelain px-3.5 py-1.5 text-xs font-medium text-cobalt">
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {/* Patient reviews */}
      {data.reviews && (
        <section className="bg-porcelain py-28 lg:py-36">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <SectionHeader
              eyebrow={data.reviews.eyebrow}
              title={data.reviews.title}
              intro={data.reviews.intro}
            />
            <div className="grid gap-5 lg:grid-cols-3">
              {data.reviews.items.map((r, i) => (
                <Reveal key={r.author} delay={i * 0.08} className="h-full">
                  <figure className="flex h-full flex-col rounded-[24px] border border-stone bg-snow p-8">
                    <span className="flex gap-0.5" aria-hidden>
                      {[...Array(5)].map((_, k) => (
                        <Star key={k} className="size-4 fill-gold text-gold" strokeWidth={1} />
                      ))}
                    </span>
                    <p className="mt-4 text-sm font-medium text-cobalt">{r.topic}</p>
                    <blockquote className="mt-3 flex-1 text-base leading-relaxed text-ink">
                      “{r.quote}”
                    </blockquote>
                    <figcaption className="mt-5 text-xs uppercase tracking-[0.18em] text-ink-muted">
                      {r.author}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={data.faqHeading ?? tx.faqHeading}
            title={data.faqTitle ?? tx.faqTitle}
            intro={data.faqIntro ?? tx.condFaqIntro}
          />
          <FaqList items={data.faq} />
        </div>
      </section>

      {/* Generic practitioner card — skipped when the page has its own bio */}
      {!data.bio && (
        <section className="bg-porcelain py-28 lg:py-36">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <PractitionerCard />
          </div>
        </section>
      )}

      <FinalCTA
        title={data.cta?.title ?? tx.condCtaTitle}
        titleAccent={data.cta?.titleAccent ?? tx.condCtaAccent}
        lead={data.cta?.lead ?? tx.condCtaLead}
      />

      <RelatedServices exclude={data.slug} />
    </>
  );
}
