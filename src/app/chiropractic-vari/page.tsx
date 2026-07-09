import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n-server";
import { getAreaLander } from "@/lib/area-landers";
import { AreaLanderPage } from "@/components/site/area-lander-template";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, medicalProcedureSchema } from "@/lib/seo";

const SLUG = "chiropractic-vari";

export async function generateMetadata(): Promise<Metadata> {
  const data = getAreaLander(await getLocale(), SLUG);
  return { title: { absolute: data.meta.title }, description: data.meta.description };
}

export default async function Page() {
  const data = getAreaLander(await getLocale(), SLUG);
  return (
    <>
      <JsonLd
        data={[
          medicalProcedureSchema({
            name: data.meta.title,
            description: data.meta.description,
            url: "/" + SLUG,
          }),
          faqSchema(data.faq),
          breadcrumbSchema([
            { name: "Αρχική", url: "/" },
            { name: data.eyebrow, url: "/" + SLUG },
          ]),
        ]}
      />
      <AreaLanderPage slug={SLUG} />
    </>
  );
}
