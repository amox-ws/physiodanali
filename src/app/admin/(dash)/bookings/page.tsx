import { revalidatePath } from "next/cache";
import { Check, X, Phone, MapPin, Clock, CheckCheck } from "lucide-react";
import { listAppointments, setAppointmentStatus } from "@/lib/booking";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ραντεβού", robots: { index: false } };

async function updateStatus(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  if (id && status) await setAppointmentStatus(id, status);
  revalidatePath("/admin/bookings");
}

const fmt = (iso: string) =>
  new Intl.DateTimeFormat("el-GR", {
    timeZone: "Europe/Athens",
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

const STATUS: Record<string, { label: string; cls: string }> = {
  pending: { label: "Εκκρεμεί", cls: "bg-gold/20 text-ink" },
  confirmed: { label: "Επιβεβαιωμένο", cls: "bg-cobalt/15 text-cobalt" },
  done: { label: "Ολοκληρώθηκε", cls: "bg-stone text-ink-muted" },
  cancelled: { label: "Ακυρώθηκε", cls: "bg-red-100 text-red-700" },
};

export default async function BookingsAdminPage() {
  const appts = await listAppointments();
  const pending = appts.filter((a) => a.status === "pending");

  return (
    <div>
      <div className="mb-8 flex items-baseline justify-between">
        <h1 className="display text-3xl tracking-tight text-ink">Ραντεβού</h1>
        <span className="text-sm text-ink-muted">
          {pending.length} εκκρεμή · {appts.length} σύνολο
        </span>
      </div>

      {appts.length === 0 && (
        <p className="rounded-2xl border border-stone bg-snow p-8 text-center text-ink-muted">
          Δεν υπάρχουν ραντεβού ακόμα.
        </p>
      )}

      <ul className="space-y-3">
        {appts.map((a) => {
          const st = STATUS[a.status] ?? STATUS.pending;
          return (
            <li
              key={a.id}
              className="rounded-2xl border border-stone bg-snow p-5 lg:flex lg:items-center lg:justify-between lg:gap-6"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="display text-lg text-ink">{fmt(a.starts_at)}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
                    <Clock className="size-3.5" strokeWidth={1.5} /> {a.duration_min}′
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${st.cls}`}>
                    {st.label}
                  </span>
                </div>
                <p className="mt-1.5 text-base font-medium text-ink">
                  {a.service_name} — {a.patient_name}
                  {a.first_visit ? <span className="ml-2 text-xs text-cobalt">νέος ασθενής</span> : null}
                </p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-muted">
                  <a href={`tel:${a.patient_phone}`} className="inline-flex items-center gap-1 hover:text-cobalt">
                    <Phone className="size-3.5" strokeWidth={1.5} /> {a.patient_phone}
                  </a>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5" strokeWidth={1.5} /> {a.area}
                    {a.address ? ` · ${a.address}` : ""}
                  </span>
                </div>
                {a.notes && <p className="mt-1 text-sm text-ink-muted">«{a.notes}»</p>}
              </div>

              <div className="mt-4 flex shrink-0 gap-2 lg:mt-0">
                {a.status === "pending" && (
                  <form action={updateStatus}>
                    <input type="hidden" name="id" value={a.id} />
                    <input type="hidden" name="status" value="confirmed" />
                    <button className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm text-snow transition-colors hover:bg-cobalt">
                      <Check className="size-4" strokeWidth={2} /> Επιβεβαίωση
                    </button>
                  </form>
                )}
                {a.status === "confirmed" && (
                  <form action={updateStatus}>
                    <input type="hidden" name="id" value={a.id} />
                    <input type="hidden" name="status" value="done" />
                    <button className="inline-flex items-center gap-1.5 rounded-full border border-stone px-4 py-2 text-sm text-ink-muted transition-colors hover:border-cobalt hover:text-cobalt">
                      <CheckCheck className="size-4" strokeWidth={1.5} /> Ολοκληρώθηκε
                    </button>
                  </form>
                )}
                {a.status !== "cancelled" && a.status !== "done" && (
                  <form action={updateStatus}>
                    <input type="hidden" name="id" value={a.id} />
                    <input type="hidden" name="status" value="cancelled" />
                    <button className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-ink-muted transition-colors hover:text-red-600">
                      <X className="size-4" strokeWidth={1.5} /> Ακύρωση
                    </button>
                  </form>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
