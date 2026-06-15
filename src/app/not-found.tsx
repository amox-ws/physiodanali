import Link from "next/link";
import { site } from "@/lib/content";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[72vh] items-center overflow-hidden bg-porcelain px-6 py-28 lg:px-10">
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
        <p className="mt-8 max-w-[50ch] text-base leading-relaxed text-ink-muted lg:text-lg">
          Η σελίδα που ψάχνετε μπορεί να μετακινήθηκε ή δεν υπάρχει πια.
          Επιστρέψτε στην αρχική ή επικοινωνήστε μαζί μας — απαντάμε εντός λίγων
          ωρών.
        </p>
        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium tracking-wide text-snow transition-all duration-500 hover:bg-cobalt"
          >
            Επιστροφή στην αρχική
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-snow/40 px-6 py-4 text-sm text-ink transition-all hover:border-ink/60 hover:bg-snow/80"
          >
            Επικοινωνία
          </Link>
          <a
            href={`tel:${site.phone}`}
            className="inline-flex items-center gap-2 px-2 py-4 text-sm text-ink-muted transition-colors hover:text-cobalt"
          >
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
