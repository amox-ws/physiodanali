import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import {
  areaPages,
  homeCare,
  homecareFaq,
  site,
} from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import {
  PageHero,
  SectionHeader,
  CardGrid,
  CheckList,
  PractitionerCard,
  FinalCTA,
} from "@/components/site/page-primitives";
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  faqSchema,
  medicalProcedureSchema,
} from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(areaPages).map((area) => ({ area }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;
  const data = areaPages[area];
  if (!data) return { title: "Περιοχή" };
  return {
    title: data.meta.title,
    description: data.meta.description,
    alternates: { canonical: `/home-care/${area}` },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const data = areaPages[area];
  if (!data) notFound();

  const otherAreas = Object.values(areaPages).filter(
    (a) => a.slug !== data.slug,
  );

  return (
    <>
      <JsonLd
        data={[
          medicalProcedureSchema({
            name: `Φυσικοθεραπεία κατ' οίκον ${data.prefix} ${data.name}`,
            description: data.meta.description,
            url: `/home-care/${data.slug}`,
          }),
          faqSchema(homecareFaq),
          breadcrumbSchema([
            { name: "Αρχική", url: "/" },
            { name: "Κατ' οίκον", url: "/home-care" },
            { name: data.name, url: `/home-care/${data.slug}` },
          ]),
        ]}
      />

      <PageHero
        breadcrumb={`Κατ' οίκον · ${data.name}`}
        eyebrow={`Περιοχή ${data.prefix} ${data.name}`}
        title={`Φυσικοθεραπεία κατ' οίκον ${data.prefix} ${data.name}.`}
        titleAccent={`κατ' οίκον`}
        lead={data.intro}
        primaryCta={{ label: "Κλείστε ραντεβού", href: "/contact" }}
        secondaryCta={{
          label: "Καλέστε τώρα",
          href: `tel:${site.phone}`,
        }}
      />

      {/* Area highlight strip */}
      <section className="bg-snow py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="grid gap-px overflow-hidden rounded-[24px] border border-stone bg-stone sm:grid-cols-3">
              <Stat label="Μετάβαση" value={data.travelTime} />
              <Stat label="Ξεχωρίζει" value={data.highlight} />
              <Stat
                label="Διαθεσιμότητα"
                value="Έως 23:00 · Σ/Κ & αργίες"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Conditions list — same as home-care */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow="Καταστάσεις"
            title="Τι αντιμετωπίζουμε."
            intro={`Ολοκληρωμένη κατ' οίκον φυσικοθεραπεία ${data.prefix} ${data.name} — μυοσκελετικά, νευρολογικά, μετα-χειρουργικά.`}
          />
          <Reveal>
            <CheckList items={homeCare.conditions.items} />
          </Reveal>
        </div>
      </section>

      {/* Methods — same equipment showcase */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow="Θεραπευτικά μέσα"
            title="Πλήρης φορητός εξοπλισμός."
            intro={`Ο ίδιος εξοπλισμός που χρησιμοποιούμε στο ιατρείο — έρχεται μαζί σε κάθε επίσκεψη ${data.prefix} ${data.name}.`}
          />
          <CardGrid items={homeCare.methods.items} cols={3} />
        </div>
      </section>

      {/* Map / location section */}
      <section className="bg-ink py-28 text-snow lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-7">
              <span className="eyebrow text-gold">Τοποθεσία</span>
              <h2 className="display mt-5 text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.98] tracking-[-0.025em] text-snow">
                {data.ctaLine}
              </h2>
              <p className="mt-8 max-w-[50ch] text-base leading-relaxed text-snow/75 lg:text-lg">
                Ραντεβού δίνονται έως αυθημερόν, εφόσον υπάρχει διαθεσιμότητα.
                Όλη η εξυπηρέτηση γίνεται από τον ίδιο φυσικοθεραπευτή — χωρίς
                ενδιάμεσους.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="rounded-2xl border border-snow/15 bg-snow/5 p-7">
                <div className="flex items-start gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-snow/10">
                    <MapPin className="size-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-snow/55">
                      Έδρα
                    </p>
                    <p className="display mt-1 text-xl tracking-tight">
                      {site.address}
                    </p>
                  </div>
                </div>
                <div className="my-7 h-px bg-snow/15" />
                <a
                  href={`tel:${site.phone}`}
                  className="group flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex size-12 items-center justify-center rounded-full bg-snow/10">
                      <Phone className="size-4" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-snow/55">
                        Τηλέφωνο
                      </p>
                      <p className="display mt-1 text-xl tracking-tight">
                        {site.phoneDisplay}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="size-5 transition-transform duration-500 group-hover:rotate-45"
                    strokeWidth={1.5}
                  />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow="Συχνές ερωτήσεις"
            title="Ό,τι σας ενδιαφέρει."
          />
          <FaqList items={homecareFaq} />
        </div>
      </section>

      {/* Practitioner */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <PractitionerCard />
        </div>
      </section>

      <FinalCTA
        title={`Στο σπίτι σας ${data.prefix} ${data.name}. Άμεσα.`}
        titleAccent={`${data.prefix} ${data.name}.`}
        lead="Καλύπτουμε όλη την περιοχή με τον ίδιο φυσικοθεραπευτή σε κάθε επίσκεψη."
      />

      {/* Other areas */}
      <section className="bg-snow py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="mb-12">
            <span className="eyebrow">Άλλες περιοχές</span>
            <h2 className="display mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1] tracking-[-0.02em] text-ink">
              Καλύπτουμε όλα τα νότια προάστια.
            </h2>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-[24px] border border-stone bg-stone sm:grid-cols-2 lg:grid-cols-4">
            {otherAreas.map((a) => (
              <Link
                key={a.slug}
                href={`/home-care/${a.slug}`}
                className="group block bg-snow p-7 transition-colors hover:bg-mist"
              >
                <span className="display block text-3xl tracking-[-0.02em] text-ink transition-colors group-hover:text-cobalt lg:text-4xl">
                  {a.name}
                </span>
                <p className="mt-3 text-sm text-ink-muted">{a.highlight}</p>
                <ArrowUpRight
                  className="mt-6 size-4 text-ink-muted transition-all duration-500 group-hover:rotate-45 group-hover:text-cobalt"
                  strokeWidth={1.5}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-snow p-7 lg:p-8">
      <p className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
        {label}
      </p>
      <p className="display mt-3 text-2xl leading-[1.1] tracking-tight text-ink lg:text-[1.75rem]">
        {value}
      </p>
    </div>
  );
}
