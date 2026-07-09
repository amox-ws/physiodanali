import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/content";

const LINKS = [
  { href: "/booking", label: "Κλείστε ραντεβού" },
  { href: "/therapies", label: "Θεραπείες" },
  { href: "/home-care", label: "Φυσικοθεραπεία κατ' οίκον" },
  { href: "/chiropractic", label: "Χειροπρακτική" },
  { href: "/articles", label: "Άρθρα" },
  { href: "/reviews", label: "Αξιολογήσεις" },
  { href: "/contact", label: "Επικοινωνία" },
];

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden bg-porcelain px-6 py-28 lg:px-10">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 60% at 80% 0%, rgba(30,77,139,0.16) 0%, transparent 60%), radial-gradient(60% 50% at 0% 100%, rgba(126,168,220,0.16) 0%, transparent 60%), linear-gradient(180deg, #eef1f4 0%, #f7f8fa 100%)",
        }}
      />
      <div className="mx-auto w-full max-w-[1400px]">
        <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">
          Σφάλμα 404
        </p>
        <h1 className="display mt-6 text-[clamp(2.75rem,9vw,7rem)] leading-[0.92] tracking-[-0.03em] text-ink">
          Η σελίδα δεν{" "}
          <span className="display-italic text-cobalt">βρέθηκε</span>.
        </h1>
        <p className="mt-8 max-w-[52ch] text-base leading-relaxed text-ink-muted lg:text-lg">
          Η σελίδα που ψάχνετε ίσως μετακινήθηκε ή δεν υπάρχει πια. Δείτε
          παρακάτω πού μπορείτε να συνεχίσετε — ή κλείστε ραντεβού απευθείας.
        </p>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link
            href="/booking"
            className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium tracking-wide text-snow transition-all duration-500 hover:bg-cobalt"
          >
            Κλείστε ραντεβού
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-snow/40 px-6 py-4 text-sm text-ink transition-all hover:border-ink/60 hover:bg-snow/80"
          >
            Επιστροφή στην αρχική
          </Link>
          <a
            href={`tel:${site.phone}`}
            className="inline-flex items-center gap-2 px-2 py-4 text-sm text-ink-muted transition-colors hover:text-cobalt"
          >
            {site.phoneDisplay}
          </a>
        </div>

        {/* Helpful destinations — keeps a lost visitor on the site */}
        <div className="mt-14 border-t border-stone-dark/15 pt-8">
          <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">
            Δημοφιλείς σελίδες
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex rounded-full border border-stone bg-snow px-4 py-2 text-sm text-ink transition-all hover:border-cobalt hover:text-cobalt"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
