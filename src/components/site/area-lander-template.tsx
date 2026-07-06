import { Check } from "lucide-react";
import { getLocale } from "@/lib/i18n-server";
import { localeHref } from "@/lib/i18n";
import { getAreaLander, areaLinks, areaLanderSlugs } from "@/lib/area-landers";
import { PageHero, FinalCTA } from "@/components/site/page-primitives";
import { Reveal } from "@/components/motion/reveal";
import Link from "next/link";

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
                    <Check className="size-3.5 text-cobalt" strokeWidth={2.5} />
                  </span>
                  <span className="text-base leading-relaxed text-ink">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-16">
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

      <FinalCTA />
    </>
  );
}

export { areaLanderSlugs };
