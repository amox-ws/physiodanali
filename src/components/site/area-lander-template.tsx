import { Check, ArrowUpRight, Star } from "lucide-react";
import { getLocale } from "@/lib/i18n-server";
import { localeHref } from "@/lib/i18n";
import { getAreaLander, areaLinks, areaLanderSlugs } from "@/lib/area-landers";
import { PageHero, FinalCTA } from "@/components/site/page-primitives";
import { Process } from "@/components/site/process";
import { Reveal } from "@/components/motion/reveal";
import Link from "next/link";

// Brand accents cycled across the condition cards (matches chiropractic page).
const COND_ACCENTS = ["#1e4d8b", "#2563b0", "#0f2540", "#8a6d3b", "#4577b8"];

// Shared layout for the local-SEO area landers (SEO migration P0).
export async function AreaLanderPage({ slug }: { slug: string }) {
  const locale = await getLocale();
  const data = getAreaLander(locale, slug);
  const others = areaLinks.filter((l) => l.href !== `/${slug}`);

  return (
    <>
      <PageHero
        breadcrumb={data.breadcrumb}
        eyebrow={data.eyebrow}
        title={data.title}
        titleAccent={data.titleAccent}
        lead={data.lead}
        primaryCta={{
          label: locale === "en" ? "Book an appointment" : "Κλείστε ραντεβού",
          href: localeHref("/booking", locale),
        }}
        secondaryCta={{
          label: locale === "en" ? "Call now" : "Καλέστε τώρα",
          href: "tel:+306944344342",
        }}
        bgImage={data.bgImage}
      />

      {/* ── Client-authored landing flow (when the entry carries it) ── */}
      {data.conditions ? (
        <>
          {/* Hero mini-testimonial strip */}
          {data.heroQuote && (
            <section className="border-b border-stone bg-snow">
              <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-2 px-6 py-8 text-center lg:px-10">
                <span className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="size-4 fill-gold text-gold"
                      strokeWidth={0}
                    />
                  ))}
                </span>
                <p className="max-w-[52ch] text-lg leading-relaxed text-ink lg:text-xl">
                  &ldquo;{data.heroQuote.text}&rdquo;
                </p>
                <p className="text-sm font-medium text-ink-muted">
                  — {data.heroQuote.author}
                </p>
              </div>
            </section>
          )}
          {/* Conditions we support — cards, some linking to detail pages */}
          <section
            className="relative isolate overflow-hidden py-20 lg:py-28"
            style={{ backgroundColor: "#eef4fb" }}
          >
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(55% 50% at 85% 5%, rgba(30,77,139,0.08) 0%, transparent 60%), radial-gradient(45% 55% at 5% 95%, rgba(126,168,220,0.14) 0%, transparent 60%)",
              }}
            />
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
              <Reveal className="mx-auto mb-12 max-w-[820px] text-center lg:mb-16">
                <h2 className="display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.025em] text-ink">
                  {data.conditionsTitle}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-muted lg:text-xl">
                  {data.conditionsIntro}
                </p>
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {data.conditions.map((c, i) => {
                  const accent = COND_ACCENTS[i % COND_ACCENTS.length];
                  const inner = (
                    <>
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 h-1 w-16 transition-all duration-500 group-hover:w-full"
                        style={{ backgroundColor: accent }}
                      />
                      <h3
                        className="display mt-2 text-2xl leading-tight tracking-tight lg:text-[1.6rem]"
                        style={{ color: accent }}
                      >
                        {c.title}
                      </h3>
                      <p className="mt-3 flex-1 text-base leading-relaxed text-ink-muted">
                        {c.body}
                      </p>
                      {c.href && (
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cobalt">
                          {locale === "en" ? "Learn more" : "Μάθε περισσότερα"}
                          <ArrowUpRight className="size-4" strokeWidth={1.75} />
                        </span>
                      )}
                    </>
                  );
                  const cls =
                    "group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-stone bg-snow p-7 transition-all duration-500 hover:-translate-y-1 hover:border-cobalt/40 hover:shadow-[0_30px_60px_-20px_rgba(15,37,64,0.18)] lg:p-8";
                  return (
                    <Reveal key={c.title} delay={i * 0.06} className="h-full">
                      {c.href ? (
                        <Link href={localeHref(c.href, locale)} className={cls}>
                          {inner}
                        </Link>
                      ) : (
                        <div className={cls}>{inner}</div>
                      )}
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Also treating — chips */}
          <section className="bg-snow py-16 lg:py-20">
            <div className="mx-auto max-w-[1100px] px-6 lg:px-10 text-center">
              <Reveal>
                <h2 className="display text-[clamp(1.75rem,3.2vw,2.6rem)] leading-tight tracking-[-0.02em] text-ink">
                  {data.alsoTreatTitle}
                </h2>
                <p className="mt-3 text-lg text-ink-muted">
                  {data.alsoTreatIntro}
                </p>
                <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
                  {data.alsoTreat?.map((s) => (
                    <li
                      key={s}
                      className="inline-flex rounded-full border border-cobalt/20 bg-cobalt/5 px-4 py-2 text-sm font-medium text-ink"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <Link
                  href={localeHref("/chiropractic", locale)}
                  className="group mt-8 inline-flex items-center gap-2 text-base font-medium text-cobalt transition-colors hover:text-navy"
                >
                  {locale === "en"
                    ? "At-home chiropractic care"
                    : "Χειροπρακτική κατ' οίκον"}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                  />
                </Link>
              </Reveal>
            </div>
          </section>

          {/* Practitioner credentials */}
          <section className="bg-porcelain py-20 lg:py-28">
            <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
              <Reveal>
                <h2 className="display text-[clamp(1.9rem,3.5vw,2.9rem)] leading-tight tracking-[-0.02em] text-ink">
                  {data.practitionerHeading}
                </h2>
                <p className="mt-3 text-lg text-ink-muted lg:text-xl">
                  {data.practitionerRole}
                </p>
                <ul className="mt-9 grid gap-4 sm:grid-cols-2">
                  {data.credentials?.map((c) => (
                    <li key={c} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-cobalt/10">
                        <Check
                          className="size-3.5 text-cobalt"
                          strokeWidth={2.5}
                        />
                      </span>
                      <span className="text-base leading-relaxed text-ink">
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>

          {/* How it works — same 4-step section as the home page */}
          <Process />

          {/* Reviews */}
          <section className="bg-snow py-20 lg:py-28">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
              <Reveal className="mx-auto mb-12 max-w-[760px] text-center">
                <h2 className="display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.025em] text-ink">
                  {data.reviewsTitle}
                </h2>
                <p className="mt-4 inline-flex items-center gap-2 text-lg text-ink-muted">
                  <span className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star
                        key={i}
                        className="size-4 fill-gold text-gold"
                        strokeWidth={0}
                      />
                    ))}
                  </span>
                  {data.reviewsIntro}
                </p>
              </Reveal>
              <div className="grid gap-6 lg:grid-cols-3">
                {data.reviews?.map((r, i) => (
                  <Reveal key={r.author} delay={i * 0.08} className="h-full">
                    <figure className="flex h-full flex-col rounded-[24px] border border-stone bg-porcelain p-7 lg:p-8">
                      <blockquote className="flex-1 text-base leading-[1.7] text-ink">
                        &ldquo;{r.text}&rdquo;
                      </blockquote>
                      <figcaption className="mt-5 text-sm font-medium text-cobalt">
                        {r.author}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="bg-snow py-20 lg:py-28">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
            <Reveal>
              {data.intro.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="mt-6 max-w-[70ch] text-base leading-relaxed text-ink-muted first:mt-0 lg:text-lg"
                >
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal className="mt-14">
              <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink">
                {data.bulletsTitle}
              </h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {data.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-cobalt/10">
                      <Check
                        className="size-3.5 text-cobalt"
                        strokeWidth={2.5}
                      />
                    </span>
                    <span className="text-base leading-relaxed text-ink">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      <section className="bg-snow pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <Reveal className="mt-2">
            <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight tracking-[-0.02em] text-ink">
              {locale === "en" ? "Frequently asked" : "Συχνές ερωτήσεις"}
            </h2>
            <div className="mt-8 space-y-6">
              {data.faq.map((f) => (
                <div key={f.question} className="border-b border-stone pb-6">
                  <h3 className="text-lg font-medium text-ink">{f.question}</h3>
                  <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-ink-muted">
                    {f.answer}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Cross-links: other areas (internal linking for local SEO) */}
          <Reveal className="mt-14">
            <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">
              {locale === "en" ? "Other areas" : "Άλλες περιοχές"}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {others.map((l) => (
                <li key={l.href}>
                  <Link
                    href={localeHref(l.href, locale)}
                    className="inline-flex rounded-full border border-stone px-4 py-2 text-sm text-ink transition-all hover:border-cobalt hover:text-cobalt"
                  >
                    {locale === "en" ? l.en : l.el}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <FinalCTA title={data.ctaTitle} lead={data.ctaLead} />
    </>
  );
}

export { areaLanderSlugs };
