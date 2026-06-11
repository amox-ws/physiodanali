import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { therapies } from "@/lib/content";
import {
  PageHero,
  SectionHeader,
  PractitionerCard,
  FinalCTA,
} from "@/components/site/page-primitives";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: therapies.meta.title,
  description: therapies.meta.description,
  alternates: { canonical: "/therapies" },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Θεραπείες PhysioDanali",
  itemListElement: therapies.list.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.title,
    url: `${SITE_URL}${t.href}`,
  })),
};

export default function TherapiesPage() {
  return (
    <>
      <JsonLd
        data={[
          itemListSchema,
          breadcrumbSchema([
            { name: "Αρχική", url: "/" },
            { name: "Θεραπείες", url: "/therapies" },
          ]),
        ]}
      />

      <PageHero
        breadcrumb={therapies.breadcrumb}
        eyebrow={therapies.hero.eyebrow}
        title={therapies.hero.title}
        titleAccent={therapies.hero.titleAccent}
        lead={therapies.hero.lead}
        primaryCta={therapies.hero.primaryCta}
        secondaryCta={therapies.hero.secondaryCta}
      />

      {/* Intro / philosophy */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1] tracking-[-0.02em] text-ink">
                  {therapies.intro.title}
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-lg leading-relaxed text-ink-muted lg:text-xl">
                  {therapies.intro.body}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* List of therapies */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow="Επιλογές"
            title="Τέσσερις θεραπείες."
            intro="Κάθε σελίδα έχει πλήρη παρουσίαση: ενδείξεις, πρωτόκολλο, αναμενόμενα αποτελέσματα και FAQ."
          />

          <TherapyGrid />
        </div>
      </section>

      {/* Practitioner */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <PractitionerCard />
        </div>
      </section>

      <FinalCTA
        title="Δεν είστε σίγουρος ποια ταιριάζει;"
        titleAccent="ποια"
        lead="Καλέστε για μια σύντομη τηλεφωνική αξιολόγηση — θα σας προτείνουμε την κατάλληλη θεραπεία πριν καν κλείσετε ραντεβού."
      />
    </>
  );
}

function TherapyGrid() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {therapies.list.map((t, idx) => (
        <Reveal key={t.slug}>
          <Link
            href={t.href}
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-stone bg-snow p-10 transition-all duration-500 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-[0_30px_60px_-20px_rgba(15,37,64,0.15)]"
          >
            <div className="flex items-start justify-between gap-6">
              <span className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                0{idx + 1}
              </span>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-stone transition-all duration-500 group-hover:rotate-45 group-hover:border-cobalt group-hover:text-cobalt">
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </span>
            </div>
            <div className="mt-12">
              <h3 className="display text-[clamp(2rem,3.5vw,3rem)] leading-[1.02] tracking-[-0.02em] text-ink transition-colors duration-500 group-hover:text-cobalt">
                {t.title}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-ink-muted lg:text-lg">
                {t.lead}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {t.bullets.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center rounded-full border border-stone bg-mist/60 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-ink-muted"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
