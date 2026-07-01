"use client";

import { useEffect, useState } from "react";
import { localeHref } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site, type NavItem } from "@/lib/content";
import { useLocale } from "@/components/site/locale-provider";
import { getNav, t } from "@/lib/translations";
import { LocaleToggle } from "@/components/site/locale-toggle";

export function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const nav = getNav(locale);
  const tx = t(locale);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenSubmenu(null);
    setMobileExpanded(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (item: NavItem): boolean => {
    if (item.href === "/") return pathname === "/";
    if (pathname.startsWith(item.href)) return true;
    if (item.children?.some((c) => pathname.startsWith(c.href))) return true;
    return false;
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
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
          href={localeHref("/", locale)}
          aria-label={tx.homeAria}
          className="group relative z-50 flex items-center"
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

        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((item) => {
            const active = isActive(item);
            const hasChildren = !!item.children?.length;

            if (hasChildren) {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenSubmenu(item.href)}
                  onMouseLeave={() => setOpenSubmenu(null)}
                >
                  <div className="flex items-center gap-1.5">
                    <Link
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
                    <button
                      type="button"
                      onClick={() =>
                        setOpenSubmenu((s) =>
                          s === item.href ? null : item.href,
                        )
                      }
                      aria-expanded={openSubmenu === item.href}
                      aria-label={tx.openSubmenu}
                      className="rounded-full p-1 text-ink-muted transition-colors hover:text-ink"
                    >
                      <ChevronDown
                        className={cn(
                          "size-3 transition-transform duration-300",
                          openSubmenu === item.href && "rotate-180",
                        )}
                        strokeWidth={2}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {openSubmenu === item.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute right-0 top-full pt-3"
                      >
                        {/* Minimal premium panel — no header, hairline rules */}
                        <div className="w-[320px] overflow-hidden rounded-2xl border border-stone bg-snow shadow-[0_24px_60px_-24px_rgba(15,37,64,0.20)]">
                          <ul>
                            {item.children!.map((child, idx) => {
                              const childActive = pathname.startsWith(
                                child.href,
                              );
                              return (
                                <li
                                  key={child.href}
                                  className={cn(
                                    idx !== 0 &&
                                      "border-t border-stone/60",
                                  )}
                                >
                                  <Link
                                    href={child.href}
                                    className={cn(
                                      "group block px-6 py-4 transition-colors",
                                      childActive
                                        ? "bg-mist/70"
                                        : "hover:bg-mist/50",
                                    )}
                                  >
                                    <p
                                      className={cn(
                                        "display text-[1.35rem] leading-[1.1] tracking-[-0.01em] transition-colors",
                                        childActive
                                          ? "text-cobalt"
                                          : "text-ink group-hover:text-cobalt",
                                      )}
                                    >
                                      {child.label}
                                    </p>
                                    {child.description && (
                                      <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
                                        {child.description}
                                      </p>
                                    )}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

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
          <LocaleToggle className="hidden sm:inline-flex" />
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
            href={localeHref("/booking", locale)}
            className="hidden sm:inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm text-snow transition-all duration-300 hover:bg-cobalt"
          >
            {tx.book}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 lg:hidden rounded-full border border-stone bg-snow/80 p-2 text-ink"
            aria-label={open ? tx.closeMenu : tx.openMenu}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE FULL-SCREEN MENU — premium minimal, items slide up from below */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto lg:hidden"
          >
            <div className="absolute inset-0 bg-porcelain" />

            {/* Subtle radial accent + hairline grid for premium texture */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 50% at 80% 0%, rgba(30,77,139,0.10) 0%, transparent 60%), radial-gradient(50% 40% at 10% 100%, rgba(184,153,104,0.08) 0%, transparent 60%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #0a1628 1px, transparent 1px), linear-gradient(to bottom, #0a1628 1px, transparent 1px)",
                backgroundSize: "100px 100px",
              }}
            />

            <div className="relative min-h-full px-6 pb-12 pt-24">
              <div className="mx-auto flex w-full max-w-[1500px] flex-col">
                <nav className="flex flex-col">
                  {nav.map((item, i) => {
                    const active = isActive(item);
                    const hasChildren = !!item.children?.length;
                    const isExpanded = mobileExpanded === item.href;
                    const delay = 0.15 + i * 0.07;

                    if (hasChildren) {
                      return (
                        <div
                          key={item.href}
                          className="border-b border-stone/50"
                        >
                          <div className="flex items-center py-4">
                            <span className="block flex-1 overflow-hidden">
                              <motion.span
                                initial={{ y: 80, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                  delay,
                                  duration: 0.85,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="inline-block"
                              >
                                <Link
                                  href={item.href}
                                  className={cn(
                                    "display text-[clamp(2.25rem,8vw,3.25rem)] leading-[1] tracking-[-0.025em] transition-colors",
                                    active ? "text-cobalt" : "text-ink",
                                  )}
                                >
                                  {item.label}
                                </Link>
                              </motion.span>
                            </span>

                            <motion.button
                              initial={{ scale: 0.85, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                delay: delay + 0.1,
                                duration: 0.5,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              type="button"
                              onClick={() =>
                                setMobileExpanded(
                                  isExpanded ? null : item.href,
                                )
                              }
                              aria-expanded={isExpanded}
                              aria-label={tx.openSubmenu}
                              className={cn(
                                "flex size-10 shrink-0 items-center justify-center text-ink-muted transition-colors hover:text-cobalt",
                              )}
                            >
                              <ChevronDown
                                className={cn(
                                  "size-4 transition-transform duration-300",
                                  isExpanded && "rotate-180",
                                )}
                                strokeWidth={1.5}
                              />
                            </motion.button>
                          </div>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.4,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="overflow-hidden"
                              >
                                <ul className="pb-5 pl-8">
                                  {item.children!.map((child, ci) => {
                                    const childActive =
                                      pathname.startsWith(child.href);
                                    return (
                                      <motion.li
                                        key={child.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                          delay: 0.05 + ci * 0.06,
                                          duration: 0.5,
                                          ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="border-l border-stone pl-5"
                                      >
                                        <Link
                                          href={child.href}
                                          className={cn(
                                            "block py-2.5 transition-colors",
                                            childActive
                                              ? "text-cobalt"
                                              : "text-ink-muted hover:text-ink",
                                          )}
                                        >
                                          <span className="display text-[1.5rem] leading-tight tracking-[-0.01em]">
                                            {child.label}
                                          </span>
                                          {child.description && (
                                            <span className="mt-1 block text-[12px] leading-relaxed text-ink-muted">
                                              {child.description}
                                            </span>
                                          )}
                                        </Link>
                                      </motion.li>
                                    );
                                  })}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={item.href}
                        className="block border-b border-stone/50 overflow-hidden py-4"
                      >
                        <motion.span
                          initial={{ y: 80, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            delay,
                            duration: 0.85,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="inline-block"
                        >
                          <Link
                            href={item.href}
                            className={cn(
                              "display text-[clamp(2.25rem,8vw,3.25rem)] leading-[1] tracking-[-0.025em] transition-colors",
                              active ? "text-cobalt" : "text-ink",
                            )}
                          >
                            {item.label}
                          </Link>
                        </motion.span>
                      </div>
                    );
                  })}
                </nav>

                {/* CTAs — minimal, inline-aligned */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.18 + nav.length * 0.07,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-12 flex flex-col gap-3"
                >
                  <LocaleToggle />
                  <Link
                    href={localeHref("/booking", locale)}
                    className="group inline-flex w-fit items-center gap-3 rounded-full bg-ink px-6 py-3 text-sm text-snow transition-colors hover:bg-cobalt"
                  >
                    <span>{tx.book}</span>
                    <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </Link>
                  <a
                    href={`tel:${site.phone}`}
                    className="inline-flex w-fit items-center gap-2 text-sm text-ink-muted transition-colors hover:text-cobalt"
                  >
                    <Phone className="size-3.5" strokeWidth={1.5} />
                    <span className="tracking-tight">
                      {site.phoneDisplay}
                    </span>
                  </a>
                </motion.div>

                {/* Hours + address */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.4 + nav.length * 0.07,
                    duration: 0.6,
                  }}
                  className="mt-12 border-t border-stone/40 pt-7 text-xs text-ink-muted"
                >
                  <p>{tx.hoursShort}</p>
                  <p className="mt-1.5">{tx.address}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
