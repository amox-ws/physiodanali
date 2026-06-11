"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { home } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Bio() {
  const { bio } = home;
  const [open, setOpen] = useState(true);

  return (
    <section
      id="bio"
      aria-labelledby="bio-heading"
      className="relative bg-snow py-28 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="relative grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-stone">
              <Image
                src="/doctor.webp"
                alt="Κωνσταντίνος Δανάλης, Φυσικοθεραπευτής - Χειροπρακτικός"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority={false}
                className="object-cover object-[center_20%]"
              />
              {/* Soft bottom-to-top scrim for tonal cohesion with the rest of the page */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,22,40,0.25) 0%, transparent 100%)",
                }}
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <h2
                id="bio-heading"
                className="display text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.98] tracking-[-0.02em] text-ink"
              >
                {bio.name}
              </h2>
              <p className="mt-3 text-lg text-ink-muted">{bio.title}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-10 max-w-[60ch] text-base leading-relaxed text-ink-muted lg:text-lg">
                {bio.intro}
              </p>
              <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-ink-muted lg:text-lg">
                {bio.body}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 border-t border-stone">
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  className="flex w-full items-center justify-between py-6 text-left"
                  aria-expanded={open}
                >
                  <span className="display text-2xl leading-tight tracking-tight text-ink lg:text-3xl">
                    Εξειδικεύσεις
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-5 text-ink-muted transition-transform duration-500",
                      open && "rotate-180",
                    )}
                    strokeWidth={1.5}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: open ? "auto" : 0,
                    opacity: open ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="grid gap-3 pb-8 text-base text-ink-muted lg:grid-cols-2">
                    {bio.specialties.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-3 leading-relaxed"
                      >
                        <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-cobalt" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              <Link
                href="/about"
                className="group mt-4 inline-flex items-center gap-2 text-sm text-cobalt transition-colors hover:text-navy"
              >
                Πλήρες βιογραφικό
                <ArrowUpRight
                  className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
