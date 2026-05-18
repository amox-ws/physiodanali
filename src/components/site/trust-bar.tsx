"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Affiliation = {
  src: string;
  alt: string;
};

const affiliations: Affiliation[] = [
  { src: "/psf-transparent.png", alt: "Πανελλήνιος Σύλλογος Φυσικοθεραπευτών" },
  { src: "/pada.png", alt: "Πανεπιστήμιο Δυτικής Αττικής" },
  { src: "/omtgr-transparent.png", alt: "OMT Greece" },
  { src: "/ifompt.png", alt: "IFOMPT" },
];

export function TrustBar() {
  // Duplicate for an infinite seamless loop
  const items = [...affiliations, ...affiliations];

  // Pause marquee when the section is offscreen (saves CPU)
  const ref = useRef<HTMLElement>(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setRunning(e.isIntersecting);
      },
      { rootMargin: "100px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Πιστοποιήσεις & συμμετοχές"
      className="relative border-y border-stone bg-snow py-14 lg:py-16"
    >
      <div className="relative overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-snow to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-snow to-transparent" />

        <ul
          className="marquee flex w-max items-center gap-16 px-8 lg:gap-24"
          style={{
            animationPlayState: running ? "running" : "paused",
            willChange: "transform",
          }}
        >
          {items.map((a, i) => (
            <li
              key={`${a.src}-${i}`}
              className="flex shrink-0 items-center"
            >
              <Image
                src={a.src}
                alt={a.alt}
                width={300}
                height={120}
                className="h-20 w-auto object-contain opacity-80 transition-opacity duration-500 hover:opacity-100 lg:h-24"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
