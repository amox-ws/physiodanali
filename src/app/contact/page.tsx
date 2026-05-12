import type { Metadata } from "next";
import { contact, site } from "@/lib/content";
import { PageHero } from "@/components/site/page-primitives";
import { ContactForm } from "@/components/site/contact-form";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: contact.meta.title,
  description: contact.meta.description,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb={contact.breadcrumb}
        eyebrow={contact.hero.eyebrow}
        title={contact.hero.title}
        titleAccent={contact.hero.titleAccent}
        lead={contact.hero.lead}
        primaryCta={{ label: "Καλέστε τώρα", href: `tel:${site.phone}` }}
        secondaryCta={{ label: "Στείλτε WhatsApp", href: site.whatsapp }}
      />

      <section className="bg-snow py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <span className="eyebrow">Στοιχεία</span>
              <h2 className="display mt-5 text-[clamp(2.25rem,4vw,3.5rem)] leading-[1] tracking-[-0.02em] text-ink">
                {contact.formHeading}
              </h2>
              <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-ink-muted lg:text-lg">
                {contact.formIntro}
              </p>

              <ul className="mt-12 space-y-6">
                <ContactRow
                  label="Τηλέφωνο"
                  value={site.phoneDisplay}
                  href={`tel:${site.phone}`}
                />
                <ContactRow
                  label="Email"
                  value={site.email}
                  href={`mailto:${site.email}`}
                />
                <ContactRow
                  label="WhatsApp"
                  value="Στείλτε μήνυμα"
                  href={site.whatsapp}
                  external
                />
                <ContactRow label="Διεύθυνση" value={site.address} />
              </ul>

              <div className="mt-12 border-t border-stone pt-8">
                <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">
                  Ωράριο
                </p>
                <ul className="mt-5 space-y-3">
                  {site.hoursList.map((h) => (
                    <li
                      key={h.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-ink-muted">{h.label}</span>
                      <span className="display text-lg tracking-tight text-ink">
                        {h.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="rounded-[28px] border border-stone bg-porcelain p-8 lg:p-12">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">
        {label}
      </p>
      <p className="mt-2 display text-2xl tracking-tight text-ink transition-colors group-hover:text-cobalt">
        {value}
      </p>
    </>
  );
  if (href) {
    return (
      <li>
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="group block border-b border-stone pb-5"
        >
          {content}
        </a>
      </li>
    );
  }
  return <li className="border-b border-stone pb-5">{content}</li>;
}
