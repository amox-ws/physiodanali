import { revalidatePath } from "next/cache";
import { Check, X, Phone, MapPin, Clock, CheckCheck, Plus, Pencil } from "lucide-react";
import {
  listAppointments,
  setAppointmentStatus,
  createAppointment,
  updateAppointment,
  getServices,
  athensWallToUtc,
} from "@/lib/booking";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ραντεβού", robots: { index: false } };

const AREAS = ["Γλυφάδα", "Βούλα", "Βουλιαγμένη", "Βάρη", "Άλιμο"];
const priceFor = (min: number) => (min === 60 ? 100 : 50);

async function updateStatus(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  if (id && status) await setAppointmentStatus(id, status);
  revalidatePath("/admin/bookings");
}

// Manual entry — the practitioner books a phone patient himself (confirmed).
async function createManual(formData: FormData) {
  "use server";
  const serviceId = formData.get("service_id") as string;
  const durationMin = Number(formData.get("duration") || 60);
  const area = formData.get("area") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const name = (formData.get("name") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const email = (formData.get("email") as string)?.trim() || undefined;
  const address = (formData.get("address") as string)?.trim() || undefined;
  const notes = (formData.get("notes") as string)?.trim() || undefined;
  if (!serviceId || !area || !date || !time || !name || !phone) return;

  const svc = (await getServices()).find((s) => s.id === serviceId);
  if (!svc) return;
  await createAppointment({
    serviceId,
    serviceName: svc.name,
    durationMin,
    priceEur: priceFor(durationMin),
    area,
    startUtc: athensWallToUtc(date, time),
    patientName: name,
    patientPhone: phone,
    patientEmail: email,
    address,
    notes,
    status: "confirmed",
  });
  revalidatePath("/admin/bookings");
}

// Edit / reschedule — change time/duration/area + a note; patient is emailed.
async function editAppt(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const duration = Number(formData.get("duration") || 0) || undefined;
  const area = (formData.get("area") as string) || undefined;
  const comment = (formData.get("comment") as string) ?? "";
  if (!id) return;
  await updateAppointment(id, {
    startUtc: date && time ? athensWallToUtc(date, time) : undefined,
    durationMin: duration,
    area,
    adminNote: comment,
  });
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

const athensDate = (iso: string) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Athens",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
const athensTime = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Athens",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));

const STATUS: Record<string, { label: string; cls: string }> = {
  pending: { label: "Εκκρεμεί", cls: "bg-purple-100 text-purple-700" },
  confirmed: { label: "Επιβεβαιωμένο", cls: "bg-green-100 text-green-700" },
  rescheduled: { label: "Άλλαξε ώρα", cls: "bg-orange-100 text-orange-700" },
  done: { label: "Ολοκληρώθηκε", cls: "bg-stone text-ink-muted" },
  cancelled: { label: "Ακυρώθηκε", cls: "bg-red-100 text-red-700" },
};

const fieldCls =
  "rounded-lg border border-stone bg-snow px-3 py-2 text-sm text-ink outline-none focus:border-cobalt";

export default async function BookingsAdminPage() {
  const [appts, services] = await Promise.all([listAppointments(), getServices()]);
  const pending = appts.filter((a) => a.status === "pending");

  return (
    <div>
      <div className="mb-8 flex items-baseline justify-between">
        <h1 className="display text-3xl tracking-tight text-ink">Ραντεβού</h1>
        <span className="text-sm text-ink-muted">
          {pending.length} εκκρεμή · {appts.length} σύνολο
        </span>
      </div>

      {/* New manual appointment */}
      <details className="mb-6 rounded-2xl border border-stone bg-snow">
        <summary className="flex cursor-pointer list-none items-center gap-2 p-4 text-sm font-medium text-ink">
          <Plus className="size-4 text-cobalt" strokeWidth={2} /> Νέο ραντεβού (χειροκίνητα)
        </summary>
        <form action={createManual} className="grid gap-3 border-t border-stone p-4 sm:grid-cols-2">
          <select name="service_id" required className={fieldCls} defaultValue="">
            <option value="" disabled>
              Υπηρεσία…
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <select name="duration" className={fieldCls} defaultValue="60">
            <option value="30">30′ · 50€</option>
            <option value="60">60′ · 100€</option>
          </select>
          <select name="area" required className={fieldCls} defaultValue="">
            <option value="" disabled>
              Περιοχή…
            </option>
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <input type="date" name="date" required className={`${fieldCls} flex-1`} />
            <input type="time" name="time" required className={`${fieldCls} w-28`} />
          </div>
          <input name="name" required placeholder="Ονοματεπώνυμο*" className={fieldCls} />
          <input name="phone" required placeholder="Τηλέφωνο*" className={fieldCls} />
          <input name="email" type="email" placeholder="Email (για ειδοποίηση)" className={fieldCls} />
          <input name="address" placeholder="Διεύθυνση" className={fieldCls} />
          <textarea name="notes" rows={2} placeholder="Σημείωση" className={`${fieldCls} sm:col-span-2`} />
          <button className="inline-flex items-center gap-1.5 justify-center rounded-full bg-ink px-5 py-2.5 text-sm text-snow transition-colors hover:bg-cobalt sm:col-span-2">
            <Plus className="size-4" strokeWidth={2} /> Καταχώρηση (επιβεβαιωμένο)
          </button>
        </form>
      </details>

      {appts.length === 0 && (
        <p className="rounded-2xl border border-stone bg-snow p-8 text-center text-ink-muted">
          Δεν υπάρχουν ραντεβού ακόμα.
        </p>
      )}

      <ul className="space-y-3">
        {appts.map((a) => {
          const st = STATUS[a.status] ?? STATUS.pending;
          return (
            <li key={a.id} className="rounded-2xl border border-stone bg-snow p-5">
              <div className="lg:flex lg:items-center lg:justify-between lg:gap-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="display text-lg text-ink">{fmt(a.starts_at)}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
                      <Clock className="size-3.5" strokeWidth={1.5} /> {a.duration_min}′
                    </span>
                    {a.price_eur ? (
                      <span className="text-xs font-medium text-ink-muted">€{a.price_eur}</span>
                    ) : null}
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
                  {a.admin_note && (
                    <p className="mt-1 text-sm text-orange-700">Σημείωση: {a.admin_note}</p>
                  )}
                </div>

                <div className="mt-4 flex shrink-0 flex-wrap gap-2 lg:mt-0">
                  {(a.status === "pending" || a.status === "rescheduled") && (
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
              </div>

              {/* Edit / reschedule */}
              {a.status !== "cancelled" && a.status !== "done" && (
                <details className="mt-3 border-t border-stone pt-3">
                  <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm text-ink-muted hover:text-cobalt">
                    <Pencil className="size-3.5" strokeWidth={1.5} /> Τροποποίηση ώρας / διάρκειας + σχόλιο
                  </summary>
                  <form action={editAppt} className="mt-3 grid gap-2 sm:grid-cols-2">
                    <input type="hidden" name="id" value={a.id} />
                    <div className="flex gap-2">
                      <input
                        type="date"
                        name="date"
                        defaultValue={athensDate(a.starts_at)}
                        className={`${fieldCls} flex-1`}
                      />
                      <input
                        type="time"
                        name="time"
                        defaultValue={athensTime(a.starts_at)}
                        className={`${fieldCls} w-28`}
                      />
                    </div>
                    <select name="duration" defaultValue={String(a.duration_min)} className={fieldCls}>
                      <option value="30">30′ · 50€</option>
                      <option value="60">60′ · 100€</option>
                    </select>
                    <select name="area" defaultValue={a.area} className={fieldCls}>
                      {AREAS.map((ar) => (
                        <option key={ar} value={ar}>
                          {ar}
                        </option>
                      ))}
                    </select>
                    <input
                      name="comment"
                      defaultValue={a.admin_note ?? ""}
                      placeholder="Σχόλιο προς ασθενή (π.χ. προτείνω 19:00)"
                      className={fieldCls}
                    />
                    <button className="inline-flex items-center justify-center gap-1.5 rounded-full bg-cobalt px-4 py-2 text-sm text-snow transition-colors hover:bg-azure sm:col-span-2">
                      <Pencil className="size-3.5" strokeWidth={2} /> Αποθήκευση & ειδοποίηση ασθενή
                    </button>
                  </form>
                </details>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
