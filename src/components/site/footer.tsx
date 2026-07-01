"use client";

import Image from "next/image";
import { localeHref } from "@/lib/i18n";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { useContent, useLocale } from "@/components/site/locale-provider";
import { getNav, t } from "@/lib/translations";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33Z" />
      <polygon
        points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const locale = useLocale();
  const { footer, site } = useContent();
  const nav = getNav(locale);
  const tx = t(locale);

  // The stacked-footer reveal pins the footer to the bottom (position: fixed).
  // That only works if the footer fits within the viewport — otherwise its
  // top is clipped off-screen and unreachable. So we enable the reveal
  // (`.peek-on`) only when the measured footer height fits; otherwise the
  // footer stays in normal flow and is fully visible.
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const root = document.documentElement;

    const sync = () => {
      // A fixed footer (left:0; right:0) keeps the same width — and thus the
      // same height — as it has in normal flow, so we can measure directly
      // without toggling the pin (which would risk a ResizeObserver loop).
      const height = el.offsetHeight;
      const fits = height <= window.innerHeight - 24;

      if (fits) {
        el.classList.add("peek-on");
        root.style.setProperty("--footer-h", `${height}px`);
      } else {
        el.classList.remove("peek-on");
        // Footer stays in normal flow — no reserved scroll space needed.
        root.style.setProperty("--footer-h", "0px");
      }
    };

    sync();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="peek-footer isolate overflow-hidden bg-ink text-snow"
    >
      <div className="mx-auto max-w-[1400px] px-6 pb-8 pt-14 lg:px-10 lg:pb-10 lg:pt-20">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="display text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-[-0.025em]">
                {tx.footerLine1}
                <br />
                <span className="display-italic text-gold">
                  {tx.footerLine2}
                </span>
              </h2>
              <p className="mt-5 max-w-[44ch] text-sm leading-relaxed text-snow/65 lg:text-base">
                {tx.footerTagline}
              </p>
              <div className="mt-7 flex gap-3">
                <Link
                  href={localeHref("/booking", locale)}
                  className="inline-flex items-center rounded-full bg-cobalt px-6 py-3 text-sm text-snow transition-all hover:bg-azure"
                >
                  {tx.book}
                </Link>
                <a
                  href={`tel:${site.phone}`}
                  className="inline-flex items-center rounded-full border border-snow/20 px-6 py-3 text-sm text-snow transition-all hover:border-snow/60"
                >
                  {tx.callNow}
                </a>
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-3 lg:col-span-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-snow/45">
                  {tx.colNavigation}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="transition-colors hover:text-gold"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-snow/45">
                  {tx.colContact}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm text-snow/85">
                  <li>
                    <a
                      href={`tel:${site.phone}`}
                      className="transition-colors hover:text-gold"
                    >
                      {site.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="transition-colors hover:text-gold"
                    >
                      {site.email}
                    </a>
                  </li>
                  <li className="text-snow/65">{tx.address}</li>
                  <li className="text-snow/65">{tx.hoursShort}</li>
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-snow/45">
                  {tx.colSocial}
                </p>
                <ul className="mt-4 flex gap-3">
                  <li>
                    <SocialLink href={site.social.instagram} label="Instagram">
                      <InstagramIcon />
                    </SocialLink>
                  </li>
                  <li>
                    <SocialLink href={site.social.facebook} label="Facebook">
                      <FacebookIcon />
                    </SocialLink>
                  </li>
                  <li>
                    <SocialLink href={site.social.youtube} label="YouTube">
                      <YouTubeIcon />
                    </SocialLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Massive logo — transparent PNG over the dark footer bg, as-is */}
      <Reveal>
        <div className="overflow-hidden border-t border-snow/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex max-w-[1400px] items-center px-6 py-8 lg:px-10 lg:py-12"
          >
            <Image
              src="/logo-v2.png"
              alt="PhysioDanali — Orthopedic Physical Therapy"
              width={1190}
              height={190}
              priority={false}
              className="h-auto w-full select-none"
            />
          </motion.div>
        </div>
      </Reveal>

      <div className="border-t border-snow/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 px-6 py-6 text-xs text-snow/50 lg:flex-row lg:items-center lg:px-10">
          <div className="flex flex-col gap-1">
            <span>{footer.legal}</span>
            <span className="text-snow/40">
              {site.legal.controller} — {site.legal.role}
              {site.legal.afm ? ` · ΑΦΜ: ${site.legal.afm}` : ""}
              {site.legal.license ? ` · Αρ. αδείας: ${site.legal.license}` : ""}
            </span>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={localeHref(link.href, locale)}
                  className="transition-colors hover:text-snow"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/admin"
                className="text-snow/35 transition-colors hover:text-snow"
              >
                {locale === "en" ? "Admin" : "Διαχείριση"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full border border-snow/15 transition-all hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}
