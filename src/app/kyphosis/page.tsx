import type { Metadata } from "next";
import { kyphosis, kyphosisFaq } from "@/lib/content";
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

export const metadata: Metadata = {
  title: kyphosis.meta.title,
  description: kyphosis.meta.description,
};

export default function KyphosisPage() {
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
      />

      {/* Benefits */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={kyphosis.benefits.eyebrow}
            title={kyphosis.benefits.title}
            intro="Αισθητή διαφορά από τις πρώτες συνεδρίες — όχι αόριστες υποσχέσεις, αλλά μετρήσιμα αποτελέσματα."
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
            <Stat n="20" label="συνεδρίες για ορατό αποτέλεσμα" />
            <Stat n="4" label="συνεδρίες μέχρι μείωση πόνου" />
            <Stat n="100%" label="κατ' οίκον — στο δικό σας χώρο" />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow="Συχνές ερωτήσεις"
            title="Ό,τι σας ενδιαφέρει."
          />
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
        title="Ψηλότερη στάση. Από σήμερα."
        titleAccent="Ψηλότερη στάση."
        lead="Ξεκινήστε τη διόρθωση τώρα — ραντεβού αξιολόγησης κατ' οίκον σε Γλυφάδα, Βούλα, Βουλιαγμένη και Βάρη."
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
