import { redirect } from "next/navigation";
import { Check, X, CalendarX } from "lucide-react";
import { site } from "@/lib/content";
import { getAppointmentByToken, cancelByToken } from "@/lib/booking";

export const dynamic = "force-dynamic";
export const metadata = { title: "Το ραντεβού σας", robots: { index: false } };

async function cancelAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  const t = String(formData.get("t") || "");
  await cancelByToken(id, t);
  redirect(`/booking/manage?id=${id}&t=${t}`);
}

const fmt = (iso: string) =>
  new Intl.DateTimeFormat("el-GR", {
    timeZone: "Europe/Athens",
    weekday: "long",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

export default async function ManagePage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; t?: string }>;
}) {
  const { id, t } = await searchParams;
  const appt = id && t ? await getAppointmentByToken(id, t) : null;

  return (
    <section className="flex min-h-[70vh] items-center bg-porcelain px-6 py-28">
      <div className="mx-auto w-full max-w-[560px]">
        <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">PhysioDanali</p>

        {!appt ? (
          <div className="mt-4">
            <h1 className="display text-3xl tracking-tight text-ink">Ο σύνδεσμος δεν ισχύει</h1>
            <p className="mt-4 text-ink-muted">
              Δεν βρέθηκε ραντεβού. Για βοήθεια καλέστε{" "}
              <a href={`tel:${site.phone}`} className="text-cobalt hover:underline">{site.phoneDisplay}</a>.
            </p>
          </div>
        ) : (
          <div className="mt-4 rounded-[24px] border border-stone bg-snow p-8">
            <h1 className="display text-3xl tracking-tight text-ink">Το ραντεβού σας</h1>
            <dl className="mt-6 space-y-3 text-base">
              <div className="flex justify-between gap-4 border-b border-stone pb-3">
                <dt className="text-ink-muted">Υπηρεσία</dt>
                <dd className="text-right font-medium text-ink">{appt.service_name}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-stone pb-3">
                <dt className="text-ink-muted">Ημέρα & ώρα</dt>
                <dd className="text-right font-medium text-ink">{fmt(appt.starts_at)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-stone pb-3">
                <dt className="text-ink-muted">Περιοχή</dt>
                <dd className="text-right text-ink">{appt.area}</dd>
              </div>
            </dl>

            {appt.status === "cancelled" ? (
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm text-red-700">
                <CalendarX className="size-4" strokeWidth={1.5} /> Το ραντεβού ακυρώθηκε.
              </p>
            ) : appt.status === "done" ? (
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-stone px-4 py-2 text-sm text-ink-muted">
                <Check className="size-4" strokeWidth={1.5} /> Ολοκληρώθηκε.
              </p>
            ) : (
              <div className="mt-6">
                <p className="mb-3 text-sm text-ink-muted">
                  {appt.status === "confirmed" ? "Επιβεβαιωμένο." : "Σε αναμονή επιβεβαίωσης."} Θέλετε να το ακυρώσετε;
                </p>
                <form action={cancelAction}>
                  <input type="hidden" name="id" value={appt.id} />
                  <input type="hidden" name="t" value={t} />
                  <button className="inline-flex items-center gap-2 rounded-full border border-stone px-5 py-2.5 text-sm text-ink-muted transition-colors hover:border-red-400 hover:text-red-600">
                    <X className="size-4" strokeWidth={1.5} /> Ακύρωση ραντεβού
                  </button>
                </form>
                <p className="mt-4 text-xs text-ink-muted">
                  Για αλλαγή ώρας, καλέστε{" "}
                  <a href={`tel:${site.phone}`} className="text-cobalt hover:underline">{site.phoneDisplay}</a>.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
