"use client";

import { useEffect, useRef, useState, useTransition } from "react";
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
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Athens",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(Date.now() + offsetDays * 86400000));
}

// Module-level (stable identity) — defining this inside the form caused a full
// remount on every keystroke, which stole focus and jumped the scroll.
function StepSection({
  n,
  title,
  done,
  children,
}: {
  n: number;
  title: string;
  done?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-stone py-6 first:border-t-0 first:pt-0">
      <div className="mb-4 flex items-center gap-3">
        <span
          className={`flex size-7 items-center justify-center rounded-full text-xs font-medium ${
            done ? "bg-cobalt text-snow" : "bg-stone text-ink-muted"
          }`}
        >
          {done ? <Check className="size-4" strokeWidth={2.5} /> : n}
        </span>
        <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-ink-muted">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-stone bg-snow px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-cobalt";

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
    consent: false,
  });
  const [loadingSlots, startSlots] = useTransition();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  // On success, bring the confirmation into view (no jarring jump).
  useEffect(() => {
    if (status === "success") {
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

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
        ref={rootRef}
        initial={{ opacity: 0, y: 12 }}
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

  const ready = service && area && slot;

  return (
    <div ref={rootRef} className="scroll-mt-28">
      <form
        onSubmit={onSubmit}
        className="rounded-[28px] border border-stone bg-porcelain p-6 lg:p-10"
      >
        {/* 1. Service */}
        <StepSection n={1} title="Υπηρεσία" done={!!service}>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setService(s);
                  loadSlots(date, area, s);
                }}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  service?.id === s.id
                    ? "border-cobalt bg-snow shadow-sm"
                    : "border-stone bg-snow/60 hover:border-cobalt/40"
                }`}
              >
                <span className="block text-base font-medium text-ink">{s.name}</span>
                <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-ink-muted">
                  <Clock className="size-3.5" strokeWidth={1.5} /> {s.duration_min}′
                </span>
              </button>
            ))}
          </div>
        </StepSection>

        {/* 2. Area */}
        <StepSection n={2} title="Περιοχή" done={!!area}>
          <div className="flex flex-wrap gap-2">
            {AREAS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => {
                  setArea(a);
                  loadSlots(date, a, service);
                }}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-all ${
                  area === a
                    ? "border-cobalt bg-cobalt text-snow"
                    : "border-stone bg-snow text-ink hover:border-cobalt/40"
                }`}
              >
                <MapPin className="size-3.5" strokeWidth={1.5} /> {a}
              </button>
            ))}
          </div>
        </StepSection>

        {/* 3. Date + slots */}
        <StepSection n={3} title="Ημέρα & ώρα" done={!!slot}>
          <input
            type="date"
            min={todayAthens(0)}
            max={todayAthens(horizonDays)}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              loadSlots(e.target.value, area, service);
            }}
            className={`${inputCls} sm:w-auto`}
          />
          {(!service || !area || !date) && (
            <p className="mt-3 text-sm text-ink-muted">
              Διαλέξτε υπηρεσία, περιοχή και ημέρα για να δείτε ώρες.
            </p>
          )}
          {service && area && date && (
            <div className="mt-4 min-h-[2.5rem]">
              {loadingSlots ? (
                <p className="text-sm text-ink-muted">Φόρτωση διαθέσιμων ωρών…</p>
              ) : slots && slots.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {slots.map((s) => (
                    <button
                      key={s.startUtc}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={`rounded-full border px-4 py-2 text-sm transition-all ${
                        slot?.startUtc === s.startUtc
                          ? "border-cobalt bg-cobalt text-snow"
                          : "border-stone bg-snow text-ink hover:border-cobalt/40"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-ink-muted">
                  Δεν υπάρχουν διαθέσιμες ώρες αυτή την ημέρα. Δοκιμάστε άλλη.
                </p>
              )}
            </div>
          )}
        </StepSection>

        {/* 4. Details — always rendered once a slot is chosen (no remounts) */}
        {slot && (
          <StepSection n={4} title="Τα στοιχεία σας">
            {/* Selection summary */}
            <div className="mb-5 rounded-xl border border-cobalt/20 bg-cobalt/5 px-4 py-3 text-sm text-ink">
              <strong>{service?.name}</strong> · {area} · {slot.label}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Ονοματεπώνυμο*"
                autoComplete="name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className={inputCls}
              />
              <input
                required
                type="tel"
                placeholder="Τηλέφωνο*"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputCls}
              />
              <input
                type="email"
                placeholder="Email (για επιβεβαίωση)"
                autoComplete="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className={inputCls}
              />
              <input
                placeholder="Διεύθυνση (για το κατ' οίκον)"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                className={inputCls}
              />
              <textarea
                placeholder="Σύντομη περιγραφή του προβλήματος"
                rows={3}
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                className={`${inputCls} resize-none sm:col-span-2`}
              />
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                required
                checked={form.consent}
                onChange={(e) => set("consent", e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-cobalt"
              />
              <span className="text-xs leading-relaxed text-ink-muted">
                Αποδέχομαι την επεξεργασία των στοιχείων μου για το ραντεβού, σύμφωνα με την{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cobalt underline underline-offset-2"
                >
                  Πολιτική Απορρήτου
                </a>
                .
              </span>
            </label>

            {status === "error" && <p className="mt-3 text-sm text-red-600">{errMsg}</p>}

            <button
              type="submit"
              disabled={status === "submitting" || !ready || !form.consent}
              className="group mt-5 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium text-snow transition-all hover:bg-cobalt disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Αποστολή…" : "Αίτημα ραντεβού"}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </button>
            <p className="mt-3 text-xs text-ink-muted">
              Το ραντεβού επιβεβαιώνεται από τον φυσικοθεραπευτή — θα ειδοποιηθείτε.
            </p>
          </StepSection>
        )}
      </form>
    </div>
  );
}
