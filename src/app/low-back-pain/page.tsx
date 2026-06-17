import type { Metadata } from "next";
import { conditions } from "@/lib/content";
import { getContent } from "@/lib/content-i18n";
import { getLocale } from "@/lib/i18n-server";
import { ConditionPageTemplate } from "@/components/site/condition-page-template";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  faqSchema,
  medicalProcedureSchema,
} from "@/lib/seo";

const data = conditions["low-back-pain"];

export async function generateMetadata(): Promise<Metadata> {
  const { conditions } = getContent(await getLocale());
  const data = conditions["low-back-pain"];
  return {
    title: data.meta.title,
    description: data.meta.description,
    alternates: { canonical: "/low-back-pain" },
  };
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          medicalProcedureSchema({
            name: "Οσφυαλγία — Φυσικοθεραπεία & Χειροπρακτική",
            description: data.meta.description,
            url: "/low-back-pain",
          }),
          faqSchema(data.faq),
          breadcrumbSchema([
            { name: "Αρχική", url: "/" },
            { name: "Παθήσεις", url: "/" },
            { name: "Οσφυαλγία", url: "/low-back-pain" },
          ]),
        ]}
      />
      <ConditionPageTemplate slug="low-back-pain" bgImage="/osfilagia.jpg" />
    </>
  );
}
