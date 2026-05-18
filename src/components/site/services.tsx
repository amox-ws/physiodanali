"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { home, serviceSummaries, type ServiceSummary } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

// Lazy-loaded 3D scene — only enters the bundle when actually mounted.
const ServicesScene = dynamic(
  () => import("@/components/three/services-scene").then((m) => m.ServicesScene),
  { ssr: false },
);

export function Services() {
  const { services } = home;
  const featured = serviceSummaries.find((s) => s.feature)!;
  const rest = serviceSummaries.filter((s) => !s.feature).slice(0, 6);

  // Mount the 3D background only when the section is in view (or near it),
  // so we don't pay the WebGL cost on pages that never reach this section.
  const sectionRef = useRef<HTMLElement>(null);
  const [mount3D, setMount3D] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    // Bail on reduced-motion users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setMount3D(true);
            io.disconnect();
            return;
          }
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative isolate overflow-hidden bg-porcelain py-28 lg:py-40"
    >
      {/* 3D background — soft radial mask so it blends with bg */}
      {mount3D && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_55%_at_75%_45%,black_0%,black_30%,transparent_85%)]"
        >
          <ServicesScene />
        </div>
      )}

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="eyebrow">{services.eyebrow}</span>
            <h2
              id="services-heading"
              className="display mt-5 text-[clamp(2.5rem,5.5vw,4.75rem)] tracking-[-0.02em] leading-[0.98] text-ink"
            >
              Άμεση εξυπηρέτηση επειγόντων.{" "}
              <span className="display-italic text-cobalt">
                Ερευνητικά τεκμηριωμένες παρεμβάσεις.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-base leading-relaxed text-ink-muted">
              {services.intro}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          <FeaturedCard service={featured} />
          {rest.map((service, idx) => (
            <ServiceCard key={service.slug} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ service }: { service: ServiceSummary }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="lg:col-span-12 xl:col-span-7 xl:row-span-2"
    >
      <Link
        href={service.href}
        className="group relative isolate flex min-h-[440px] flex-col justify-between overflow-hidden rounded-[28px] p-10 text-snow xl:min-h-[600px]"
        style={{
          background:
            "linear-gradient(160deg, #1e4d8b 0%, #0f2540 60%, #0a1628 100%)",
        }}
      >
        <div
          className="absolute inset-0 -z-10 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(60% 60% at 70% 20%, rgba(255,255,255,0.45) 0%, transparent 60%)",
          }}
        />
        <div>
          <span className="text-[11px] uppercase tracking-[0.22em] text-snow/70">
            Featured · η ειδικότητά μας
          </span>
          <h3 className="display mt-6 text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-tight">
            Φυσικοθεραπεία
            <br />
            <span className="display-italic text-gold">κατ&apos; οίκον</span>
          </h3>
        </div>
        <div className="flex items-end justify-between gap-6">
          <p className="max-w-[42ch] text-base leading-relaxed text-snow/80">
            {service.tagline}
          </p>
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-snow/30 transition-all duration-500 group-hover:scale-110 group-hover:border-snow group-hover:bg-snow/10">
            <ArrowUpRight className="size-5" strokeWidth={1.5} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: ServiceSummary;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.05 * index,
      }}
      className="lg:col-span-6 xl:col-span-5"
    >
      <Link
        href={service.href}
        className={cn(
          "group relative isolate flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[24px] border border-stone bg-snow p-7 transition-all duration-500 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-[0_30px_60px_-20px_rgba(15,37,64,0.15)]",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
            0{index + 2}
          </span>
          <ArrowUpRight
            className="size-4 text-ink-muted transition-all duration-500 group-hover:rotate-45 group-hover:text-cobalt"
            strokeWidth={1.5}
          />
        </div>
        <div>
          <h3 className="display text-3xl leading-tight tracking-tight text-ink lg:text-4xl">
            {service.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {service.tagline}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {service.bullets.slice(0, 3).map((b) => (
              <span
                key={b}
                className="inline-flex items-center rounded-full border border-stone bg-mist/60 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-ink-muted"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
