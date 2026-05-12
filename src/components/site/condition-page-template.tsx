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
import type { ConditionPage } from "@/lib/content";

export function ConditionPageTemplate({ data }: { data: ConditionPage }) {
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
            intro="Αναγνωρίστε αν τα συμπτώματά σας ταιριάζουν — η πρώιμη παρέμβαση φέρνει ταχύτερη ανακούφιση."
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
            eyebrow="Συχνές ερωτήσεις"
            title="Ό,τι σας ενδιαφέρει."
            intro="Αν η ερώτησή σας δεν απαντιέται εδώ, καλέστε ή στείλτε μήνυμα — απαντάμε εντός λίγων ωρών."
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
        title="Ραντεβού αξιολόγησης. Άμεσα."
        titleAccent="Άμεσα."
        lead="Ραντεβού αυθημερόν εφόσον υπάρχει διαθεσιμότητα. Καλύπτουμε Βούλα, Βουλιαγμένη, Βάρη, Γλυφάδα, Άλιμο."
      />

      <RelatedServices exclude={data.slug} />
    </>
  );
}
