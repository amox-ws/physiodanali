"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Phone } from "lucide-react";
import { Reveal, stagger, staggerItem } from "@/components/motion/reveal";
import { serviceSummaries, site } from "@/lib/content";
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
};

export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  titleAccent,
  lead,
  primaryCta,
  secondaryCta,
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

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink-muted"
          >
            <Link href="/" className="transition-colors hover:text-cobalt">
              Αρχική
            </Link>
            <span aria-hidden>—</span>
            <span className="text-ink">{breadcrumb}</span>
          </nav>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-[68rem]"
        >
          <motion.span variants={staggerItem} className="eyebrow">
            {eyebrow}
          </motion.span>

          <motion.h1
            variants={staggerItem}
            className="display mt-6 text-[clamp(2.5rem,7vw,6.5rem)] tracking-[-0.025em] leading-[0.95] text-ink"
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
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="display mt-5 text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.02em] text-ink">
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

// ─────────────────────────────────────────────────────────────────────
// CARD GRID — for benefits / conditions / why-us with title+body items

type CardGridProps = {
  items: { title: string; body: string }[];
  cols?: 2 | 3;
};

export function CardGrid({ items, cols = 2 }: CardGridProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "grid gap-5",
        cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
      )}
    >
      {items.map((item, idx) => (
        <motion.article
          key={item.title}
          variants={staggerItem}
          className="group relative overflow-hidden rounded-[24px] border border-stone bg-snow p-8 transition-all duration-500 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-[0_30px_60px_-20px_rgba(15,37,64,0.15)]"
        >
          <span className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
            {String(idx + 1).padStart(2, "0")}
          </span>
          <h3 className="display mt-5 text-2xl leading-[1.1] tracking-tight text-ink lg:text-[1.75rem]">
            {item.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            {item.body}
          </p>
        </motion.article>
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// CHECK LIST — for indications / "for whom" lists

type CheckListProps = {
  items: string[];
  cols?: 1 | 2;
};

export function CheckList({ items, cols = 2 }: CheckListProps) {
  return (
    <motion.ul
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "grid gap-x-12 gap-y-5",
        cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-1",
      )}
    >
      {items.map((item) => (
        <motion.li
          key={item}
          variants={staggerItem}
          className="flex items-start gap-4 border-b border-stone pb-5"
        >
          <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-cobalt/30 bg-cobalt/5">
            <Check className="size-3 text-cobalt" strokeWidth={2.5} />
          </span>
          <span className="text-base leading-relaxed text-ink lg:text-lg">
            {item}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

// ─────────────────────────────────────────────────────────────────────
// NUMBERED STEPS — for method/process

type NumberedStepsProps = {
  steps: { n: string; title: string; body: string }[];
};

export function NumberedSteps({ steps }: NumberedStepsProps) {
  return (
    <motion.ol
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="divide-y divide-stone border-t border-stone"
    >
      {steps.map((step) => (
        <motion.li
          key={step.n}
          variants={staggerItem}
          className="group grid gap-6 py-10 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-2">
            <span
              className="display text-[clamp(2.5rem,5vw,4rem)] leading-none text-cobalt transition-colors duration-500 group-hover:text-navy"
              style={{ letterSpacing: "-0.02em" }}
            >
              {step.n}
            </span>
          </div>
          <div className="lg:col-span-5">
            <h3 className="display text-2xl leading-[1.1] tracking-tight text-ink lg:text-[1.95rem]">
              {step.title}
            </h3>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-ink-muted lg:text-lg">
              {step.body}
            </p>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  );
}

// ─────────────────────────────────────────────────────────────────────
// PRACTITIONER MINI CARD — small bio reminder

export function PractitionerCard() {
  return (
    <Reveal className="overflow-hidden rounded-[28px] border border-stone bg-snow lg:grid lg:grid-cols-12">
      <div
        className="relative aspect-[4/5] lg:col-span-5 lg:aspect-auto"
        style={{
          background:
            "linear-gradient(160deg, #1e4d8b 0%, #0f2540 60%, #0a1628 100%)",
        }}
      >
        <div className="absolute inset-0 flex items-end justify-end p-8">
          <span
            className="display text-[clamp(6rem,12vw,10rem)] leading-[0.85] text-snow/15"
            style={{ letterSpacing: "-0.04em" }}
          >
            ΚΔ
          </span>
        </div>
      </div>
      <div className="p-10 lg:col-span-7 lg:p-14">
        <span className="eyebrow">Ο Φυσικοθεραπευτής</span>
        <h3 className="display mt-5 text-[clamp(2rem,3.5vw,3.25rem)] leading-[1] tracking-[-0.02em] text-ink">
          Κωνσταντίνος Δανάλης, PT
        </h3>
        <p className="mt-3 text-lg text-ink-muted">
          Φυσικοθεραπευτής · Χειροπρακτικός
        </p>
        <p className="mt-8 max-w-[55ch] text-base leading-relaxed text-ink-muted">
          Αδειούχος Φυσικοθεραπευτής, μέλος του Πανελλήνιου Συλλόγου
          Φυσικοθεραπευτών και απόφοιτος του Πανεπιστημίου Δυτικής Αττικής.
          Συνδυαστική χρήση χειροπρακτικής, νευροδυναμικής και θεραπευτικής
          άσκησης σε βιβλιογραφικά τεκμηριωμένα πρωτόκολλα.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-snow transition-all hover:bg-cobalt"
          >
            Κλείστε ραντεβού
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
  title = "Έτοιμοι όταν είστε.",
  titleAccent = "Έτοιμοι",
  lead = "Επικοινωνήστε σήμερα — ραντεβού δίνονται έως αυθημερόν, εφόσον υπάρχει διαθεσιμότητα.",
}: FinalCTAProps) {
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
                {title.includes(titleAccent) ? (
                  <>
                    {title.split(titleAccent)[0]}
                    <span className="display-italic text-gold">
                      {titleAccent}
                    </span>
                    {title.split(titleAccent)[1]}
                  </>
                ) : (
                  title
                )}
              </h2>
              <p className="mt-8 max-w-[48ch] text-base leading-relaxed text-snow/75 lg:text-lg">
                {lead}
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-5">
              <Link
                href="/contact"
                className="group flex items-center justify-between rounded-2xl bg-cobalt px-6 py-5 transition-all hover:bg-azure"
              >
                <span className="display text-2xl tracking-tight">
                  Κλείστε ραντεβού
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
  const others = serviceSummaries
    .filter((s) => s.slug !== exclude && !s.href.includes("#"))
    .slice(0, 3);

  return (
    <section className="bg-snow py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionHeader
          eyebrow="Συνεχίστε"
          title="Δείτε επίσης."
          intro="Οι υπόλοιπες υπηρεσίες — όλες με τον ίδιο φυσικοθεραπευτή."
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
                <div className="flex items-start justify-between">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                    0{idx + 1}
                  </span>
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
