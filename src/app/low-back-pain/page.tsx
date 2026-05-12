import type { Metadata } from "next";
import { conditions } from "@/lib/content";
import { ConditionPageTemplate } from "@/components/site/condition-page-template";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  faqSchema,
  medicalProcedureSchema,
} from "@/lib/seo";

const data = conditions["low-back-pain"];

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: { canonical: "/low-back-pain" },
};

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
      <ConditionPageTemplate data={data} />
    </>
  );
}
