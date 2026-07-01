import "server-only";
import { createHmac } from "crypto";
import { createServiceClient } from "@/lib/supabase/service";
import { createCalendarEvent, deleteCalendarEvent } from "@/lib/google-calendar";

// ─────────────────────────────────────────────────────────────────────
// Booking data access + availability engine (home-visit physiotherapy).
// Server-only: every call uses the SERVICE-ROLE client (RLS denies anon).
// Times are computed in Europe/Athens wall-clock and stored as UTC timestamptz.
// ─────────────────────────────────────────────────────────────────────

const TZ = "Europe/Athens";
const SLOT_STEP_MIN = 15; // granularity of offered start times

export type BookingService = {
  id: string;
  slug: string;
  name: string;
  duration_min: number;
  description: string | null;
  sort: number;
};

export type BookingSettings = {
  travel_buffer_min: number;
  min_notice_hours: number;
  booking_horizon_days: number;
  mode: "request" | "instant";
  deposit_enabled: boolean;
  deposit_amount: number;
};

export type Slot = { startUtc: string; label: string }; // ISO + "HH:MM"

export type NewAppointment = {
  serviceId: string;
  serviceName: string;
  durationMin: number;
  area: string;
  startUtc: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  address?: string;
  notes?: string;
  firstVisit?: boolean;
};

export type Appointment = {
  id: string;
  service_name: string;
  patient_name: string;
  patient_phone: string;
  patient_email: string | null;
  area: string;
  address: string | null;
  notes: string | null;
  first_visit: boolean | null;
  starts_at: string;
  duration_min: number;
  status: string;
  created_at: string;
};

// ── Timezone helpers (no date lib) ────────────────────────────────────
/** Minutes Athens is ahead of UTC at instant `d` (handles EET/EEST). */
function athensOffsetMin(d: Date): number {
  const name = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    timeZoneName: "shortOffset",
  })
    .formatToParts(d)
    .find((p) => p.type === "timeZoneName")?.value;
  const m = name?.match(/GMT([+-]\d+)(?::(\d+))?/);
  if (!m) return 120;
  return parseInt(m[1], 10) * 60 + (m[1].startsWith("-") ? -1 : 1) * (m[2] ? parseInt(m[2], 10) : 0);
}

/** Athens wall-clock (date=YYYY-MM-DD, hour, min) → UTC Date. */
function athensToUtc(date: string, hour: number, min: number): Date {
  const naive = new Date(
    `${date}T${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}:00Z`,
  );
  return new Date(naive.getTime() - athensOffsetMin(naive) * 60000);
}

