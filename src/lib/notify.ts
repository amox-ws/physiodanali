import "server-only";
import { SITE_URL } from "@/lib/seo";
import { ADMIN_EMAILS } from "@/lib/admin";

/**
 * Emails the owner when a new AI draft is ready for review (Phase 6).
 * Uses Resend. No-ops (and never throws) if RESEND_API_KEY is unset, so it
 * can't break the generation cron.
 */
export async function notifyNewDraft(draft: { id: string; title: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[notify] RESEND_API_KEY not set — skipping email");
    return;
  }
  const to = process.env.NOTIFY_TO || "info@physiodanali.gr";
  const cc = process.env.NOTIFY_CC || "info@amox.gr";
  const from = process.env.NOTIFY_FROM || "PhysioDanali <onboarding@resend.dev>";
  const reviewUrl = `${SITE_URL}/admin/articles/${draft.id}`;

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
        subject: `Νέο άρθρο για έλεγχο: ${draft.title}`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:520px">
            <p>Ένα νέο άρθρο δημιουργήθηκε αυτόματα και περιμένει τον έλεγχό σας.</p>
            <p style="font-size:18px;font-weight:600">${draft.title}</p>
            <p><a href="${reviewUrl}" style="display:inline-block;background:#1e4d8b;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none">Έλεγχος &amp; δημοσίευση →</a></p>
            <p style="color:#4a5a72;font-size:13px">Το άρθρο παραμένει προσχέδιο μέχρι να το εγκρίνετε.</p>
          </div>`,
      }),
    });
    if (!res.ok) {
      console.error("[notify] Resend error", res.status, await res.text());
    }
  } catch (e) {
    console.error("[notify] failed", e);
  }
}
