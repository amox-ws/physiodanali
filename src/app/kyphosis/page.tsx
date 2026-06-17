import type { Metadata } from "next";
import { getContent } from "@/lib/content-i18n";
import { getLocale } from "@/lib/i18n-server";
import { t } from "@/lib/translations";
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
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, medicalProcedureSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { kyphosis } = getContent(locale);
  return {
    title: kyphosis.meta.title,
    description: kyphosis.meta.description,
    alternates: { canonical: "/kyphosis" },
  };
}

export default async function KyphosisPage() {
  const locale = await getLocale();
  const tx = t(locale);
  const { kyphosis, kyphosisFaq } = getContent(locale);
  return (
    <>
      <JsonLd
        data={[
          medicalProcedureSchema({
            name: "Θεραπεία Κύφωσης κατ' οίκον",
            description: kyphosis.meta.description,
            url: "/kyphosis",
          }),
          faqSchema(kyphosisFaq),
          breadcrumbSchema([
            { name: "Αρχική", url: "/" },
            { name: "Υπηρεσίες", url: "/" },
            { name: "Κύφωση", url: "/kyphosis" },
          ]),
        ]}
      />
      <PageHero
        breadcrumb={kyphosis.breadcrumb}
        eyebrow={kyphosis.hero.eyebrow}
        title={kyphosis.hero.title}
        titleAccent={kyphosis.hero.titleAccent}
        lead={kyphosis.hero.lead}
        primaryCta={kyphosis.hero.primaryCta}
        secondaryCta={kyphosis.hero.secondaryCta}
        bgImage="/kimfosis.jpg"
      />

      {/* Benefits */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={kyphosis.benefits.eyebrow}
            title={kyphosis.benefits.title}
            intro={tx.kyphosisBenefitsIntro}
          />
          <CardGrid items={kyphosis.benefits.items} />
        </div>
      </section>

      {/* Protocol */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={kyphosis.protocol.eyebrow}
            title={kyphosis.protocol.title}
            intro={kyphosis.protocol.intro}
          />
          <NumberedSteps steps={kyphosis.protocol.steps} />
        </div>
      </section>

      {/* Who for */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={kyphosis.whoFor.eyebrow}
            title={kyphosis.whoFor.title}
          />
          <Reveal>
            <CheckList items={kyphosis.whoFor.items} />
          </Reveal>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-ink py-24 text-snow lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="grid gap-12 lg:grid-cols-3">
            <Stat n="20" label={tx.kyphosisStat1Label} />
            <Stat n="4" label={tx.kyphosisStat2Label} />
            <Stat n="100%" label={tx.kyphosisStat3Label} />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader eyebrow={tx.faqHeading} title={tx.faqTitle} />
          <FaqList items={kyphosisFaq} />
        </div>
      </section>

      {/* Practitioner */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <PractitionerCard />
        </div>
      </section>

      <FinalCTA
        title={tx.kyphosisCtaTitle}
        titleAccent={tx.kyphosisCtaAccent}
        lead={tx.kyphosisCtaLead}
      />

      <RelatedServices exclude="kyphosis" />
    </>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="border-l border-snow/20 pl-8">
      <CountUp
        value={n}
        className="display block text-[clamp(4rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em] text-snow"
      />
      <p className="mt-4 max-w-[20ch] text-sm uppercase tracking-[0.18em] text-snow/65">
        {label}
      </p>
    </div>
  );
}
