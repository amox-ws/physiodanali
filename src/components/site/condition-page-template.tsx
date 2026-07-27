"use client";

import { motion } from "framer-motion";
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
import { Reveal, stagger, staggerItem } from "@/components/motion/reveal";
import { FaqList } from "@/components/site/faq-list";
import { useContent, useLocale } from "@/components/site/locale-provider";
import { t } from "@/lib/translations";

export function ConditionPageTemplate({
  slug,
  bgImage,
}: {
  slug: string;
  bgImage?: string;
}) {
  const locale = useLocale();
  const { conditions } = useContent();
  const tx = t(locale);
  const data = conditions[slug];
  return (
    <>
      <PageHero
        breadcrumb={data.breadcrumb}
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        titleAccent={data.hero.titleAccent}
        lead={data.hero.lead}
        primaryCta={data.hero.primaryCta}
        secondaryCta={data.hero.secondaryCta}
        bgImage={bgImage}
      />

      {/* Causes */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={data.causes.eyebrow}
            title={data.causes.title}
            intro={data.causes.intro}
          />
          <Reveal>
            <CheckList items={data.causes.items} />
          </Reveal>
        </div>
      </section>

      {/* Symptoms */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={data.symptoms.eyebrow}
            title={data.symptoms.title}
            intro={data.symptomsIntro ?? tx.condSymptomsIntro}
          />
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-x-12 gap-y-5 lg:grid-cols-2"
          >
            {data.symptoms.items.map((s) => (
              <motion.li
                key={s}
                variants={staggerItem}
                className="flex items-start gap-4 border-b border-stone pb-5 text-base text-ink lg:text-lg"
              >
                <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-cobalt" />
                <span className="leading-relaxed">{s}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Protocol */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={data.protocol.eyebrow}
            title={data.protocol.title}
            intro={data.protocol.intro}
          />
          <NumberedSteps steps={data.protocol.steps} />
        </div>
      </section>

      {/* Results */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={data.results.eyebrow}
            title={data.results.title}
          />
          <CardGrid items={data.results.items} cols={3} />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionHeader
            eyebrow={data.faqHeading ?? tx.faqHeading}
            title={data.faqTitle ?? tx.faqTitle}
            intro={data.faqIntro ?? tx.condFaqIntro}
          />
          <FaqList items={data.faq} />
        </div>
      </section>

      {/* Practitioner */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <PractitionerCard />
        </div>
      </section>

      <FinalCTA
        title={data.cta?.title ?? tx.condCtaTitle}
        titleAccent={data.cta?.titleAccent ?? tx.condCtaAccent}
        lead={data.cta?.lead ?? tx.condCtaLead}
      />

      <RelatedServices exclude={data.slug} />
    </>
  );
}