/** UTC Date → "HH:MM" in Athens. */
function athensLabel(d: Date): string {
  return new Intl.DateTimeFormat("el-GR", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

/** Weekday (0=Sun..6=Sat) of an Athens date string. */
function athensWeekday(date: string): number {
  // noon avoids DST edge issues
  const d = athensToUtc(date, 12, 0);
  const wd = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" }).format(d);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd);
}

function hhmmToMin(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

// ── Reads ─────────────────────────────────────────────────────────────
export async function getServices(): Promise<BookingService[]> {
  const db = createServiceClient();
  const { data, error } = await db
    .from("booking_services")
    .select("id,slug,name,duration_min,description,sort")
    .eq("active", true)
    .order("sort");
  if (error) throw error;
  return (data ?? []) as BookingService[];
}

export async function getSettings(): Promise<BookingSettings> {
  const db = createServiceClient();
  const { data } = await db
    .from("booking_settings")
    .select(
      "travel_buffer_min,min_notice_hours,booking_horizon_days,mode,deposit_enabled,deposit_amount",
    )
    .eq("id", 1)
    .maybeSingle();
  return (
    (data as BookingSettings) ?? {
      travel_buffer_min: 30,
      min_notice_hours: 4,
      booking_horizon_days: 30,
      mode: "request",
      deposit_enabled: false,
      deposit_amount: 15,
    }
  );
}

/**
 * Free start-times for a service on a given Athens date.
 * Subtracts: existing appointments (± travel buffer), time-off, min-notice.
 * Respects weekly hours and optional area-day rules.
 */
export async function getAvailableSlots(opts: {
  durationMin: number;
  area: string;
  date: string; // YYYY-MM-DD (Athens)
}): Promise<Slot[]> {
  const db = createServiceClient();
  const settings = await getSettings();
  const weekday = athensWeekday(opts.date);

  // Weekly windows for this weekday + area (null area = all areas).
  const { data: rules } = await db
    .from("booking_availability")
    .select("start_time,end_time,area")
    .eq("weekday", weekday)
    .eq("active", true);
  const windows = (rules ?? []).filter(
    (r) => r.area == null || r.area === opts.area,
  );
  if (windows.length === 0) return [];

  // Day bounds (UTC) to fetch overlapping appointments + time-off.
  const dayStart = athensToUtc(opts.date, 0, 0);
  const dayEnd = new Date(dayStart.getTime() + 24 * 3600 * 1000);

  const [{ data: appts }, { data: offs }] = await Promise.all([
    db
      .from("booking_appointments")
      .select("starts_at,duration_min,area")
      .neq("status", "cancelled")
      .gte("starts_at", new Date(dayStart.getTime() - 6 * 3600 * 1000).toISOString())
      .lte("starts_at", dayEnd.toISOString()),
    db
      .from("booking_time_off")
      .select("starts_at,ends_at")
      .lt("starts_at", dayEnd.toISOString())
      .gt("ends_at", dayStart.toISOString()),
  ]);

  // Area-aware travel buffer: same area = half the buffer, different area = full.
  const crossBuf = settings.travel_buffer_min * 60000;
  const sameBuf = Math.round(settings.travel_buffer_min / 2) * 60000;
  const dur = opts.durationMin * 60000;
  const minBookable = Date.now() + settings.min_notice_hours * 3600 * 1000;

  const booked = (appts ?? []).map((a) => ({
    s: new Date(a.starts_at).getTime(),
    e: new Date(a.starts_at).getTime() + a.duration_min * 60000,
    sameArea: a.area === opts.area,
  }));
  const timeoff = (offs ?? []).map((o) => ({
    s: new Date(o.starts_at).getTime(),
    e: new Date(o.ends_at).getTime(),
  }));

  const slots: Slot[] = [];
  for (const w of windows) {
    const winStart = hhmmToMin(w.start_time);
    const winEnd = hhmmToMin(w.end_time);
    for (let m = winStart; m + opts.durationMin <= winEnd; m += SLOT_STEP_MIN) {
      const start = athensToUtc(opts.date, Math.floor(m / 60), m % 60);
      const s = start.getTime();
      const e = s + dur;
      if (s < minBookable) continue;
      // area-aware travel-buffer conflict with any booked visit
      const clash = booked.some((b) => {
        const buf = b.sameArea ? sameBuf : crossBuf;
        return s < b.e + buf && e + buf > b.s;
      });
      if (clash) continue;
      // time-off overlap
      const off = timeoff.some((o) => s < o.e && e > o.s);
      if (off) continue;
      slots.push({ startUtc: start.toISOString(), label: athensLabel(start) });
    }
  }
  // de-dupe (overlapping windows) + sort
  const seen = new Set<string>();
  return slots
    .filter((x) => (seen.has(x.startUtc) ? false : seen.add(x.startUtc)))
    .sort((a, b) => a.startUtc.localeCompare(b.startUtc));
}

// ── Writes ────────────────────────────────────────────────────────────
export async function createAppointment(a: NewAppointment): Promise<{ id: string }> {
  const db = createServiceClient();
  const { data, error } = await db
    .from("booking_appointments")
    .insert({
      service_id: a.serviceId,
      service_name: a.serviceName,
      duration_min: a.durationMin,
      area: a.area,
      starts_at: a.startUtc,
      patient_name: a.patientName,
      patient_phone: a.patientPhone,
      patient_email: a.patientEmail ?? null,
      address: a.address ?? null,
      notes: a.notes ?? null,
      first_visit: a.firstVisit ?? true,
      status: "pending",
    })
    .select("id")
    .single();
  if (error) throw error;
  return { id: data.id as string };
}

// ── Admin ─────────────────────────────────────────────────────────────
export async function listAppointments(): Promise<Appointment[]> {
  const db = createServiceClient();
  const { data, error } = await db
    .from("booking_appointments")
    .select("*")
    .gte("starts_at", new Date(Date.now() - 24 * 3600 * 1000).toISOString())
    .order("starts_at");
  if (error) throw error;
  return (data ?? []) as Appointment[];
}

// Email the patient when the practice confirms or cancels (best-effort).
async function emailPatientStatus(a: Appointment, status: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !a.patient_email) return;
  const from = process.env.NOTIFY_FROM || "PhysioDanali <noreply@amox.gr>";
  const when = new Intl.DateTimeFormat("el-GR", {
    timeZone: "Europe/Athens",
    weekday: "long",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(a.starts_at));

  let subject: string;
  let html: string;
  if (status === "confirmed") {
    subject = `Επιβεβαίωση ραντεβού — ${when}`;
    html = `<h2>Το ραντεβού σας επιβεβαιώθηκε ✓</h2>
      <p><strong>${a.service_name}</strong><br>${when}<br>Περιοχή: ${a.area}</p>
      <p>Τα λέμε εκεί! Αν χρειαστεί να ακυρώσετε: <a href="${bookingManageUrl(a.id)}">εδώ</a>. Τηλέφωνο: <a href="tel:+306944344342">+30 6944 344 342</a>.</p>
      <p>— PhysioDanali</p>`;
  } else if (status === "cancelled") {
    subject = `Ακύρωση ραντεβού — ${when}`;
    html = `<h2>Το ραντεβού σας ακυρώθηκε</h2>
      <p>${a.service_name} — ${when}</p>
      <p>Λυπούμαστε για την αναστάτωση. Για νέο ραντεβού καλέστε <a href="tel:+306944344342">+30 6944 344 342</a> ή κλείστε online.</p>
      <p>— PhysioDanali</p>`;
  } else {
    return;
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: a.patient_email, subject, html }),
  }).catch(() => {});
}

