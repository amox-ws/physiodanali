import type { Metadata } from "next";
import { site } from "@/lib/content";
import { getServices, getSettings } from "@/lib/booking";
import { getLocale } from "@/lib/i18n-server";
import { tBooking } from "@/lib/translations";
import { PageHero } from "@/components/site/page-primitives";
import { BookingForm } from "@/components/site/booking-form";
import { Reveal } from "@/components/motion/reveal";

export async function generateMetadata(): Promise<Metadata> {
  const tx = tBooking(await getLocale());
  return { title: tx.metaTitle, description: tx.metaDesc };
}

// Availability is live → never cache.
export const dynamic = "force-dynamic";

export default async function BookingPage() {
  const [services, settings, locale] = await Promise.all([
    getServices(),
    getSettings(),
    getLocale(),
  ]);
  const tx = tBooking(locale);

  return (
    <>
      <PageHero
        breadcrumb={tx.crumb}
        eyebrow={tx.eyebrow}
        title={tx.title}
        titleAccent={tx.titleAccent}
        lead={tx.lead}
        primaryCta={{ label: tx.callNow, href: `tel:${site.phone}` }}
        secondaryCta={{ label: tx.whatsapp, href: site.whatsapp }}
      />

      <section className="bg-snow py-16 lg:py-24">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <Reveal>
            <BookingForm
              services={services}
              horizonDays={settings.booking_horizon_days}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
