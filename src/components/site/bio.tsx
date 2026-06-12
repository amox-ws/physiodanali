"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { home } from "@/lib/content";
import { Reveal, stagger, staggerItem } from "@/components/motion/reveal";

export function Bio() {
  const { bio } = home;

  // Split the name so the surname can carry an italic cobalt accent.
  const [firstName, ...rest] = bio.name.replace(", PT", "").split(" ");
  const surname = rest.join(" ");

  return (
    <section
      id="bio"
      aria-labelledby="bio-heading"
      className="relative isolate overflow-hidden bg-snow py-20 lg:py-28"
    >
      {/* Soft tonal wash + oversized watermark initials for depth */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 85% 15%, rgba(30,77,139,0.07) 0%, transparent 60%), radial-gradient(50% 50% at 5% 95%, rgba(126,168,220,0.10) 0%, transparent 60%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-10 -z-10 select-none font-[var(--font-serif)] text-[26rem] leading-none text-ink/[0.03] lg:text-[36rem]"
        style={{ letterSpacing: "-0.05em" }}
      >
        ΚΔ
      </span>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ───── PORTRAIT ───── */}
          <Reveal className="relative lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-stone shadow-[0_40px_80px_-30px_rgba(15,37,64,0.35)]">
                <Image
                  src="/doctor.webp"
                  alt="Κωνσταντίνος Δανάλης, Φυσικοθεραπευτής - Χειροπρακτικός"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  priority={false}
                  className="object-cover object-[center_20%]"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/5"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,22,40,0.55) 0%, transparent 100%)",
                  }}
                />
              </div>

              {/* Floating credential card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-7 left-6 right-6 flex items-center justify-between gap-4 rounded-2xl border border-cobalt/15 bg-snow px-6 py-5 shadow-[0_24px_50px_-20px_rgba(15,37,64,0.35)] lg:-right-10 lg:left-10"
              >
                <div>
                  <p className="display text-2xl leading-none tracking-tight text-cobalt lg:text-3xl">
                    ΠΣΦ
                  </p>
                  <p className="mt-1.5 text-sm text-ink-muted">
                    Μέλος Συλλόγου
                  </p>
                </div>
                <span className="h-10 w-px bg-stone" />
                <div>
                  <p className="display text-2xl leading-none tracking-tight text-ink lg:text-3xl">
                    ΠΑΔΑ
                  </p>
                  <p className="mt-1.5 text-sm text-ink-muted">Απόφοιτος</p>
                </div>
              </motion.div>
            </div>
          </Reveal>

          {/* ───── CONTENT ───── */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2
                id="bio-heading"
                className="display text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.94] tracking-[-0.03em] text-ink"
              >
                {firstName}{" "}
                <span className="display-italic text-cobalt">{surname}</span>
              </h2>
              <p className="mt-4 text-xl text-ink-muted lg:text-2xl">
                {bio.title}
                <span className="ml-3 align-middle text-cobalt">· PT</span>
              </p>
            </Reveal>

            {/* Intro as a large editorial statement */}
            <Reveal delay={0.1}>
              <p className="display-italic mt-7 max-w-[34ch] text-[clamp(1.35rem,2.1vw,1.9rem)] leading-[1.2] tracking-[-0.01em] text-ink">
                {bio.intro}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-5 max-w-[62ch] text-base leading-[1.65] text-ink-muted lg:text-lg">
                {bio.body}
              </p>
            </Reveal>

            {/* Specialties — always visible, numbered, in two columns */}
            <Reveal delay={0.2}>
              <div className="mt-9">
                <h3 className="display text-xl tracking-tight text-ink lg:text-2xl">
                  Εξειδικεύσεις
                </h3>
                <motion.ol
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="mt-5 grid border-t border-stone sm:grid-cols-2 sm:gap-x-10"
                >
                  {bio.specialties.map((s, i) => (
                    <motion.li
                      key={s}
                      variants={staggerItem}
                      className="group flex items-baseline gap-3.5 border-b border-stone py-3 transition-colors"
                    >
                      <span className="display-italic w-5 shrink-0 text-lg text-cobalt/60 transition-colors duration-500 group-hover:text-cobalt lg:text-xl">
                        {i + 1}
                      </span>
                      <span className="text-[15px] leading-snug text-ink transition-colors duration-500 group-hover:text-cobalt lg:text-base">
                        {s}
                      </span>
                    </motion.li>
                  ))}
                </motion.ol>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-base text-snow transition-colors duration-500 hover:bg-cobalt"
              >
                Πλήρες βιογραφικό
                <ArrowUpRight
                  className="size-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