export async function setAppointmentStatus(id: string, status: string): Promise<void> {
  const db = createServiceClient();
  const { data: a } = await db.from("booking_appointments").select("*").eq("id", id).maybeSingle();
  if (!a) return;
  const patch: Record<string, unknown> = { status };

  // Google Calendar sync (no-op without creds).
  if (status === "confirmed" && !a.gcal_event_id) {
    const eventId = await createCalendarEvent({
      serviceName: a.service_name,
      startUtc: a.starts_at,
      durationMin: a.duration_min,
      area: a.area,
      address: a.address,
      patientName: a.patient_name,
      patientPhone: a.patient_phone,
      notes: a.notes,
    });
    if (eventId) patch.gcal_event_id = eventId;
  }
  if (status === "cancelled" && a.gcal_event_id) {
    await deleteCalendarEvent(a.gcal_event_id);
    patch.gcal_event_id = null;
  }

  const { error } = await db.from("booking_appointments").update(patch).eq("id", id);
  if (error) throw error;
  await emailPatientStatus(a as Appointment, status);
}

// ── Self-service cancel (signed link, no auth) ────────────────────────
const BOOKING_SECRET =
  process.env.BOOKING_SECRET || process.env.CRON_SECRET || "physiodanali-dev";

/** Tamper-proof token for a patient cancel/manage link (no login needed). */
export function cancelToken(id: string): string {
  return createHmac("sha256", BOOKING_SECRET).update(`cancel:${id}`).digest("hex").slice(0, 32);
}

/** Full URL the patient gets in emails to manage their appointment. */
export function bookingManageUrl(id: string): string {
  const site = process.env.SITE_URL || "https://physiodanali.vercel.app";
  return `${site}/booking/manage?id=${id}&t=${cancelToken(id)}`;
}

/** Fetch an appointment for the manage page — only with a valid token. */
export async function getAppointmentByToken(
  id: string,
  token: string,
): Promise<Appointment | null> {
  if (!id || token !== cancelToken(id)) return null;
  const db = createServiceClient();
  const { data } = await db.from("booking_appointments").select("*").eq("id", id).maybeSingle();
  return (data as Appointment) ?? null;
}

/** Patient self-cancel via token (only pending/confirmed). */
export async function cancelByToken(id: string, token: string): Promise<boolean> {
  if (!id || token !== cancelToken(id)) return false;
  const db = createServiceClient();
  const { data: a } = await db
    .from("booking_appointments")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!a) return false;
  if (a.gcal_event_id) await deleteCalendarEvent(a.gcal_event_id);
  const { error } = await db
    .from("booking_appointments")
    .update({ status: "cancelled", gcal_event_id: null })
    .eq("id", id)
    .in("status", ["pending", "confirmed"]);
  if (error) return false;

  // Notify the practice that the patient cancelled (best-effort).
  const key = process.env.RESEND_API_KEY;
  if (key) {
    const appt = a as Appointment;
    const when = new Intl.DateTimeFormat("el-GR", {
      timeZone: "Europe/Athens",
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(appt.starts_at));
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM || "PhysioDanali <noreply@amox.gr>",
        to: process.env.BOOKING_NOTIFY_TO || process.env.NOTIFY_TO || "info@amox.gr",
        subject: `Ακύρωση από ασθενή — ${appt.patient_name} (${when})`,
        html: `<p>Ο/Η <strong>${appt.patient_name}</strong> ακύρωσε το ραντεβού:</p><p>${appt.service_name} — ${when} · ${appt.area}</p>`,
      }),
    }).catch(() => {});
  }
  return true;
}

// ── Deposit (Viva) ────────────────────────────────────────────────────
export async function getAppointment(id: string): Promise<Appointment | null> {
  const db = createServiceClient();
  const { data } = await db.from("booking_appointments").select("*").eq("id", id).maybeSingle();
  return (data as Appointment) ?? null;
}

/** Attach a Viva order to an appointment (deposit pending). */
export async function setDepositOrder(id: string, orderCode: string, amount: number): Promise<void> {
  const db = createServiceClient();
  await db
    .from("booking_appointments")
    .update({ viva_order_code: orderCode, deposit_status: "pending", deposit_amount: amount })
    .eq("id", id);
}

/** Mark deposit paid after a verified Viva transaction. */
export async function markDepositPaidByOrder(orderCode: string): Promise<boolean> {
  const db = createServiceClient();
  const { data, error } = await db
    .from("booking_appointments")
    .update({ deposit_status: "paid" })
    .eq("viva_order_code", orderCode)
    .select("id")
    .maybeSingle();
  return !error && !!data;
}
