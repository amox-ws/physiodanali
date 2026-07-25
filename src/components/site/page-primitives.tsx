"use client";

import Image from "next/image";
import { localeHref } from "@/lib/i18n";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Phone } from "lucide-react";
import { Reveal, stagger, staggerItem } from "@/components/motion/reveal";
import { site } from "@/lib/content";
import { useContent, useLocale } from "@/components/site/locale-provider";
import { t } from "@/lib/translations";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────
// PAGE HERO — used by every detail page

type PageHeroProps = {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  /** Optional photo background behind the hero. */
  bgImage?: string;
};

export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  titleAccent,
  lead,
  primaryCta,
  secondaryCta,
  bgImage,
}: PageHeroProps) {
  // Render the title with the accent (if matched) replaced with italic span.
  const renderTitle = () => {
    if (!titleAccent || !title.includes(titleAccent)) {
      return <>{title}</>;
    }
    const [before, after] = title.split(titleAccent);
    return (
      <>
        {before}
        <span className="display-italic text-cobalt">{titleAccent}</span>
        {after}
      </>
    );
  };

  return (
    <section className="relative isolate overflow-hidden bg-porcelain pt-36 pb-20 lg:pt-48 lg:pb-32">
      {bgImage ? (
        <>
          {/* Photo background */}
          <Image
            src={bgImage}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover object-center"
          />
          {/* Light scrim so the dark ink headline stays legible */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(100deg, rgba(247,248,250,0.92) 0%, rgba(247,248,250,0.78) 40%, rgba(247,248,250,0.45) 70%, rgba(247,248,250,0.15) 100%)",
            }}
          />
        </>
      ) : (
        <>
          {/* Soft tonal gradient + grid */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(80% 60% at 80% 0%, rgba(30,77,139,0.18) 0%, transparent 60%), radial-gradient(60% 50% at 0% 100%, rgba(126,168,220,0.18) 0%, transparent 60%), linear-gradient(180deg, #eef1f4 0%, #f7f8fa 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #0a1628 1px, transparent 1px), linear-gradient(to bottom, #0a1628 1px, transparent 1px)",
              backgroundSize: "120px 120px",
            }}
          />
        </>
      )}

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-[68rem]"
        >
          <motion.h1
            variants={staggerItem}
            className="display text-[clamp(2.5rem,7vw,6.5rem)] tracking-[-0.025em] leading-[0.95] text-ink"
          >
            {renderTitle()}
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="mt-10 max-w-[58ch] text-base leading-relaxed text-ink-muted lg:text-lg"
          >
            {lead}
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href={primaryCta.href}
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium tracking-wide text-snow transition-all duration-500 hover:bg-cobalt"
            >
              <span>{primaryCta.label}</span>
              <ArrowRight
                className="size-4 transition-transform duration-500 group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
            <a
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-snow/40 px-6 py-4 text-sm text-ink transition-all hover:border-ink/60 hover:bg-snow/80"
            >
              <Phone className="size-4" strokeWidth={1.5} />
              <span>{secondaryCta.label}</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SECTION HEADER

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  intro,
  className,
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "mb-16 grid gap-10 lg:grid-cols-12 lg:items-end",
        className,
      )}
    >
      <div className="lg:col-span-7">
        <h2 className="display text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.02em] text-ink">
          {title}
        </h2>
      </div>
      {intro && (
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="text-base leading-relaxed text-ink-muted lg:text-lg">
            {intro}
          </p>
        </div>
      )}
    </Reveal>
  );
}

// Brand accent palette — one colour per item, cycles for longer lists.
// Shared by CardGrid / CheckList / NumberedSteps so every section that uses
// them gets the same premium, colour-rhythmed treatment.
const SECTION_ACCENTS = [
  "#1e4d8b",
  "#2563b0",
  "#0f2540",
  "#8a6d3b",
  "#4577b8",
];

// ─────────────────────────────────────────────────────────────────────
// CARD GRID — colour-accented cards with a growing top bar + hover lift

type CardGridProps = {
  /** `tag` renders a small pill under the copy — used where a card needs a
   *  one-word takeaway ("Specialised method", "Discretion"). */
  items: { title: string; body: string; tag?: string }[];
  cols?: 2 | 3;
  showNumbers?: boolean;
};

