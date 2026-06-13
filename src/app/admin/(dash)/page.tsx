import Link from "next/link";
import { Plus, FileClock, FileText, Pencil, Sparkles } from "lucide-react";
import { listAllArticles, type AdminArticleListItem } from "@/lib/admin-articles";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const articles = await listAllArticles();
  const drafts = articles.filter((a) => a.status === "draft");
  const published = articles.filter((a) => a.status === "published");

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="display text-3xl tracking-tight text-ink lg:text-4xl">
            Άρθρα
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            {published.length} δημοσιευμένα · {drafts.length} σε αναμονή ελέγχου
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-snow transition-colors hover:bg-cobalt"
        >
          <Plus className="size-4" strokeWidth={1.5} />
          Νέο άρθρο
        </Link>
      </div>

      {drafts.length > 0 && (
        <Group
          title="Σε αναμονή ελέγχου"
          icon={<FileClock className="size-4" strokeWidth={1.5} />}
          items={drafts}
          highlight
        />
      )}

      <Group
        title="Δημοσιευμένα"
        icon={<FileText className="size-4" strokeWidth={1.5} />}
        items={published}
      />

      {articles.length === 0 && (
        <p className="mt-10 rounded-2xl border border-dashed border-stone p-10 text-center text-ink-muted">
          Δεν υπάρχουν άρθρα ακόμα. Πατήστε «Νέο άρθρο» για να ξεκινήσετε.
        </p>
      )}
    </div>
  );
}

function Group({
  title,
  icon,
  items,
  highlight,
}: {
  title: string;
  icon: React.ReactNode;
  items: AdminArticleListItem[];
  highlight?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-muted">
        {icon}
        {title} · {items.length}
      </h2>
      <ul
        className={
          "overflow-hidden rounded-2xl border bg-snow " +
          (highlight ? "border-cobalt/40" : "border-stone")
        }
      >
        {items.map((a) => (
          <li key={a.id} className="border-b border-stone last:border-b-0">
            <Link
              href={`/admin/articles/${a.id}`}
              className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-porcelain"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-ink group-hover:text-cobalt">
                  {a.title || "(χωρίς τίτλο)"}
                </p>
                <p className="mt-0.5 truncate text-xs text-ink-muted">
                  {a.category || "—"} · /{a.slug}
                </p>
              </div>
              {a.ai_generated && (
                <span className="hidden items-center gap-1 rounded-full bg-cobalt/10 px-2.5 py-1 text-[10px] uppercase tracking-wide text-cobalt sm:inline-flex">
                  <Sparkles className="size-3" /> AI
                </span>
              )}
              <Pencil className="size-4 shrink-0 text-ink-muted transition-colors group-hover:text-cobalt" strokeWidth={1.5} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
