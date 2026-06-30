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

const data = conditions["hip-pain"];

export async function generateMetadata(): Promise<Metadata> {
  const { conditions } = getContent(await getLocale());
  const data = conditions["hip-pain"];
  return {
    title: data.meta.title,
    description: data.meta.description,
  };
}

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
      <ConditionPageTemplate slug="hip-pain" bgImage="/isxilia.jpg" />
    </>
  );
}
