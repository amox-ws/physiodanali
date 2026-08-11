"use server";

import { headers } from "next/headers";
import { createServiceClient } from "@/lib/supabase/service";
import { isAdminEmail } from "@/lib/admin";
import { SITE_URL } from "@/lib/seo";

type Result = { ok: true } | { ok: false; error: "notAllowed" | "send" };

/**
 * Emails an admin magic link WITHOUT using Supabase's built-in mailer.
 *
 * Why: Supabase's default email service is hard-limited to ~2 auth emails per
 * hour, which locked the client out of /admin (429 over_email_send_rate_limit).
 * Instead we generate the link server-side via the Admin API (no email, no
 * rate limit) and deliver it ourselves through Resend from the verified
 * amox.gr domain. The link lands on /admin/auth/callback?token_hash=…, which
 * verifies the OTP and sets the session cookie.
 */
export async function sendAdminLoginLink(email: string): Promise<Result> {
  const clean = email.trim().toLowerCase();
  if (!isAdminEmail(clean)) return { ok: false, error: "notAllowed" };

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error("[admin-login] RESEND_API_KEY not set — cannot email link");
    return { ok: false, error: "send" };
  }

  // Prefer the live origin (works on localhost + previews); fall back to prod.
  const h = await headers();
  const origin =
    h.get("origin") ??
    (h.get("host") ? `https://${h.get("host")}` : null) ??
    SITE_URL;

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email: clean,
    });
    const tokenHash = data?.properties?.hashed_token;
    if (error || !tokenHash) {
      console.error("[admin-login] generateLink failed", error);
      return { ok: false, error: "send" };
    }

    const link = `${origin}/admin/auth/callback?token_hash=${encodeURIComponent(
      tokenHash,
    )}&type=email&next=/admin`;

    const from =
      process.env.LOGIN_EMAIL_FROM ||
      process.env.NOTIFY_FROM ||
      "PhysioDanali <no-reply@amox.gr>";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: clean,
        subject: "Σύνδεση στη διαχείριση PhysioDanali",
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:520px">
            <p>Ζητήσατε σύνδεση στη διαχείριση του physiodanali.gr.</p>
            <p style="margin:24px 0">
              <a href="${link}" style="display:inline-block;background:#1e4d8b;color:#fff;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600">
                Σύνδεση στη διαχείριση →
              </a>
            </p>
            <p style="color:#4a5a72;font-size:13px">
              Ο σύνδεσμος είναι μίας χρήσης και λήγει σύντομα. Αν δεν ζητήσατε
              εσείς τη σύνδεση, αγνοήστε αυτό το email.
            </p>
          </div>`,
      }),
    });

    if (!res.ok) {
      console.error("[admin-login] Resend error", res.status, await res.text());
      return { ok: false, error: "send" };
    }
    return { ok: true };
  } catch (e) {
    console.error("[admin-login] unexpected", e);
    return { ok: false, error: "send" };
  }
}
