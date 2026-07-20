"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock, MapPin } from "lucide-react";
import { site } from "@/lib/content";
import { slotsAction, submitBookingAction, startDepositAction } from "@/app/booking/actions";
import type { Slot } from "@/lib/booking";
import { Turnstile, turnstileEnabled } from "@/components/site/turnstile";
import { useLocale } from "@/components/site/locale-provider";
import { localeHref } from "@/lib/i18n";
import { tBooking } from "@/lib/translations";

type Service = {
  id: string;
  slug: string;
  name: string;
  duration_min: number;
  description: string | null;
};

const AREAS = ["Γλυφάδα", "Βούλα", "Βουλιαγμένη", "Βάρη", "Άλιμο"];

// English display names for the DB service list (keyed by slug). The stored
// snapshot always uses the canonical Greek name, so the admin stays consistent.
const SERVICE_EN: Record<string, string> = {
  "home-care": "Home-visit physiotherapy",
  chiropractic: "Chiropractic",
  lymphatic: "Brazilian lymphatic drainage",
  "clinical-pilates": "Clinical Pilates",
  "neck-pain": "Neck pain",
  "low-back-pain": "Low-back pain",
  "hip-pain": "Hip pain",
};

// Every service is bookable at 30′ or 60′; price follows the duration.
const DURATIONS = [
  { min: 30, price: 50 },
  { min: 60, price: 100 },
] as const;
const priceFor = (min: number) => (min === 60 ? 100 : 50);

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
  const locale = useLocale();
  const tx = tBooking(locale);
  const areaLabel = (a: string) => tx.areas[AREAS.indexOf(a)] ?? a;
  const svcLabel = (s: Service) =>
    locale === "en" ? (SERVICE_EN[s.slug] ?? s.name) : s.name;
  const [service, setService] = useState<Service | null>(null);
  const [duration, setDuration] = useState<number>(60);
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
  const [booking, setBooking] = useState<{
    id: string;
    deposit: { enabled: boolean; amount: number };
  } | null>(null);
  const [depositLoading, setDepositLoading] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [hp, setHp] = useState(""); // honeypot — bots fill it, humans never see it
  const rootRef = useRef<HTMLDivElement>(null);
  const onToken = useCallback((t: string) => setCaptcha(t), []);

  async function payDeposit() {
    if (!booking) return;
    setDepositLoading(true);
    const res = await startDepositAction(booking.id);
    if ("url" in res) window.location.href = res.url;
    else setDepositLoading(false);
  }

  // On success, bring the confirmation into view (no jarring jump).
  useEffect(() => {
    if (status === "success") {
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  function loadSlots(
    nextDate: string,
    nextArea: string,
    svc: Service | null,
    dur: number = duration,
  ) {
    setSlot(null);
    if (!nextDate || !nextArea || !svc) {
      setSlots(null);
      return;
    }
    startSlots(async () => {
      const s = await slotsAction({
        serviceId: svc.id,
        serviceName: svc.name,
        durationMin: dur,
        area: nextArea,
        date: nextDate,
      });
      setSlots(s);
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!service || !slot || !form.consent) return;
    if (turnstileEnabled && !captcha) {
      setStatus("error");
      setErrMsg(tx.errIncomplete);
      return;
    }
    setStatus("submitting");
    const res = await submitBookingAction({
      serviceId: service.id,
      serviceName: service.name,
      durationMin: duration,
      priceEur: priceFor(duration),
      area,
      startUtc: slot.startUtc,
      date,
      patientName: form.name,
      patientPhone: form.phone,
      patientEmail: form.email || undefined,
      address: form.address || undefined,
      notes: form.notes || undefined,
      consent: form.consent,
      token: captcha,
      hp,
    });
    if (res.ok) {
      setBooking({ id: res.id, deposit: res.deposit });
      setStatus("success");
    } else {
      setStatus("error");
      setErrMsg(
        res.error === "taken"
          ? tx.errTaken
          : res.error === "consent"
            ? tx.errConsent
            : res.error === "captcha"
              ? tx.errCaptcha
              : tx.errGeneric,
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
          {tx.successTitle}
        </h3>
        <p className="max-w-[46ch] text-base leading-relaxed text-ink-muted">
          {tx.successPre}
          <strong>{tx.successBold}</strong>
          {tx.successMid}
          <a href={`tel:${site.phone}`} className="text-cobalt underline-offset-4 hover:underline">
            {site.phoneDisplay}
          </a>
          .
        </p>
        {booking?.deposit.enabled && (
          <button
            type="button"
            onClick={payDeposit}
            disabled={depositLoading}
            className="inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3 text-sm font-medium text-snow transition-colors hover:bg-azure disabled:opacity-60"
          >
            {depositLoading
              ? tx.depositLoading
              : `${tx.depositPre}${booking.deposit.amount}${tx.depositPost}`}
          </button>
        )}
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
        <StepSection n={1} title={tx.svc} done={!!service}>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setService(s);
                  loadSlots(date, area, s, duration);
                }}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  service?.id === s.id
                    ? "border-cobalt bg-snow shadow-sm"
                    : "border-stone bg-snow/60 hover:border-cobalt/40"
                }`}
              >
                <span className="block text-base font-medium text-ink">{svcLabel(s)}</span>
              </button>
            ))}
          </div>

          {/* Duration + price (every service is 30′ or 60′) */}
          {service && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-ink">{tx.duration}</p>
              <div className="flex flex-wrap gap-2">
                {DURATIONS.map((d) => (
                  <button
                    key={d.min}
                    type="button"
                    onClick={() => {
                      setDuration(d.min);
                      loadSlots(date, area, service, d.min);
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-all ${
                      duration === d.min
                        ? "border-cobalt bg-cobalt text-snow"
                        : "border-stone bg-snow text-ink hover:border-cobalt/40"
                    }`}
                  >
                    <Clock className="size-3.5" strokeWidth={1.5} /> {d.min}′ · €{d.price}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-ink-muted">{tx.cashCard}</p>
            </div>
          )}
        </StepSection>

        {/* 2. Area */}
        <StepSection n={2} title={tx.area} done={!!area}>
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
                <MapPin className="size-3.5" strokeWidth={1.5} /> {areaLabel(a)}
              </button>
            ))}
          </div>
        </StepSection>

        {/* 3. Date + slots */}
        <StepSection n={3} title={tx.dateTime} done={!!slot}>
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
            <p className="mt-3 text-sm text-ink-muted">{tx.pickAll}</p>
          )}
          {service && area && date && (
            <div className="mt-4 min-h-[2.5rem]">
              {loadingSlots ? (
                <p className="text-sm text-ink-muted">{tx.loading}</p>
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
                <p className="text-sm text-ink-muted">{tx.noSlots}</p>
              )}
            </div>
          )}
        </StepSection>

        {/* 4. Details — always rendered once a slot is chosen (no remounts) */}
        {slot && (
          <StepSection n={4} title={tx.details}>
            {/* Selection summary */}
            <div className="mb-5 rounded-xl border border-cobalt/20 bg-cobalt/5 px-4 py-3 text-sm text-ink">
              <strong>{service ? svcLabel(service) : ""}</strong> · {duration}′ · €
              {priceFor(duration)} · {areaLabel(area)} · {slot.label}
              <span className="mt-0.5 block text-xs text-ink-muted">{tx.cashCard}</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder={tx.name}
                autoComplete="name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className={inputCls}
              />
              <input
                required
                type="tel"
                placeholder={tx.phone}
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputCls}
              />
              <input
                type="email"
                placeholder={tx.email}
                autoComplete="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className={inputCls}
              />
              <input
                placeholder={tx.address}
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                className={inputCls}
              />
              <textarea
                placeholder={tx.notes}
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
                {tx.consentPre}
                <a
                  href={localeHref("/privacy", locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cobalt underline underline-offset-2"
                >
                  {tx.consentLink}
                </a>
                {tx.consentPost}
              </span>
            </label>

            {/* Honeypot — hidden from humans; bots that fill it are rejected. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            {/* Cloudflare Turnstile captcha (renders only when configured) */}
            <Turnstile onToken={onToken} />

            {status === "error" && <p className="mt-3 text-sm text-red-600">{errMsg}</p>}

            <button
              type="submit"
              disabled={status === "submitting" || !ready || !form.consent}
              className="group mt-5 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium text-snow transition-all hover:bg-cobalt disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? tx.submitting : tx.submit}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </button>
            <p className="mt-3 text-xs text-ink-muted">{tx.confirmNote}</p>
          </StepSection>
        )}
      </form>
    </div>
  );
}
