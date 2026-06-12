import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { about, home, site } from "@/lib/content";
import { PageHero } from "@/components/site/page-primitives";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";

export const metadata: Metadata = {
  title: about.meta.title,
  description: about.meta.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb={about.breadcrumb}
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        titleAccent={about.hero.titleAccent}
        lead={about.hero.lead}
        primaryCta={about.hero.primaryCta}
        secondaryCta={about.hero.secondaryCta}
      />

      {/* ───── CONSOLIDATED CV — sticky portrait + scrolling content ───── */}
      <section className="bg-snow py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-16">
            {/* Sticky portrait */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-stone shadow-[0_40px_80px_-30px_rgba(15,37,64,0.35)]">
                    <Image
                      src="/drfoto2.jpg"
                      alt="Κωνσταντίνος Δανάλης, Φυσικοθεραπευτής - Χειροπρακτικός"
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      priority
                      className="object-cover object-[center_20%]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-2/5"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(10,22,40,0.7) 0%, transparent 100%)",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-7">
                      <p className="display text-3xl leading-tight tracking-tight text-snow lg:text-[2.5rem]">
                        Κωνσταντίνος Δανάλης
                      </p>
                      <p className="mt-2 text-sm text-snow/80 lg:text-base">
                        Φυσικοθεραπευτής · Χειροπρακτικός
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Scrolling CV */}
            <div className="lg:col-span-7">
              {/* Intro */}
              <Reveal>
                <h2 className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-[-0.025em] text-ink">
                  {about.intro.title}
                </h2>
                <p className="mt-7 text-lg leading-[1.7] text-ink-muted lg:text-xl">
                  {about.intro.body}
                </p>
              </Reveal>

              {/* Stats */}
              <Reveal delay={0.1}>
                <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-9 border-y border-stone py-9 sm:grid-cols-4">
                  {about.stats.map((s) => (
                    <div key={s.label}>
                      <CountUp
                        value={s.n}
                        className="display block text-[clamp(2.25rem,3vw,3rem)] leading-none tracking-[-0.02em] text-cobalt"
                      />
                      <p className="mt-3 text-sm leading-snug text-ink-muted">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Education */}
              <CvBlock title={about.education.title} label="Εκπαίδευση">
                <ol className="space-y-7">
                  {about.education.items.map((item, i) => (
                    <li key={item.title} className="flex gap-5">
                      <span className="display-italic shrink-0 text-2xl leading-none text-cobalt/55 lg:text-3xl">
                        {i + 1}
                      </span>
                      <div>
                        <h4 className="display text-xl leading-snug tracking-tight text-ink lg:text-2xl">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-base leading-relaxed text-ink-muted">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CvBlock>

              {/* Specialties */}
              <CvBlock title={about.specialties.title} label="Εξειδικεύσεις">
                <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                  {about.specialties.items.map((item) => (
                    <div key={item.title}>
                      <h4 className="display text-lg tracking-tight text-cobalt lg:text-xl">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-base leading-relaxed text-ink-muted">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </CvBlock>

              {/* Memberships */}
              <CvBlock title={about.memberships.title} label="Συμμετοχές">
                <ul className="space-y-4">
                  {about.memberships.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-4 border-b border-stone pb-4"
                    >
                      <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-cobalt/30 bg-cobalt/5">
                        <Check className="size-3 text-cobalt" strokeWidth={2.5} />
                      </span>
                      <span className="text-base leading-relaxed text-ink lg:text-lg">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CvBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Patient testimonials snippet */}
      <section className="bg-ink py-28 text-snow lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="mb-16">
            <h2 className="display text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.02em] text-snow">
              Τι λένε <span className="display-italic text-gold">οι ασθενείς</span>.
            </h2>
          </Reveal>
          <div className="grid gap-8 lg:grid-cols-3">
            {home.testimonials.map((t) => (
              <Reveal key={t.author} className="border-l border-snow/15 pl-6">
                <p className="display text-xl leading-[1.4] tracking-tight text-snow lg:text-2xl">
                  &ldquo;{t.quote.length > 200 ? t.quote.slice(0, 200) + "…" : t.quote}&rdquo;
                </p>
                <p className="mt-6 text-sm text-snow/70">— {t.author}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Practitioner CTA */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <h2 className="display text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.02em] text-ink">
                  Έτοιμος για το επόμενο βήμα.
                </h2>
                <p className="mt-8 max-w-[50ch] text-base leading-relaxed text-ink-muted lg:text-lg">
                  Κλείστε αξιολόγηση ή ραντεβού — αυθημερόν εφόσον υπάρχει
                  διαθεσιμότητα. Καλύπτουμε Βούλα, Βουλιαγμένη, Βάρη, Γλυφάδα
                  και Άλιμο.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:col-span-5">
                <Link
                  href="/contact"
                  className="group flex items-center justify-between rounded-2xl bg-ink px-6 py-5 text-snow transition-all hover:bg-cobalt"
                >
                  <span className="display text-2xl tracking-tight">
                    Φόρμα επικοινωνίας
                  </span>
                  <ArrowUpRight
                    className="size-5 transition-transform duration-500 group-hover:rotate-45"
                    strokeWidth={1.5}
                  />
                </Link>
                <a
                  href={`tel:${site.phone}`}
                  className="group flex items-center justify-between rounded-2xl border border-stone bg-porcelain px-6 py-5 transition-all hover:border-cobalt"
                >
                  <span className="display text-xl tracking-tight text-ink">
                    {site.phoneDisplay}
                  </span>
                  <ArrowUpRight
                    className="size-5 text-ink-muted transition-transform duration-500 group-hover:rotate-45 group-hover:text-cobalt"
                    strokeWidth={1.5}
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* A labelled CV sub-block: thin cobalt rule + small label + serif title,
   then its content. Keeps the consolidated CV visually structured. */
function CvBlock({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="mt-16 border-t border-stone pt-10 lg:mt-20">
      <div className="mb-8 flex items-center gap-3">
        <span className="h-px w-8 bg-cobalt" />
        <span className="text-sm font-medium tracking-wide text-cobalt">
          {label}
        </span>
      </div>
      <h3 className="display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-ink">
        {title}
      </h3>
      <div className="mt-8">{children}</div>
    </Reveal>
  );
}
