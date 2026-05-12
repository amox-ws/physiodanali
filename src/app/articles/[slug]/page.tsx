import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { articleBodies, articles, site } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { FinalCTA } from "@/components/site/page-primitives";

export function generateStaticParams() {
  return articles.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = articles.posts.find((p) => p.slug === slug);
  if (!post) return { title: "Άρθρο" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/articles/${slug}` },
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
  const post = articles.posts.find((p) => p.slug === slug);
  const body = articleBodies[slug];
  if (!post || !body) notFound();

  const others = articles.posts.filter((p) => p.slug !== slug);

  return (
    <>
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
              href="/articles"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink-muted transition-colors hover:text-cobalt"
            >
              <ArrowLeft className="size-3.5" strokeWidth={1.5} />
              Όλα τα άρθρα
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="eyebrow mt-10 block">{post.category}</span>
            <h1 className="display mt-6 text-[clamp(2.25rem,5.5vw,5rem)] tracking-[-0.025em] leading-[0.98] text-ink">
              {post.title}
            </h1>
            <div className="mt-10 flex items-center gap-4 text-sm text-ink-muted">
              <span className="display text-cobalt">Κωνσταντίνος Δανάλης</span>
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

      {/* Body */}
      <section className="bg-snow py-20 lg:py-28">
        <div className="mx-auto max-w-[760px] px-6 lg:px-10">
          <Reveal>
            <article className="space-y-10 text-lg leading-[1.7] text-ink lg:text-xl lg:leading-[1.65]">
              {body.sections.map((sec, i) => (
                <div key={i}>
                  {sec.heading && (
                    <h2 className="display mt-12 mb-5 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-tight text-ink first:mt-0">
                      {sec.heading}
                    </h2>
                  )}
                  <p className="text-ink-muted">{sec.body}</p>
                </div>
              ))}
            </article>
          </Reveal>
        </div>
      </section>

      {/* Inline CTA */}
      <section className="bg-snow pb-28">
        <div className="mx-auto max-w-[760px] px-6 lg:px-10">
          <Reveal>
            <div className="rounded-[24px] border border-cobalt/20 bg-cobalt/5 p-8 lg:p-10">
              <span className="eyebrow">Έχετε παρόμοιο πρόβλημα;</span>
              <p className="display mt-4 text-2xl leading-[1.2] tracking-tight text-ink lg:text-3xl">
                Κλείστε αξιολόγηση και βρείτε την προσέγγιση που ταιριάζει στη
                δική σας περίπτωση.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-snow transition-all hover:bg-cobalt"
                >
                  Κλείστε ραντεβού
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
        </div>
      </section>

      {/* More articles */}
      <section className="bg-porcelain py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="mb-12">
            <span className="eyebrow">Περισσότερα άρθρα</span>
            <h2 className="display mt-5 text-[clamp(2rem,4vw,3.5rem)] leading-[1] tracking-[-0.02em] text-ink">
              Συνεχίστε την ανάγνωση.
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            {others.map((p) => (
              <Reveal key={p.slug}>
                <Link
                  href={`/articles/${p.slug}`}
                  className="group block rounded-[24px] border border-stone bg-snow p-8 transition-all duration-500 hover:-translate-y-1 hover:border-cobalt/30 hover:shadow-[0_30px_60px_-20px_rgba(15,37,64,0.15)] lg:p-10"
                >
                  <span className="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                    {p.category} · {p.readTime}
                  </span>
                  <h3 className="display mt-5 text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.1] tracking-tight text-ink group-hover:text-cobalt">
                    {p.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 text-base leading-relaxed text-ink-muted">
                    {p.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-cobalt">
                    Διαβάστε το άρθρο
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
        title="Έτοιμοι όταν είστε."
        titleAccent="Έτοιμοι"
        lead="Από αξιολόγηση μέχρι ολοκληρωμένο πρόγραμμα αποκατάστασης — στο σπίτι σας ή στο ιατρείο."
      />
    </>
  );
}
