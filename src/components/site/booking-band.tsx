"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, MessageCircle } from "lucide-react";
import { site } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";

export function BookingBand() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden bg-ink py-28 text-snow lg:py-36"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 0%, rgba(184,153,104,0.18) 0%, transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(30,77,139,0.55) 0%, transparent 65%), #0a1628",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h2
              id="contact-heading"
              className="display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.025em] text-snow"
            >
              Κλείστε ραντεβού. <br />
              <span className="display-italic text-gold">Άμεσα.</span>
            </h2>
            <p className="mt-8 max-w-[48ch] text-base leading-relaxed text-snow/75 lg:text-lg">
              Επικοινωνήστε μέσω τηλεφώνου ή WhatsApp. Απαντάμε τις ίδιες μέρες
              — και ραντεβού δίνονται έως αυθημερόν, εφόσον υπάρχει
              διαθεσιμότητα.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3 text-sm text-snow transition-all hover:bg-azure"
            >
              Φόρμα επικοινωνίας
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
                      Τηλέφωνο
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
                      WhatsApp
                    </p>
                    <p className="display text-2xl tracking-tight">
                      Στείλτε μήνυμα
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
