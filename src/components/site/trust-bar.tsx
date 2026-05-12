"use client";

import { useEffect, useRef, useState } from "react";
import { home } from "@/lib/content";

export function TrustBar() {
  const { trustBar } = home;
  const items = [...trustBar.items, ...trustBar.items];

  // Pause the marquee CSS animation when the section is offscreen
  // so it doesn't burn cycles below the fold.
  const ref = useRef<HTMLDivElement>(null);
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
      aria-labelledby="trust-bar-label"
      className="relative border-y border-stone bg-snow py-10"
    >
      <h2 id="trust-bar-label" className="eyebrow mb-6 text-center">
        {trustBar.eyebrow}
      </h2>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-snow to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-snow to-transparent" />
        <div
          className="marquee flex w-max items-center gap-14 px-8"
          style={{
            animationPlayState: running ? "running" : "paused",
            willChange: "transform",
          }}
        >
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="display whitespace-nowrap text-2xl text-ink/55"
              style={{ letterSpacing: "-0.01em" }}
            >
              {item}
              <span className="ml-14 text-cobalt/40">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
