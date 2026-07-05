"use server";

import {
  getAvailableSlots,
  createAppointment,
  getSettings,
  bookingManageUrl,
  getAppointment,
  setDepositOrder,
  type Slot,
} from "@/lib/booking";
import { createDepositCheckout, vivaConfigured } from "@/lib/viva";

// Public booking server actions (called from the client form).

export async function slotsAction(input: {
  serviceId: string;
  serviceName: string;
  durationMin: number;
  area: string;
  date: string;
}): Promise<Slot[]> {
  if (!input.area || !input.date || !input.durationMin) return [];
  return getAvailableSlots({
    durationMin: input.durationMin,
    area: input.area,
    date: input.date,
  });
}

export type BookingResult =
  | {
      ok: true;
      mode: "request" | "instant";
      id: string;
      deposit: { enabled: boolean; amount: number };
    }
  | { ok: false; error: string };

export async function submitBookingAction(input: {
  serviceId: string;
  serviceName: string;
  durationMin: number;
  priceEur?: number;
  area: string;
  startUtc: string;
  date: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  address?: string;
  notes?: string;
  firstVisit?: boolean;
  consent?: boolean;
}): Promise<BookingResult> {
  // Validation
  if (!input.consent) return { ok: false, error: "consent" };
  if (
    !input.serviceId ||
    !input.area ||
    !input.startUtc ||
    !input.patientName?.trim() ||
    !input.patientPhone?.trim()
  ) {
    return { ok: false, error: "missing" };
  }

  // Re-verify the slot is still free server-side (prevents double-booking).
  const slots = await getAvailableSlots({
    durationMin: input.durationMin,
    area: input.area,
    date: input.date,
  });
  if (!slots.some((s) => s.startUtc === input.startUtc)) {
    return { ok: false, error: "taken" };
  }

  const { id } = await createAppointment({
    serviceId: input.serviceId,
    serviceName: input.serviceName,
    durationMin: input.durationMin,
    priceEur: input.priceEur,
    area: input.area,
    startUtc: input.startUtc,
    patientName: input.patientName.trim(),
    patientPhone: input.patientPhone.trim(),
    patientEmail: input.patientEmail?.trim() || undefined,
    address: input.address?.trim() || undefined,
    notes: input.notes?.trim() || undefined,
    firstVisit: input.firstVisit,
  });

  const settings = await getSettings();
  await sendBookingEmails(input, id);
  return {
    ok: true,
    mode: settings.mode,
    id,
    deposit: {
      enabled: settings.deposit_enabled && vivaConfigured(),
      amount: settings.deposit_amount,
    },
  };
}

/** Optional: create a Viva deposit checkout for a just-created appointment. */
export async function startDepositAction(
  appointmentId: string,
): Promise<{ url: string } | { error: string }> {
  const appt = await getAppointment(appointmentId);
  if (!appt) return { error: "notfound" };
  const settings = await getSettings();
  if (!settings.deposit_enabled || !vivaConfigured()) return { error: "unavailable" };
  const checkout = await createDepositCheckout({
    amountEur: settings.deposit_amount,
    appointmentId,
    name: appt.patient_name,
    phone: appt.patient_phone,
    email: appt.patient_email ?? undefined,
  });
  if (!checkout) return { error: "viva" };
  await setDepositOrder(appointmentId, checkout.orderCode, settings.deposit_amount);
  return { url: checkout.url };
}

// ── Email (Resend, best-effort — never blocks the booking) ────────────
async function sendBookingEmails(
  input: {
    serviceName: string;
    durationMin?: number;
    priceEur?: number;
    area: string;
    startUtc: string;
    patientName: string;
    patientPhone: string;
    patientEmail?: string;
    address?: string;
    notes?: string;
  },
  id: string,
) {
  const priceLine = input.priceEur
    ? `<p><strong>Κόστος:</strong> €${input.priceEur}${
        input.durationMin ? ` (${input.durationMin}′)` : ""
      } — δεκτά μετρητά &amp; κάρτα</p>`
    : "";
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const from =
    process.env.NOTIFY_FROM || "PhysioDanali <noreply@amox.gr>";
  const when = new Intl.DateTimeFormat("el-GR", {
    timeZone: "Europe/Athens",
    weekday: "long",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(input.startUtc));

  const send = (to: string, subject: string, html: string) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, html }),
    }).catch(() => {});

  // 1) Notify the practice (owner inbox for now).
  const notifyTo = process.env.BOOKING_NOTIFY_TO || process.env.NOTIFY_TO || "info@amox.gr";
  await send(
    notifyTo,
    `Νέο αίτημα ραντεβού — ${input.patientName} (${when})`,
    `<h2>Νέο αίτημα ραντεβού</h2>
     <p><strong>${input.serviceName}</strong> — ${when}</p>
     ${priceLine}
     <p>Περιοχή: ${input.area}${input.address ? `<br>Διεύθυνση: ${input.address}` : ""}</p>
     <p>Ασθενής: ${input.patientName}<br>Τηλέφωνο: ${input.patientPhone}${input.patientEmail ? `<br>Email: ${input.patientEmail}` : ""}</p>
     ${input.notes ? `<p>Σημείωση: ${input.notes}</p>` : ""}
     <p>Έλεγχος/επιβεβαίωση στο <a href="https://physiodanali.vercel.app/admin">/admin</a>.</p>`,
  );

  // 2) Confirm to the patient (if they gave an email).
  if (input.patientEmail) {
    await send(
      input.patientEmail,
      `Λάβαμε το αίτημά σας — PhysioDanali`,
      `<h2>Ευχαριστούμε, ${input.patientName}!</h2>
       <p>Λάβαμε το αίτημα ραντεβού σας:</p>
       <p><strong>${input.serviceName}</strong><br>${when}<br>Περιοχή: ${input.area}</p>
       ${priceLine}
       <p>Θα επικοινωνήσουμε σύντομα για <strong>επιβεβαίωση</strong>. Για άμεση εξυπηρέτηση καλέστε <a href="tel:+306944344342">+30 6944 344 342</a>.</p>
       <p style="font-size:13px;color:#666">Διαχείριση / ακύρωση ραντεβού: <a href="${bookingManageUrl(id)}">εδώ</a>.</p>
       <p>— PhysioDanali</p>`,
    );
  }
}
