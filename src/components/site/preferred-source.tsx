import type { Locale } from "@/lib/i18n";

/**
 * Google "Preferred Sources" opt-in.
 *
 * Google lets a reader nominate the sites they want ranked higher for their
 * own searches — it surfaces the chosen site in Top Stories and inside AI
 * Overviews / AI Mode. Google publishes a JS widget for this, but it loads
 * news.google.com/swg/js/v1/publisher.js and can set cookies, which would
 * have to sit behind the consent banner. The documented deeplink does the
 * same job with no script, no cookies and no consent question, so that is
 * what we use.
 *
 * Docs: developers.google.com/search/docs/appearance/preferred-sources
 */
const HREF = "https://www.google.com/preferences/source?q=physiodanali.gr";

const COPY = {
  el: {
    label: "Ορίστε μας ως προτιμώμενη πηγή στο Google",
    lead: "Δείτε πρώτα τα άρθρα μας όταν ψάχνετε για πόνο, αποκατάσταση και φυσικοθεραπεία.",
    short: "Προτιμώμενη πηγή στο Google",
  },
  en: {
    label: "Make us a preferred source on Google",
    lead: "See our articles first when you search for pain, recovery and physiotherapy.",
    short: "Preferred source on Google",
  },
} as const;

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.44a5.5 5.5 0 0 1-2.39 3.62v3h3.86c2.26-2.09 3.58-5.17 3.58-8.86z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.7 0 3.99 2.47 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

/** Full card — end of an article and the articles index. */
export function PreferredSourceCard({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <a
      href={HREF}
      target="_blank"
      rel="noopener nofollow"
      className="group flex items-start gap-4 rounded-[20px] border border-stone bg-porcelain p-6 transition-colors duration-500 hover:border-cobalt/40 lg:p-7"
    >
      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-snow">
        <GoogleG className="size-5" />
      </span>
      <span>
        <span className="block text-base font-medium text-ink transition-colors group-hover:text-cobalt lg:text-lg">
          {c.label}
        </span>
        <span className="mt-1.5 block text-sm leading-relaxed text-ink-muted">
          {c.lead}
        </span>
      </span>
    </a>
  );
}

/** Quiet one-liner — footer. */
export function PreferredSourceLink({ locale }: { locale: Locale }) {
  return (
    <a
      href={HREF}
      target="_blank"
      rel="noopener nofollow"
      className="inline-flex items-center gap-2 text-snow/60 transition-colors hover:text-gold"
    >
      <GoogleG className="size-3.5" />
      {COPY[locale].short}
    </a>
  );
}
