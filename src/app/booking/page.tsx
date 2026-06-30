import type { Metadata } from "next";
import { site } from "@/lib/content";
import { getServices, getSettings } from "@/lib/booking";
import { PageHero } from "@/components/site/page-primitives";
import { BookingForm } from "@/components/site/booking-form";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Κλείστε ραντεβού",
  description:
    "Κλείστε online ραντεβού για φυσικοθεραπεία & χιροπρακτική κατ' οίκον σε Γλυφάδα, Βούλα, Βουλιαγμένη, Βάρη, Άλιμο. Επιλέξτε υπηρεσία, περιοχή και ώρα.",
};

// Availability is live → never cache.
export const dynamic = "force-dynamic";

export default async function BookingPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);

  return (
    <>
      <PageHero
        breadcrumb="Ραντεβού"
        eyebrow="Online κράτηση"
        title="Κλείστε ραντεβού."
        titleAccent="ραντεβού"
        lead="Επιλέξτε υπηρεσία, περιοχή και ώρα — έρχομαι σπίτι σας σε Γλυφάδα, Βούλα, Βουλιαγμένη, Βάρη και Άλιμο. Το ραντεβού επιβεβαιώνεται από εμένα."
        primaryCta={{ label: "Καλέστε τώρα", href: `tel:${site.phone}` }}
        secondaryCta={{ label: "Στείλτε WhatsApp", href: site.whatsapp }}
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
