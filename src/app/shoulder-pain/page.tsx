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

const data = conditions["shoulder-pain"];

export async function generateMetadata(): Promise<Metadata> {
  const { conditions } = getContent(await getLocale());
  const data = conditions["shoulder-pain"];
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
            name: "Πόνος στον ώμο — Φυσικοθεραπεία & Χειροπρακτική",
            description: data.meta.description,
            url: "/shoulder-pain",
          }),
          faqSchema(data.faq),
          breadcrumbSchema([
            { name: "Αρχική", url: "/" },
            { name: "Παθήσεις", url: "/" },
            { name: "Πόνος στον ώμο", url: "/shoulder-pain" },
          ]),
        ]}
      />
      <ConditionPageTemplate slug="shoulder-pain" bgImage="/omos.jpg" />
    </>
  );
}
