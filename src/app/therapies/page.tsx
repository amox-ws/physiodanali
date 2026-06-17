import type { Metadata } from "next";
import { therapies } from "@/lib/content";
import { getContent } from "@/lib/content-i18n";
import { getLocale } from "@/lib/i18n-server";
import { t } from "@/lib/translations";
import {
  PageHero,
  PractitionerCard,
  FinalCTA,
} from "@/components/site/page-primitives";
import { Services } from "@/components/site/services";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, SITE_URL } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { therapies } = getContent(locale);
  return {
    title: therapies.meta.title,
    description: therapies.meta.description,
    alternates: { canonical: "/therapies" },
  };
}

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

export default async function TherapiesPage() {
  const locale = await getLocale();
  const tx = t(locale);
  const { therapies, homeCare } = getContent(locale);
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
        bgImage="/serviceshero.jpg"
      />

      {/* Conditions we treat */}
      <section
        className="relative isolate overflow-hidden py-24 lg:py-32"
        style={{ backgroundColor: "#e8eff8" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 60% at 80% 10%, rgba(30,77,139,0.08) 0%, transparent 65%)",
          }}
        />
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="mx-auto mb-14 max-w-[760px] text-center">
            <h2 className="display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.025em] text-ink">
              {tx.therapiesConditionsTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted lg:text-xl">
              {tx.therapiesConditionsIntro}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homeCare.conditionsGrid.map((c, i) => (
              <Reveal key={c} delay={(i % 4) * 0.05} className="h-full">
                <div className="flex h-full items-center justify-center rounded-2xl border border-cobalt/15 bg-snow px-6 py-6 text-center text-base font-medium leading-snug text-ink transition-colors duration-500 hover:border-cobalt/40 hover:text-cobalt lg:text-lg">
                  {c}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Intro / philosophy — fixed parallax photo background */}
      <section className="relative isolate overflow-hidden py-28 text-snow lg:py-36">
        {/* Fixed-attachment parallax photo */}
        <div
          aria-hidden
          className="parallax-fixed absolute inset-0 -z-20"
          style={{ backgroundImage: "url(/services2g.jpg)" }}
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
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1] tracking-[-0.02em] text-snow">
                  {therapies.intro.title}
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-lg leading-relaxed text-snow/80 lg:text-xl">
                  {therapies.intro.body}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Practitioner */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <PractitionerCard />
        </div>
      </section>

      {/* All services — same section as the home page, with 3D background */}
      <Services
        title={
          <>
            {tx.therapiesAllServices1}
            <span className="display-italic text-cobalt">
              {tx.therapiesAllServicesAccent}
            </span>
            .
          </>
        }
      />

      <FinalCTA
        title={tx.therapiesCtaTitle}
        titleAccent={tx.therapiesCtaAccent}
        lead={tx.therapiesCtaLead}
      />
    </>
  );
}
