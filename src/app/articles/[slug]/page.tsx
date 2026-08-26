import type { Metadata } from "next";
import { localeHref, type Locale } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { site } from "@/lib/content";
import {
  getArticleBySlug,
  getArticleBySlugPreview,
  getPublishedArticles,
  getPublishedSlugs,
} from "@/lib/articles";
import { Reveal } from "@/components/motion/reveal";
import { PreferredSourceCard } from "@/components/site/preferred-source";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { FinalCTA } from "@/components/site/page-primitives";
import { getLocale } from "@/lib/i18n-server";
import { t } from "@/lib/translations";

// ISR safety net; on publish the admin calls revalidateTag("articles").
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const { isEnabled: isDraft } = await draftMode();
  const post = isDraft
    ? await getArticleBySlugPreview(slug)
    : await getArticleBySlug(locale, slug);
  if (!post) return { title: t(locale).articleMetaFallback };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const tx = t(locale);
  const { isEnabled: isDraft } = await draftMode();
  const article = isDraft
    ? await getArticleBySlugPreview(slug)
    : await getArticleBySlug(locale, slug);
  if (!article) notFound();
  const post = article;
  const body = article;
  const others = (await getPublishedArticles(locale)).filter(
    (p) => p.slug !== slug,
  );

  return (
    <>
      {isDraft && (
        <div className="fixed inset-x-0 top-0 z-[80] flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-gold px-4 py-2 text-center text-sm font-medium text-ink">
          <span>👁️ Προεπισκόπηση προσχεδίου — δεν είναι δημοσιευμένο.</span>
          <a
            href="/api/preview/exit"
            className="rounded-full bg-ink px-3 py-1 text-xs text-snow transition-colors hover:bg-cobalt"
          >
            Έξοδος προεπισκόπησης
          </a>
        </div>
      )}

      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.excerpt,
            slug: post.slug,
          }),
          breadcrumbSchema([
            { name: "Αρχική", url: "/" },
            { name: "Άρθρα", url: "/articles" },
            { name: post.title, url: `/articles/${post.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-porcelain pt-36 pb-20 lg:pt-48 lg:pb-28">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(70% 60% at 80% 0%, rgba(30,77,139,0.18) 0%, transparent 60%), linear-gradient(180deg, #eef1f4 0%, #f7f8fa 100%)",
          }}
        />
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <Reveal>
            <Link
              href={localeHref("/articles", locale)}
              className="inline-flex items-center gap-2 text-base text-ink-muted transition-colors hover:text-cobalt"
            >
              <ArrowLeft className="size-4" strokeWidth={1.5} />
              {tx.allArticles}
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display mt-10 text-[clamp(2.25rem,5.5vw,5rem)] tracking-[-0.025em] leading-[0.98] text-ink">
              {post.title}
            </h1>
            <div className="mt-10 flex items-center gap-4 text-sm text-ink-muted">
              <span className="display text-cobalt">{tx.authorName}</span>
              <span className="block h-3 w-px bg-stone-dark/50" />
              <span className="inline-flex items-center gap-2">
                <Clock className="size-3.5" strokeWidth={1.5} />
                {post.readTime}
              </span>
              <span className="block h-3 w-px bg-stone-dark/50" />
              <span>{post.date}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured image */}
      <section className="bg-snow">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-stone shadow-[0_40px_80px_-30px_rgba(15,37,64,0.35)]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 1100px) 1040px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="bg-snow py-14 lg:py-20">
        <div className="mx-auto max-w-[780px] px-3 sm:px-5 lg:px-6">
          <Reveal>
            <article>
              {body.sections.map((sec, i) => (
                <ArticleSection key={i} section={sec} index={i} locale={locale} />
              ))}
            </article>
          </Reveal>
        </div>
      </section>

      {/* Inline CTA */}
      <section className="bg-snow pb-20">
        <div className="mx-auto max-w-[780px] px-3 sm:px-5 lg:px-6">
          <Reveal>
            <div className="rounded-[24px] border border-cobalt/20 bg-cobalt/5 p-8 lg:p-10">
              <p className="display text-2xl leading-[1.2] tracking-tight text-ink lg:text-3xl">
                {tx.articleCtaText}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={localeHref("/booking", locale)}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-snow transition-all hover:bg-cobalt"
                >
                  {tx.book}
                  <ArrowUpRight className="size-4" strokeWidth={1.5} />
                </Link>
                <a
                  href={`tel:${site.phone}`}
                  className="inline-flex items-center gap-2 rounded-full border border-stone bg-snow px-6 py-3 text-sm text-ink transition-all hover:border-cobalt"
                >
                  {site.phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal className="mt-4">
            <PreferredSourceCard locale={locale} />
          </Reveal>
        </div>
      </section>

      {/* More articles */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="mb-12">
            <h2 className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1] tracking-[-0.02em] text-ink">
              {tx.keepReading}
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            {others.map((p) => (
              <Reveal key={p.slug}>
                <Link
                  href={localeHref(`/articles/${p.slug}`, locale)}
                  className="group block rounded-[24px] border border-stone bg-snow p-8 transition-all duration-500 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-[0_30px_60px_-20px_rgba(15,37,64,0.15)] lg:p-10"
                >
                  <span className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                    {p.category} · {p.readTime}
                  </span>
                  <h3 className="display text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.1] tracking-tight text-ink group-hover:text-cobalt">
                    {p.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 text-base leading-relaxed text-ink-muted">
                    {p.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-cobalt">
                    {tx.readArticle}
                    <ArrowUpRight
                      className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        title={tx.articleFinalTitle}
        titleAccent={tx.articleFinalAccent}
        lead={tx.articleFinalLead}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────
 *  Article section renderer — premium editorial styling.
 *  - First section (no heading) is rendered as a lead paragraph.
 *  - H2 headings get a small gold rule above + cobalt color.
 *  - Body paragraphs are split on \n\n; lines starting with "• " inside
 *    a paragraph are upgraded to a styled bullet list.
 * ────────────────────────────────────────────────────────────────── */

function ArticleSection({
  section,
  index,
  locale,
}: {
  section: { heading?: string; body: string };
  index: number;
  locale: Locale;
}) {
  const isLead = index === 0 && !section.heading;
  const paragraphs = section.body.split("\n\n").filter((p) => p.trim());

  return (
    <section className={index === 0 ? "" : "mt-14 lg:mt-20"}>
      {section.heading && (
        <div className="mt-2 mb-7">
          <span
            aria-hidden
            className="mb-5 block h-px w-10 bg-gold/80"
          />
          <h2 className="display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.05] tracking-[-0.015em] text-cobalt">
            {section.heading}
          </h2>
        </div>
      )}

      {paragraphs.map((para, i) => (
        <Paragraph
          key={i}
          text={para}
          isLead={isLead && i === 0}
          isFirst={i === 0}
          locale={locale}
        />
      ))}
    </section>
  );
}

/**
 * Render markdown links inside body text. The AI writes internal links as
 * [label](/path); without this they printed as literal brackets. Internal paths
 * are locale-prefixed so an English article links to the English page.
 */
function renderInline(text: string, locale: Locale): React.ReactNode {
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [full, label, href] = m;
    const cls =
      "text-cobalt underline decoration-cobalt/30 underline-offset-4 transition-colors hover:decoration-cobalt";
    out.push(
      href.startsWith("/") ? (
        <Link key={m.index} href={localeHref(href, locale)} className={cls}>
          {label}
        </Link>
      ) : (
        <a
          key={m.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
        >
          {label}
        </a>
      ),
    );
    last = m.index + full.length;
  }
  if (out.length === 0) return text;
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Paragraph({
  text,
  isLead,
  isFirst,
  locale,
}: {
  text: string;
  isLead: boolean;
  isFirst: boolean;
  locale: Locale;
}) {
  const lines = text.split("\n");

  // Markdown table detection: pipe-delimited rows with a `---` separator.
  const isMarkdownTable =
    lines.length >= 2 &&
    lines[0].trim().startsWith("|") &&
    /^\|[\s\-:|]+\|$/.test(lines[1].trim());

  if (isMarkdownTable) {
    const parseRow = (line: string) =>
      line
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => c.trim());
    const headers = parseRow(lines[0]);
    const rows = lines.slice(2).map(parseRow);
    return (
      <div className={"my-7 overflow-x-auto " + (isFirst ? "first:mt-0" : "")}>
        <table className="w-full border-collapse text-left text-[15px] lg:text-[16px]">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="border-b-2 border-cobalt/40 pb-3 pr-4 text-[11px] font-medium uppercase tracking-[0.18em] text-cobalt"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b border-stone last:border-b-0">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="py-3 pr-4 leading-[1.55] text-ink-muted align-top"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Bullet list (every line starts with "• ").
  const isBulletBlock =
    lines.length > 1 && lines.every((l) => l.trim().startsWith("• "));
  if (isBulletBlock) {
    return (
      <ul className={"mt-5 space-y-3 " + (isFirst ? "first:mt-0" : "")}>
        {lines.map((l, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-base leading-[1.65] text-ink-muted lg:text-lg"
          >
            <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-cobalt" />
            <span>{renderInline(l.replace(/^•\s*/, ""), locale)}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (isLead) {
    return (
      <p className="display-italic mt-2 text-[clamp(1.25rem,2.2vw,1.6rem)] leading-[1.4] tracking-[-0.005em] text-ink first:mt-0">
        {renderInline(text, locale)}
      </p>
    );
  }

  return (
    <p
      className={
        "text-[17px] leading-[1.75] text-ink-muted lg:text-[18px] " +
        (isFirst ? "first:mt-0" : "mt-5")
      }
    >
      {renderInline(text, locale)}
    </p>
  );
}
