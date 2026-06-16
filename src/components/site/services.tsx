"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { home, serviceSummaries, type ServiceSummary } from "@/lib/content";
import { Reveal, stagger, staggerItem } from "@/components/motion/reveal";

// Lazy-loaded 3D scene
const ServicesScene = dynamic(
  () =>
    import("@/components/three/services-scene").then((m) => m.ServicesScene),
  { ssr: false },
);

export function Services({ title }: { title?: ReactNode } = {}) {
  const { services } = home;

  const sectionRef = useRef<HTMLElement>(null);
  const [mount3D, setMount3D] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
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
      {mount3D && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(60%_55%_at_75%_45%,black_0%,black_30%,transparent_85%)]"
        >
          <ServicesScene />
        </div>
      )}

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal className="mb-16 grid gap-10 lg:grid-cols-12 lg:items-end lg:mb-20">
          <div className="lg:col-span-7">
            <h2
              id="services-heading"
              className="display text-[clamp(2.5rem,5.5vw,4.75rem)] tracking-[-0.02em] leading-[0.98] text-ink"
            >
              {title ?? (
                <>
                  Άμεση εξυπηρέτηση επειγόντων.{" "}
                  <span className="display-italic text-cobalt">
                    Ερευνητικά τεκμηριωμένες παρεμβάσεις.
                  </span>
                </>
              )}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-base leading-relaxed text-ink-muted">
              {services.intro}
            </p>
          </div>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {serviceSummaries.map((service, idx) => (
            <ServiceCard
              key={service.slug}
              service={service}
              index={idx}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: ServiceSummary;
  index: number;
}) {
  // Decide if the gradient is "dark" (so we can flip text contrast).
  const isDark =
    service.monogram === "ΦΘ" ||
    service.monogram === "ΧΡ" ||
    service.monogram === "CP" ||
    service.monogram === "Ι";

  return (
    <motion.div variants={staggerItem} className="h-full">
      <Link
        href={service.href}
        className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-stone bg-snow transition-all duration-500 hover:-translate-y-1 hover:border-cobalt/40 hover:shadow-[0_30px_60px_-20px_rgba(15,37,64,0.20)] lg:rounded-[24px]"
      >
        {/* Image area — uniform aspect across all cards */}
        <div
          className="relative aspect-[4/3] w-full overflow-hidden"
          style={{ background: service.gradient }}
        >
          {/* Optional real photo (slot in via `image` field on ServiceSummary) */}
          {service.image && (
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
            />
          )}

          {/* Soft radial highlight for depth */}
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-overlay opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(70% 60% at 30% 25%, rgba(255,255,255,0.45) 0%, transparent 60%)",
            }}
          />

          {/* Monogram watermark */}
          <div className="absolute inset-0 flex items-end justify-end p-5 lg:p-6">
            <span
              className={
                "display select-none text-[clamp(5rem,12vw,9rem)] leading-[0.82] tracking-[-0.06em] " +
                (isDark ? "text-snow/12" : "text-ink/10")
              }
              aria-hidden="true"
            >
              {service.monogram}
            </span>
          </div>

          {/* Top-left: numbering */}
          <div className="absolute left-4 top-4 lg:left-5 lg:top-5">
            <span
              className={
                "rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] " +
                (isDark
                  ? "border border-snow/25 bg-snow/10 text-snow"
                  : "border border-ink/15 bg-snow/60 text-ink/75")
              }
            >
              {index + 1}
            </span>
          </div>

          {/* Top-right: arrow badge */}
          <div className="absolute right-4 top-4 lg:right-5 lg:top-5">
            <span
              className={
                "flex size-9 items-center justify-center rounded-full transition-all duration-500 group-hover:rotate-45 lg:size-10 " +
                (isDark
                  ? "bg-snow/95 text-ink group-hover:bg-cobalt group-hover:text-snow"
                  : "bg-ink/85 text-snow group-hover:bg-cobalt")
              }
            >
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </span>
          </div>

          {/* Title overlay at bottom of image */}
          <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
            <h3
              className={
                "display text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.05] tracking-[-0.01em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] " +
                (isDark ? "text-snow" : "text-ink")
              }
            >
              {service.title}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-6 lg:gap-5 lg:p-7">
          <p className="text-base leading-relaxed text-ink-muted lg:text-lg">
            {service.tagline}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
