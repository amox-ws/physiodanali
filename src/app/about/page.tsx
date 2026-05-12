import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { about, home, site } from "@/lib/content";
import {
  PageHero,
  SectionHeader,
  CardGrid,
  CheckList,
  NumberedSteps,
  FinalCTA,
} from "@/components/site/page-primitives";
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

      {/* Portrait + intro */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal blur className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-stone">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(160deg, #1e4d8b 0%, #0f2540 60%, #0a1628 100%)",
                  }}
                />
                <div
                  className="absolute inset-0 mix-blend-overlay opacity-50"
                  style={{
                    backgroundImage:
                      "radial-gradient(60% 60% at 30% 25%, rgba(255,255,255,0.45) 0%, transparent 60%)",
                  }}
                />
                <div className="absolute inset-0 flex items-end justify-end p-10">
                  <span
                    className="display text-[clamp(8rem,16vw,14rem)] leading-[0.85] text-snow/15"
                    style={{ letterSpacing: "-0.04em" }}
                  >
                    ΚΔ
                  </span>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-4 text-sm text-ink-muted">
                <span className="block h-px w-10 bg-stone-dark/60" />
                <span>Photography placeholder · drop in real portrait</span>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <span className="eyebrow">{about.intro.eyebrow}</span>
                <h2 className="display mt-5 text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.02em] text-ink">
                  {about.intro.title}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-10 max-w-[60ch] text-base leading-relaxed text-ink-muted lg:text-lg">
                  {about.intro.body}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-12 grid grid-cols-2 gap-6 border-t border-stone pt-10 sm:grid-cols-4">
                  {about.stats.map((s) => (
                    <div key={s.label}>
                      <CountUp
                        value={s.n}
                        className="display block text-[clamp(2rem,3vw,3rem)] leading-none tracking-[-0.02em] text-cobalt"
                      />
                      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-ink-muted">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={about.education.eyebrow}
            title={about.education.title}
            intro="Συνδυασμός ακαδημαϊκής βάσης και συνεχιζόμενης εκπαίδευσης σε εξειδικευμένα επιστημονικά τμήματα."
          />
          <NumberedSteps steps={about.education.items} />
        </div>
      </section>

      {/* Specialties */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={about.specialties.eyebrow}
            title={about.specialties.title}
            intro="Έξι πεδία κλινικής εφαρμογής — όχι ως καταγραφή τίτλων, αλλά ως πραγματική εμπειρία σε κάθε κατηγορία."
          />
          <CardGrid items={about.specialties.items} cols={3} />
        </div>
      </section>

      {/* Memberships */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={about.memberships.eyebrow}
            title={about.memberships.title}
            intro="Επίσημη συμμετοχή σε επαγγελματικά και επιστημονικά σώματα — ένδειξη συνεχιζόμενης εκπαίδευσης και επαγγελματικής δεοντολογίας."
          />
          <Reveal>
            <CheckList items={about.memberships.items} cols={1} />
          </Reveal>
        </div>
      </section>

      {/* Patient testimonials snippet */}
      <section className="bg-ink py-28 text-snow lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="mb-16">
            <span className="eyebrow text-gold">Μαρτυρίες</span>
            <h2 className="display mt-5 text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.02em] text-snow">
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
                <span className="eyebrow">Επικοινωνία</span>
                <h2 className="display mt-5 text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.02em] text-ink">
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

      <FinalCTA
        title="Δεκαετία εμπειρίας. Στο σπίτι σας."
        titleAccent="Δεκαετία"
        lead="Από αρχικές αξιολογήσεις μέχρι μακρόχρονη αποκατάσταση — η ίδια ποιότητα κλινικής σε κάθε συνεδρία."
      />
    </>
  );
}