export function CardGrid({ items, cols = 2 }: CardGridProps) {
  return (
    <div
      className={cn(
        "grid gap-5",
        cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
      )}
    >
      {items.map((item, idx) => {
        const accent = SECTION_ACCENTS[idx % SECTION_ACCENTS.length];
        return (
          <Reveal key={item.title} delay={idx * 0.07} className="h-full">
            <div className="group relative h-full overflow-hidden rounded-[24px] border border-stone bg-snow p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(15,37,64,0.18)] lg:p-10">
              <span
                aria-hidden
                className="absolute left-0 top-0 h-1 w-16 transition-all duration-500 group-hover:w-full"
                style={{ backgroundColor: accent }}
              />
              <h3
                className="display mt-3 text-2xl leading-[1.1] tracking-tight lg:text-[1.85rem]"
                style={{ color: accent }}
              >
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-muted lg:text-lg">
                {item.body}
              </p>
              {item.tag && (
                <span className="mt-5 inline-flex rounded-full bg-gold/12 px-3 py-1.5 text-xs font-medium tracking-wide text-gold">
                  {item.tag}
                </span>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// CHECK LIST — colour-accented check cards with hover lift

type CheckListProps = {
  items: string[];
  cols?: 1 | 2;
};

export function CheckList({ items, cols = 2 }: CheckListProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        cols === 2 ? "sm:grid-cols-2" : "grid-cols-1",
      )}
    >
      {items.map((item, idx) => {
        const accent = SECTION_ACCENTS[idx % SECTION_ACCENTS.length];
        return (
          <Reveal key={item} delay={idx * 0.06} className="h-full">
            <div className="group flex h-full items-center gap-4 rounded-2xl border border-stone bg-snow p-5 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-24px_rgba(15,37,64,0.2)] lg:gap-5 lg:p-6">
              <span
                className="flex size-11 shrink-0 items-center justify-center rounded-full lg:size-12"
                style={{ backgroundColor: `${accent}1a`, color: accent }}
              >
                <Check className="size-5" strokeWidth={2.5} />
              </span>
              <span className="text-base font-medium leading-snug text-ink lg:text-lg">
                {item}
              </span>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// NUMBERED STEPS — vertical timeline with colour-accented circles

type NumberedStepsProps = {
  steps: { n: string; title: string; body: string }[];
};

export function NumberedSteps({ steps }: NumberedStepsProps) {
  return (
    <ol className="relative mt-4 space-y-10 lg:space-y-12">
      {/* Connecting line behind the numbered circles */}
      <span
        aria-hidden
        className="absolute left-8 top-8 bottom-8 w-px -translate-x-1/2 bg-gradient-to-b from-cobalt/40 via-stone to-stone"
      />
      {steps.map((step, i) => {
        const accent = SECTION_ACCENTS[i % SECTION_ACCENTS.length];
        return (
          <Reveal
            as="li"
            key={step.n}
            x={70}
            y={0}
            delay={i * 0.1}
            className="group relative flex items-start gap-6 lg:gap-8"
          >
            <span
              className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-full text-snow shadow-[0_14px_34px_-12px_rgba(15,37,64,0.45)] transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundColor: accent }}
            >
              <span className="display text-2xl leading-none">{i + 1}</span>
            </span>
            <div className="pt-2.5">
              <h3 className="display text-2xl leading-tight tracking-tight text-ink lg:text-[1.9rem]">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[58ch] text-base leading-relaxed text-ink-muted lg:text-lg">
                {step.body}
              </p>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}

// ─────────────────────────────────────────────────────────────────────
// PRACTITIONER MINI CARD — small bio reminder

export function PractitionerCard({
  image = "/doctor.webp",
}: {
  image?: string;
}) {
  const locale = useLocale();
  const tx = t(locale);
  return (
    <Reveal className="overflow-hidden rounded-[28px] border border-stone bg-snow lg:grid lg:grid-cols-12">
      <div className="relative aspect-[4/5] bg-stone lg:col-span-5 lg:aspect-auto">
        <Image
          src={image}
          alt={tx.practitionerAlt}
          fill
          sizes="(min-width: 1024px) 35vw, 100vw"
          className="object-cover object-[center_20%]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(to top, rgba(10,22,40,0.25) 0%, transparent 100%)",
          }}
        />
      </div>
      <div className="p-10 lg:col-span-7 lg:p-14">
        <h3 className="display text-[clamp(2rem,3.5vw,3.25rem)] leading-[1] tracking-[-0.02em] text-ink">
          {tx.practitionerName}
        </h3>
        <p className="mt-3 text-lg text-ink-muted">{tx.practitionerRole}</p>
        <p className="mt-8 max-w-[55ch] text-base leading-relaxed text-ink-muted">
          {tx.practitionerBio}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Link
            href={localeHref("/booking", locale)}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-snow transition-all hover:bg-cobalt"
          >
            {tx.book}
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </Link>
          <a
            href={`tel:${site.phone}`}
            className="inline-flex items-center gap-2 rounded-full border border-stone px-5 py-2.5 text-sm text-ink-muted transition-all hover:border-cobalt hover:text-cobalt"
          >
            <Phone className="size-4" strokeWidth={1.5} />
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </Reveal>
  );
}

// ─────────────────────────────────────────────────────────────────────
// FINAL CTA BAND — closing call to action on each page

type FinalCTAProps = {
  title?: string;
  titleAccent?: string;
  lead?: string;
};

export function FinalCTA({
  title,
  titleAccent,
  lead,
}: FinalCTAProps) {
  const locale = useLocale();
  const tx = t(locale);
  const _title = title ?? tx.finalCtaTitle;
  const _accent = titleAccent ?? tx.finalCtaAccent;
  const _lead = lead ?? tx.finalCtaLead;
  return (
    <section className="relative isolate overflow-hidden bg-ink py-28 text-snow lg:py-36">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 0%, rgba(184,153,104,0.15) 0%, transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(30,77,139,0.55) 0%, transparent 65%), #0a1628",
        }}
      />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.025em]">
                {_accent && _title.includes(_accent) ? (
                  <>
                    {_title.split(_accent)[0]}
                    <span className="display-italic text-gold">
                      {_accent}
                    </span>
                    {_title.split(_accent)[1]}
                  </>
                ) : (
                  _title
                )}
              </h2>
              <p className="mt-8 max-w-[48ch] text-base leading-relaxed text-snow/75 lg:text-lg">
                {_lead}
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-5">
              <Link
                href={localeHref("/booking", locale)}
                className="group flex items-center justify-between rounded-2xl bg-cobalt px-6 py-5 transition-all hover:bg-azure"
              >
                <span className="display text-2xl tracking-tight">
                  {tx.book}
                </span>
                <ArrowUpRight
                  className="size-5 transition-transform duration-500 group-hover:rotate-45"
                  strokeWidth={1.5}
                />
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="group flex items-center justify-between rounded-2xl border border-snow/15 bg-snow/5 px-6 py-5 transition-all hover:border-snow/40 hover:bg-snow/10"
              >
                <div className="flex items-center gap-3">
                  <Phone className="size-4" strokeWidth={1.5} />
                  <span className="display text-xl tracking-tight">
                    {site.phoneDisplay}
                  </span>
                </div>
                <ArrowUpRight
                  className="size-5 transition-transform duration-500 group-hover:rotate-45"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// RELATED SERVICES — bottom of detail page

export function RelatedServices({ exclude }: { exclude: string }) {
  const { serviceSummaries } = useContent();
  const tx = t(useLocale());
  const others = serviceSummaries
    .filter((s) => s.slug !== exclude && !s.href.includes("#"))
    .slice(0, 3);

  return (
    <section className="bg-snow py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeader
          eyebrow={tx.relatedHeading}
          title={tx.relatedTitle}
          intro={tx.relatedIntro}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 lg:grid-cols-3"
        >
          {others.map((service, idx) => (
            <motion.div key={service.slug} variants={staggerItem}>
              <Link
                href={service.href}
                className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-[24px] border border-stone bg-porcelain p-7 transition-all duration-500 hover:-translate-y-1 hover:border-cobalt/30 hover:bg-snow hover:shadow-[0_30px_60px_-20px_rgba(15,37,64,0.15)]"
              >
                <div className="flex items-start justify-end">
                  <ArrowUpRight
                    className="size-4 text-ink-muted transition-all duration-500 group-hover:rotate-45 group-hover:text-cobalt"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="display text-3xl leading-tight tracking-tight text-ink lg:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {service.tagline}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
