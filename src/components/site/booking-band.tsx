"use client";

import Link from "next/link";
import { localeHref } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, MessageCircle } from "lucide-react";
import { useContent, useLocale } from "@/components/site/locale-provider";
import { t } from "@/lib/translations";
import { Reveal } from "@/components/motion/reveal";

export function BookingBand() {
  const { site } = useContent();
  const locale = useLocale();
  const tx = t(locale);
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden bg-ink py-28 text-snow lg:py-36"
    >
      {/* Fixed-attachment parallax photo — pinned to the viewport, the
          section scrolls over it revealing different parts of the image. */}
      <div
        aria-hidden
        className="parallax-fixed absolute inset-0 -z-20"
        style={{ backgroundImage: "url(/physiotest2.jpg)" }}
      />
      {/* Dark scrim so the white text stays legible over the photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 0%, rgba(184,153,104,0.10) 0%, transparent 55%), linear-gradient(90deg, rgba(10,22,40,0.88) 0%, rgba(10,22,40,0.72) 45%, rgba(10,22,40,0.55) 100%)",
        }}
      />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h2
              id="contact-heading"
              className="display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.025em] text-snow"
            >
              {tx.bookingTitle} <br />
              <span className="display-italic text-gold">{tx.bookingAccent}</span>
            </h2>
            <p className="mt-8 max-w-[48ch] text-base leading-relaxed text-snow/75 lg:text-lg">
              {tx.bookingLead}
            </p>
            <Link
              href={localeHref("/booking", locale)}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3 text-sm text-snow transition-all hover:bg-azure"
            >
              {tx.contactForm}
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="flex flex-col gap-4">
              <motion.a
                href={`tel:${site.phone}`}
                whileHover={{ scale: 1.01 }}
                className="group flex items-center justify-between rounded-2xl border border-snow/15 bg-snow/5 px-6 py-5 transition-all hover:border-snow/40 hover:bg-snow/10"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-snow/10">
                    <Phone className="size-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-snow/55">
                      {tx.contactRowPhone}
                    </p>
                    <p className="display text-2xl tracking-tight">
                      {site.phoneDisplay}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  className="size-5 transition-transform duration-500 group-hover:rotate-45"
                  strokeWidth={1.5}
                />
              </motion.a>

              <motion.a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01 }}
                className="group flex items-center justify-between rounded-2xl border border-snow/15 bg-snow/5 px-6 py-5 transition-all hover:border-snow/40 hover:bg-snow/10"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-snow/10">
                    <MessageCircle className="size-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-snow/55">
                      {tx.contactRowWhatsApp}
                    </p>
                    <p className="display text-2xl tracking-tight">
                      {tx.contactRowWhatsAppValue}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  className="size-5 transition-transform duration-500 group-hover:rotate-45"
                  strokeWidth={1.5}
                />
              </motion.a>

              <motion.a
                href={`mailto:${site.email}`}
                whileHover={{ scale: 1.01 }}
                className="group flex items-center justify-between rounded-2xl border border-snow/15 bg-snow/5 px-6 py-5 transition-all hover:border-snow/40 hover:bg-snow/10"
              >
                <div className="flex flex-col">
                  <p className="text-xs uppercase tracking-[0.18em] text-snow/55">
                    Email
                  </p>
                  <p className="text-lg tracking-tight">{site.email}</p>
                </div>
                <ArrowUpRight
                  className="size-5 transition-transform duration-500 group-hover:rotate-45"
                  strokeWidth={1.5}
                />
              </motion.a>

              <div className="mt-4 flex items-center gap-3 text-sm text-snow/60">
                <span className="block h-px w-8 bg-snow/30" />
                <span>{site.hoursShort}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
