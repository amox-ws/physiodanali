"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, site } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-porcelain/95 border-b border-stone/70"
          : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1500px] items-center justify-between gap-4 px-6 transition-all duration-500 lg:px-10",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <Link
          href="/"
          aria-label="PhysioDanali — Αρχική"
          className="group relative flex items-center"
        >
          <Image
            src="/logo-v2.png"
            alt="PhysioDanali"
            width={1190}
            height={190}
            priority
            className={cn(
              "w-auto transition-all duration-500",
              scrolled ? "h-9" : "h-11",
            )}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative text-sm transition-colors py-1",
                  active ? "text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                <span>{item.shortLabel ?? item.label}</span>
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-cobalt transition-all duration-500",
                    active ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phone}`}
            className="hidden xl:inline-flex items-center gap-2 rounded-full border border-stone bg-snow/80 px-4 py-2 text-sm text-ink transition-all hover:border-cobalt hover:text-cobalt"
          >
            <Phone className="size-3.5" strokeWidth={1.5} />
            <span className="font-medium tracking-tight">
              {site.phoneDisplay}
            </span>
          </a>
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm text-snow transition-all duration-300 hover:bg-cobalt"
          >
            Κλείστε ραντεβού
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden rounded-full border border-stone bg-snow/80 p-2 text-ink"
            aria-label="Άνοιγμα μενού"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-stone/70 bg-porcelain"
          >
            <div className="mx-auto flex max-w-[1500px] flex-col gap-1 px-6 py-6 lg:px-10">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "display py-2 text-3xl transition-colors",
                      active ? "text-cobalt" : "text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={`tel:${site.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-stone bg-snow px-5 py-3 text-sm"
                >
                  <Phone className="size-4" strokeWidth={1.5} />
                  {site.phoneDisplay}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm text-snow"
                >
                  Κλείστε ραντεβού
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
