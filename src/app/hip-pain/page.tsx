import type { Metadata } from "next";
import { conditions } from "@/lib/content";
import { ConditionPageTemplate } from "@/components/site/condition-page-template";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  faqSchema,
  medicalProcedureSchema,
} from "@/lib/seo";

const data = conditions["hip-pain"];

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: { canonical: "/hip-pain" },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          medicalProcedureSchema({
            name: "Πόνος ισχίου — Φυσικοθεραπεία & Χειροπρακτική",
            description: data.meta.description,
            url: "/hip-pain",
          }),
          faqSchema(data.faq),
          breadcrumbSchema([
            { name: "Αρχική", url: "/" },
            { name: "Παθήσεις", url: "/" },
            { name: "Ισχιαλγία", url: "/hip-pain" },
          ]),
        ]}
      />
      <ConditionPageTemplate data={data} />
    </>
  );
}
