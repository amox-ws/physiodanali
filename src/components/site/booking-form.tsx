"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, MapPin } from "lucide-react";
import { site } from "@/lib/content";
import { slotsAction, submitBookingAction } from "@/app/booking/actions";
import type { Slot } from "@/lib/booking";

type Service = {
  id: string;
  name: string;
  duration_min: number;
  description: string | null;
};

const AREAS = ["Γλυφάδα", "Βούλα", "Βουλιαγμένη", "Βάρη", "Άλιμο"];

function todayAthens(offsetDays = 0): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Athens",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(Date.now() + offsetDays * 86400000));
  return parts; // YYYY-MM-DD
}

export function BookingForm({
  services,
  horizonDays = 30,
}: {
  services: Service[];
  horizonDays?: number;
}) {
  const [service, setService] = useState<Service | null>(null);
  const [area, setArea] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    firstVisit: true,
    consent: false,
  });
  const [loadingSlots, startSlots] = useTransition();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  function loadSlots(nextDate: string, nextArea: string, svc: Service | null) {
    setSlot(null);
    if (!nextDate || !nextArea || !svc) {
      setSlots(null);
      return;
    }
    startSlots(async () => {
      const s = await slotsAction({
        serviceId: svc.id,
        serviceName: svc.name,
        durationMin: svc.duration_min,
        area: nextArea,
        date: nextDate,
      });
      setSlots(s);
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!service || !slot || !form.consent) return;
    setStatus("submitting");
    const res = await submitBookingAction({
      serviceId: service.id,
      serviceName: service.name,
      durationMin: service.duration_min,
      area,
      startUtc: slot.startUtc,
      date,
      patientName: form.name,
      patientPhone: form.phone,
      patientEmail: form.email || undefined,
      address: form.address || undefined,
      notes: form.notes || undefined,
      firstVisit: form.firstVisit,
      consent: form.consent,
    });
    if (res.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrMsg(
        res.error === "taken"
          ? "Η ώρα μόλις κλείστηκε — διαλέξτε άλλη."
          : res.error === "consent"
            ? "Παρακαλώ αποδεχθείτε την επεξεργασία δεδομένων."
            : "Κάτι πήγε στραβά. Δοκιμάστε ξανά ή καλέστε μας.",
      );
      if (res.error === "taken") loadSlots(date, area, service);
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-5 rounded-[24px] border border-cobalt/20 bg-cobalt/5 p-8 lg:p-10"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-cobalt/10">
          <Check className="size-6 text-cobalt" strokeWidth={2} />
        </span>
        <h3 className="display text-3xl leading-tight tracking-tight text-ink">
          Λάβαμε το αίτημά σας!
        </h3>
        <p className="max-w-[46ch] text-base leading-relaxed text-ink-muted">
          Θα επικοινωνήσουμε σύντομα για <strong>επιβεβαίωση</strong> του ραντεβού.
          Για άμεση εξυπηρέτηση καλέστε{" "}
          <a href={`tel:${site.phone}`} className="text-cobalt underline-offset-4 hover:underline">
            {site.phoneDisplay}
          </a>
          .
        </p>
      </motion.div>
    );
  }

  const Section = ({ n, title, children, done }: { n: number; title: string; children: React.ReactNode; done?: boolean }) => (
    <div className="border-t border-stone py-6 first:border-t-0 first:pt-0">
      <div className="mb-4 flex items-center gap-3">
        <span className={`flex size-7 items-center justify-center rounded-full text-xs font-medium ${done ? "bg-cobalt text-snow" : "bg-stone text-ink-muted"}`}>
          {done ? <Check className="size-4" strokeWidth={2.5} /> : n}
        </span>
        <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-ink-muted">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] border border-stone bg-porcelain p-6 lg:p-10">
      {/* 1. Service */}
      <Section n={1} title="Υπηρεσία" done={!!service}>
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => { setService(s); loadSlots(date, area, s); }}
              className={`rounded-2xl border p-4 text-left transition-all ${service?.id === s.id ? "border-cobalt bg-snow shadow-sm" : "border-stone bg-snow/60 hover:border-cobalt/40"}`}
            >
              <span className="block text-base font-medium text-ink">{s.name}</span>
              <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-ink-muted">
                <Clock className="size-3.5" strokeWidth={1.5} /> {s.duration_min}′
              </span>
            </button>
          ))}
        </div>
      </Section>

      {/* 2. Area */}
      <Section n={2} title="Περιοχή" done={!!area}>
        <div className="flex flex-wrap gap-2">
          {AREAS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => { setArea(a); loadSlots(date, a, service); }}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-all ${area === a ? "border-cobalt bg-cobalt text-snow" : "border-stone bg-snow text-ink hover:border-cobalt/40"}`}
            >
              <MapPin className="size-3.5" strokeWidth={1.5} /> {a}
            </button>
          ))}
        </div>
      </Section>

      {/* 3. Date + slots */}
      <Section n={3} title="Ημέρα & ώρα" done={!!slot}>
        <input
          type="date"
          min={todayAthens(0)}
          max={todayAthens(horizonDays)}
          value={date}
          onChange={(e) => { setDate(e.target.value); loadSlots(e.target.value, area, service); }}
          className="w-full rounded-xl border border-stone bg-snow px-4 py-3 text-base text-ink outline-none focus:border-cobalt sm:w-auto"
        />
        {(!service || !area || !date) && (
          <p className="mt-3 text-sm text-ink-muted">Διαλέξτε υπηρεσία, περιοχή και ημέρα για να δείτε ώρες.</p>
        )}
        {service && area && date && (
          <div className="mt-4">
            {loadingSlots ? (
              <p className="text-sm text-ink-muted">Φόρτωση διαθέσιμων ωρών…</p>
            ) : slots && slots.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {slots.map((s) => (
                  <button
                    key={s.startUtc}
                    type="button"
                    onClick={() => setSlot(s)}
                    className={`rounded-full border px-4 py-2 text-sm transition-all ${slot?.startUtc === s.startUtc ? "border-cobalt bg-cobalt text-snow" : "border-stone bg-snow text-ink hover:border-cobalt/40"}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-ink-muted">Δεν υπάρχουν διαθέσιμες ώρες αυτή την ημέρα. Δοκιμάστε άλλη.</p>
            )}
          </div>
        )}
      </Section>

      {/* 4. Details */}
      {slot && (
        <Section n={4} title="Τα στοιχεία σας">
          <div className="grid gap-4 sm:grid-cols-2">
            <input required placeholder="Ονοματεπώνυμο*" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl border border-stone bg-snow px-4 py-3 text-base outline-none focus:border-cobalt" />
            <input required type="tel" placeholder="Τηλέφωνο*" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl border border-stone bg-snow px-4 py-3 text-base outline-none focus:border-cobalt" />
            <input type="email" placeholder="Email (για επιβεβαίωση)" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-xl border border-stone bg-snow px-4 py-3 text-base outline-none focus:border-cobalt" />
            <input placeholder="Διεύθυνση (για το κατ' οίκον)" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="rounded-xl border border-stone bg-snow px-4 py-3 text-base outline-none focus:border-cobalt" />
            <textarea placeholder="Σύντομη περιγραφή του προβλήματος" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="rounded-xl border border-stone bg-snow px-4 py-3 text-base outline-none focus:border-cobalt sm:col-span-2" />
          </div>

          <label className="mt-4 flex cursor-pointer items-start gap-3">
            <input type="checkbox" required checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-0.5 size-4 shrink-0 accent-cobalt" />
            <span className="text-xs leading-relaxed text-ink-muted">
              Αποδέχομαι την επεξεργασία των στοιχείων μου για το ραντεβού, σύμφωνα με την{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-cobalt underline underline-offset-2">Πολιτική Απορρήτου</a>.
            </span>
          </label>

          {status === "error" && <p className="mt-3 text-sm text-red-600">{errMsg}</p>}

          <button type="submit" disabled={status === "submitting" || !form.consent} className="group mt-5 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium text-snow transition-all hover:bg-cobalt disabled:cursor-not-allowed disabled:opacity-60">
            {status === "submitting" ? "Αποστολή…" : "Αίτημα ραντεβού"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </button>
          <p className="mt-3 text-xs text-ink-muted">Το ραντεβού επιβεβαιώνεται από τον φυσικοθεραπευτή — θα ειδοποιηθείτε.</p>
        </Section>
      )}
    </form>
  );
}
