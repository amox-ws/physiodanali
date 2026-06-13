import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Phone,
  MessageCircle,
  Star,
  Check,
  Package,
  Activity,
  CalendarCheck,
} from "lucide-react";
import { homeCare, homecareFaq, site } from "@/lib/content";
import {
  SectionHeader,
  CardGrid,
  PractitionerCard,
} from "@/components/site/page-primitives";
import { Reveal } from "@/components/motion/reveal";
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, medicalProcedureSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: homeCare.meta.title,
  description: homeCare.meta.description,
};

const whyIcons = [Package, Activity, CalendarCheck];

export default function HomeCarePage() {
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

      {/* ───── HERO ───── */}
      <section className="relative isolate overflow-hidden bg-porcelain pt-36 pb-20 lg:pt-44 lg:pb-28">
        {/* Photo background */}
        <Image
          src="/physiotest1.jpg"
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
              "linear-gradient(100deg, rgba(247,248,250,0.92) 0%, rgba(247,248,250,0.8) 42%, rgba(247,248,250,0.5) 72%, rgba(247,248,250,0.18) 100%)",
          }}
        />

        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          {/* Badges */}
          <Reveal>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-stone bg-snow px-4 py-2 text-sm text-ink">
                <span className="flex text-gold">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="size-3.5 fill-gold" strokeWidth={0} />
                  ))}
                </span>
                {homeCare.heroBadges[0]}
              </span>
              {homeCare.heroBadges.slice(1).map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center rounded-full border border-stone bg-snow px-4 py-2 text-sm text-ink"
                >
                  {b}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Title */}
          <Reveal delay={0.05}>
            <h1 className="display mt-8 text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.96] tracking-[-0.03em] text-ink">
              Φυσικοθεραπεία &amp; αποκατάσταση{" "}
              <span className="display-italic text-cobalt">κατ&apos; οίκον</span>{" "}
              στη Βούλα
            </h1>
          </Reveal>

          {/* Lead */}
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-ink-muted lg:text-xl">
              {homeCare.hero.lead} Πλήρης φορητός εξοπλισμός — η ίδια ποιότητα
              κλινικής, στο σπίτι σας.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`tel:${site.phone}`}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-base font-medium text-snow transition-colors duration-500 hover:bg-cobalt"
              >
                <Phone className="size-5" strokeWidth={1.5} />
                {site.phoneDisplay}
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-ink/15 bg-snow px-7 py-4 text-base text-ink transition-colors hover:border-cobalt hover:text-cobalt"
              >
                <MessageCircle className="size-5" strokeWidth={1.5} />
                WhatsApp
              </a>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-snow/40 px-7 py-4 text-base text-ink transition-colors hover:border-ink/50"
              >
                Φόρμα επικοινωνίας
                <ArrowUpRight
                  className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </Reveal>

          {/* Trust line */}
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-stone pt-8">
              {homeCare.heroTrust.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 text-base text-ink-muted"
                >
                  <Check className="size-4 text-cobalt" strokeWidth={2.5} />
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───── WHY DIFFERENT ───── */}
      <section className="bg-snow py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="mx-auto mb-16 max-w-[820px] text-center lg:mb-20">
            <h2 className="display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.025em] text-ink">
              {homeCare.whyDifferent.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted lg:text-xl">
              {homeCare.whyDifferent.intro}
            </p>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {homeCare.whyDifferent.items.map((item, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <Reveal
                  key={item.title}
                  x={-160}
                  y={0}
                  duration={0.7}
                  delay={i * 0.18}
                  className="h-full"
                >
                  <div className="group flex h-full flex-col rounded-[24px] border border-stone bg-porcelain p-8 transition-all duration-500 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-[0_30px_60px_-20px_rgba(15,37,64,0.15)] lg:p-10">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-cobalt/10 text-cobalt transition-colors duration-500 group-hover:bg-cobalt group-hover:text-snow">
                      <Icon className="size-7" strokeWidth={1.5} />
                    </span>
                    <h3 className="display mt-7 text-2xl leading-[1.15] tracking-tight text-ink lg:text-[1.75rem]">
                      {item.title}
                    </h3>
                    <p className="mt-4 flex-1 text-base leading-relaxed text-ink-muted lg:text-lg">
                      {item.body}
                    </p>
                    <span className="mt-7 inline-flex w-fit items-center rounded-full bg-gold/15 px-4 py-1.5 text-sm font-medium text-[#7a6235]">
                      {item.tag}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── METHODS — fixed parallax photo background ───── */}
      <section className="relative isolate overflow-hidden py-24 text-snow lg:py-32">
        {/* Fixed-attachment parallax photo */}
        <div
          aria-hidden
          className="parallax-fixed absolute inset-0 -z-20"
          style={{ backgroundImage: "url(/eksoplismos.jpg)" }}
        />
        {/* Dark scrim for legibility */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 0%, rgba(30,77,139,0.30) 0%, transparent 60%), linear-gradient(180deg, rgba(10,22,40,0.82) 0%, rgba(10,22,40,0.7) 100%)",
          }}
        />
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="mb-16 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 className="display text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.02em] text-snow">
                {homeCare.methods.title}
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-base leading-relaxed text-snow/75 lg:text-lg">
                Όλος ο εξοπλισμός που χρειάζεται μια ολοκληρωμένη συνεδρία —
                έρχεται σε σας.
              </p>
            </div>
          </Reveal>
          <CardGrid
            items={homeCare.methods.items}
            cols={3}
            showNumbers={false}
          />
        </div>
      </section>

      {/* ───── AVAILABILITY ───── */}
      <section className="bg-ink py-24 text-snow lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <h2 className="display text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.98] tracking-[-0.025em] text-snow">
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
                      <span className="text-base text-snow/60">{h.label}</span>
                      <span className="text-xl font-semibold tracking-tight text-snow">
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

      {/* ───── FAQ ───── */}
      <section className="bg-porcelain py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader eyebrow="Συχνές ερωτήσεις" title="Ό,τι σας ενδιαφέρει." />
          <FaqList items={homecareFaq} />
        </div>
      </section>

      {/* ───── PRACTITIONER ───── */}
      <section className="bg-snow py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <PractitionerCard image="/drfoto3.jpg" />
        </div>
      </section>
    </>
  );
}
