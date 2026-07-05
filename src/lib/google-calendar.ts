import "server-only";
import { createSign } from "crypto";

// One-way Google Calendar sync via a SERVICE ACCOUNT (the practitioner shares
// his calendar with the service-account email). Confirmed appointments become
// calendar events on his phone. Graceful no-op until the env is configured.
//
// Env: GOOGLE_SA_EMAIL, GOOGLE_SA_PRIVATE_KEY (PEM, \n-escaped), GOOGLE_CALENDAR_ID.

// Full calendar scope: events (write) + freeBusy (read, for two-way sync).
const SCOPE = "https://www.googleapis.com/auth/calendar";

function creds() {
  const email = process.env.GOOGLE_SA_EMAIL;
  const key = process.env.GOOGLE_SA_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!email || !key || !calendarId) return null;
  return { email, key, calendarId };
}

const b64url = (input: Buffer | string) =>
  Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function accessToken(email: string, key: string): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(
    JSON.stringify({
      iss: email,
      scope: SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  signer.end();
  const jwt = `${header}.${claim}.${b64url(signer.sign(key))}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) return null;
  const j = (await res.json()) as { access_token?: string };
  return j.access_token ?? null;
}

export type CalEvent = {
  serviceName: string;
  startUtc: string;
  durationMin: number;
  area: string;
  address?: string | null;
  patientName: string;
  patientPhone: string;
  notes?: string | null;
};

/** Create a calendar event for a confirmed appointment. Returns event id or null. */
export async function createCalendarEvent(a: CalEvent): Promise<string | null> {
  const c = creds();
  if (!c) return null;
  try {
    const token = await accessToken(c.email, c.key);
    if (!token) return null;
    const end = new Date(new Date(a.startUtc).getTime() + a.durationMin * 60000).toISOString();
    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(c.calendarId)}/events`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: `${a.serviceName} — ${a.patientName}`,
          location: `${a.area}${a.address ? `, ${a.address}` : ""}`,
          description: `Τηλ: ${a.patientPhone}${a.notes ? `\n${a.notes}` : ""}`,
          start: { dateTime: a.startUtc, timeZone: "Europe/Athens" },
          end: { dateTime: end, timeZone: "Europe/Athens" },
        }),
      },
    );
    if (!res.ok) return null;
    const j = (await res.json()) as { id?: string };
    return j.id ?? null;
  } catch {
    return null;
  }
}

/** Update an existing event's time/details (on reschedule). Returns id or null. */
export async function updateCalendarEvent(
  eventId: string,
  a: CalEvent,
): Promise<string | null> {
  const c = creds();
  if (!c || !eventId) return null;
  try {
    const token = await accessToken(c.email, c.key);
    if (!token) return null;
    const end = new Date(new Date(a.startUtc).getTime() + a.durationMin * 60000).toISOString();
    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(c.calendarId)}/events/${eventId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: `${a.serviceName} — ${a.patientName}`,
          location: `${a.area}${a.address ? `, ${a.address}` : ""}`,
          description: `Τηλ: ${a.patientPhone}${a.notes ? `\n${a.notes}` : ""}`,
          start: { dateTime: a.startUtc, timeZone: "Europe/Athens" },
          end: { dateTime: end, timeZone: "Europe/Athens" },
        }),
      },
    );
    return res.ok ? eventId : null;
  } catch {
    return null;
  }
}

/**
 * Two-way sync: read the practitioner's busy intervals in [startUtc, endUtc)
 * so the availability engine can also block time he booked directly in Google
 * (not through the site). Empty array when unconfigured or on any error, so it
 * can only ever remove slots — never crash availability.
 */
export async function getBusyTimes(
  startUtc: string,
  endUtc: string,
): Promise<{ start: string; end: string }[]> {
  const c = creds();
  if (!c) return [];
  try {
    const token = await accessToken(c.email, c.key);
    if (!token) return [];
    const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        timeMin: startUtc,
        timeMax: endUtc,
        items: [{ id: c.calendarId }],
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const j = (await res.json()) as {
      calendars?: Record<string, { busy?: { start: string; end: string }[] }>;
    };
    return j.calendars?.[c.calendarId]?.busy ?? [];
  } catch {
    return [];
  }
}

/** Delete a calendar event (on cancel). */
export async function deleteCalendarEvent(eventId: string): Promise<void> {
  const c = creds();
  if (!c || !eventId) return;
  try {
    const token = await accessToken(c.email, c.key);
    if (!token) return;
    await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(c.calendarId)}/events/${eventId}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
    );
  } catch {
    /* ignore */
  }
}
