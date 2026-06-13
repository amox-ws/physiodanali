import { FileText, FileClock, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  // Authenticated read — RLS lets logged-in admins see drafts too.
  const supabase = await createClient();
  const { data } = await supabase.from("articles").select("status");
  const rows = data ?? [];
  const total = rows.length;
  const published = rows.filter((a) => a.status === "published").length;
  const drafts = rows.filter((a) => a.status === "draft").length;

  return (
    <div>
      <h1 className="display text-3xl tracking-tight text-ink lg:text-4xl">
        Πίνακας ελέγχου
      </h1>
      <p className="mt-2 text-ink-muted">
        Επισκόπηση του blog. Η διαχείριση άρθρων (έλεγχος, edit, δημοσίευση)
        έρχεται στη Φάση 4.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat icon={<FileText className="size-5" />} label="Δημοσιευμένα" value={published} />
        <Stat icon={<FileClock className="size-5" />} label="Σε αναμονή ελέγχου" value={drafts} highlight={drafts > 0} />
        <Stat icon={<Sparkles className="size-5" />} label="Σύνολο άρθρων" value={total} />
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        "rounded-2xl border bg-snow p-6 " +
        (highlight ? "border-cobalt/40 ring-1 ring-cobalt/20" : "border-stone")
      }
    >
      <span className="flex size-10 items-center justify-center rounded-full bg-cobalt/10 text-cobalt">
        {icon}
      </span>
      <p className="mt-5 display text-4xl tracking-tight text-ink">{value}</p>
      <p className="mt-1 text-sm text-ink-muted">{label}</p>
    </div>
  );
}
