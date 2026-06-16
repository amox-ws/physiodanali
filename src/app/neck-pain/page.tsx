import type { Metadata } from "next";
import { conditions } from "@/lib/content";
import { ConditionPageTemplate } from "@/components/site/condition-page-template";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  faqSchema,
  medicalProcedureSchema,
} from "@/lib/seo";

const data = conditions["neck-pain"];

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
  alternates: { canonical: "/neck-pain" },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          medicalProcedureSchema({
            name: "Αυχεναλγία — Φυσικοθεραπεία & Χειροπρακτική",
            description: data.meta.description,
            url: "/neck-pain",
          }),
          faqSchema(data.faq),
          breadcrumbSchema([
            { name: "Αρχική", url: "/" },
            { name: "Παθήσεις", url: "/" },
            { name: "Αυχεναλγία", url: "/neck-pain" },
          ]),
        ]}
      />
      <ConditionPageTemplate data={data} bgImage="/auxenelia.jpg" />
    </>
  );
}
