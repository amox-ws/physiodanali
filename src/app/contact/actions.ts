"use server";

import "server-only";
import { verifyTurnstile } from "@/lib/turnstile";

/**
 * Contact-form backend. Sends the message via Resend to the practice (with a
 * cc to AMOX), using the already-verified amox.gr sender. reply_to is the
 * visitor's own address so a reply goes straight back to them.
 *
 * Recipients are env-overridable but default to the agreed targets:
 *   CONTACT_NOTIFY_TO → info@physiodanali.gr   (the practice gets its leads)
 *   CONTACT_NOTIFY_CC → info@amox.gr           (AMOX copy for support)
 * Requires RESEND_API_KEY; without it we return an error (never a fake success)
 * so the UI can show the phone fallback instead of silently dropping the lead.
 */

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  company?: string; // honeypot — real users leave it empty
  token?: string; // Cloudflare Turnstile token
};

export type ContactResult = { ok: true } | { ok: false; error: string };

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function sendContactMessage(
  input: ContactInput,
): Promise<ContactResult> {
  // Honeypot: a filled hidden field means a bot. Accept silently (don't tip it
  // off) but send nothing.
  if (input.company && input.company.trim() !== "") {
    return { ok: true };
  }

  const name = (input.name || "").trim();
  const email = (input.email || "").trim();
  const phone = (input.phone || "").trim();
  const message = (input.message || "").trim();

  if (!input.consent) return { ok: false, error: "consent" };
  if (!name || !email || !phone || !message) return { ok: false, error: "missing" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "email" };
  if (message.length > 5000) return { ok: false, error: "too_long" };

  // Captcha (graceful: passes through when Turnstile isn't configured).
  if (!(await verifyTurnstile(input.token))) return { ok: false, error: "captcha" };

  const key = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFY_FROM || "PhysioDanali <noreply@amox.gr>";
  const to = process.env.CONTACT_NOTIFY_TO || "info@physiodanali.gr";
  const cc = process.env.CONTACT_NOTIFY_CC || "info@amox.gr";

  if (!key) {
    console.error("[contact] RESEND_API_KEY not set — message NOT sent", {
      name,
      email,
      phone,
    });
    return { ok: false, error: "server" };
  }

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;color:#111">
      <p style="font-size:13px;color:#4a5a72;text-transform:uppercase;letter-spacing:.08em;margin:0 0 12px">
        Νέο μήνυμα από τη φόρμα επικοινωνίας
      </p>
      <table style="border-collapse:collapse;font-size:15px;line-height:1.6">
        <tr><td style="padding:2px 12px 2px 0;color:#4a5a72">Όνομα</td><td><strong>${esc(name)}</strong></td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#4a5a72">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#4a5a72">Τηλέφωνο</td><td><a href="tel:${esc(phone)}">${esc(phone)}</a></td></tr>
      </table>
      <p style="margin:16px 0 6px;color:#4a5a72;font-size:13px">Μήνυμα</p>
      <div style="white-space:pre-wrap;font-size:15px;line-height:1.6;border-left:3px solid #1e4d8b;padding:4px 0 4px 14px">${esc(message)}</div>
      <p style="margin-top:20px;color:#8a97a8;font-size:12px">Απάντησε απευθείας σε αυτό το email για να απαντήσεις στον ενδιαφερόμενο.</p>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        cc,
        reply_to: email,
        subject: `Νέο μήνυμα από τη φόρμα — ${name}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      return { ok: false, error: "server" };
    }
    return { ok: true };
  } catch (e) {
    console.error("[contact] send failed", e);
    return { ok: false, error: "server" };
  }
}
