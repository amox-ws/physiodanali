// Daily booking reminders — run by .github/workflows/booking-reminders.yml.
// Emails patients a reminder ~24h before their CONFIRMED appointment, with a
// self-service cancel link. Plain Node/tsx (no "server-only", no @/ aliases).
//
// Window: [now+12h, now+36h] — 24h wide, so a once-a-day run reminds every
// appointment exactly once (contiguous windows, no gaps/overlaps), without a
// `reminded_at` column.
//
// Env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY,
//      NOTIFY_FROM?, SITE_URL?, CRON_SECRET (must match the app's BOOKING/CRON
//      secret so the cancel token verifies). DRY_RUN=1 → log only.

import { createClient } from "@supabase/supabase-js";
import { createHmac } from "crypto";

function need(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

const SECRET = process.env.BOOKING_SECRET || process.env.CRON_SECRET || "physiodanali-dev";
const SITE = process.env.SITE_URL || "https://physiodanali.vercel.app";
const FROM = process.env.NOTIFY_FROM || "PhysioDanali <noreply@amox.gr>";

const cancelToken = (id: string) =>
  createHmac("sha256", SECRET).update(`cancel:${id}`).digest("hex").slice(0, 32);
const manageUrl = (id: string) => `${SITE}/booking/manage?id=${id}&t=${cancelToken(id)}`;

const fmt = (iso: string) =>
  new Intl.DateTimeFormat("el-GR", {
    timeZone: "Europe/Athens",
    weekday: "long",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

type Row = {
  id: string;
  service_name: string;
  patient_name: string;
  patient_email: string | null;
  area: string;
  address: string | null;
  starts_at: string;
};

async function main() {
  const sb = createClient(
    need("NEXT_PUBLIC_SUPABASE_URL"),
    need("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } },
  );

  const now = Date.now();
  const from = new Date(now + 12 * 3600 * 1000).toISOString();
  const to = new Date(now + 36 * 3600 * 1000).toISOString();

  const { data, error } = await sb
    .from("booking_appointments")
    .select("id,service_name,patient_name,patient_email,area,address,starts_at")
    .eq("status", "confirmed")
    .gte("starts_at", from)
    .lte("starts_at", to);
  if (error) throw new Error(error.message);

  const rows = (data ?? []) as Row[];
  const withEmail = rows.filter((r) => r.patient_email);
  console.log(`[reminders] ${rows.length} confirmed in window, ${withEmail.length} with email`);

  const dry = process.env.DRY_RUN === "1";
  const key = process.env.RESEND_API_KEY;
  let sent = 0;

  for (const r of withEmail) {
    if (dry || !key) {
      console.log(`[dry] would remind ${r.patient_email} — ${fmt(r.starts_at)}`);
      continue;
    }
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: FROM,
          to: r.patient_email,
          subject: `Υπενθύμιση ραντεβού — ${fmt(r.starts_at)}`,
          html: `<h2>Υπενθύμιση ραντεβού</h2>
                 <p>Γεια σας ${r.patient_name}, σας υπενθυμίζουμε το ραντεβού σας:</p>
                 <p><strong>${r.service_name}</strong><br>${fmt(r.starts_at)}<br>Περιοχή: ${r.area}${r.address ? `<br>${r.address}` : ""}</p>
                 <p>Αν χρειαστεί να το <strong>ακυρώσετε</strong>: <a href="${manageUrl(r.id)}">εδώ</a>. Για αλλαγή ώρας καλέστε <a href="tel:+306944344342">+30 6944 344 342</a>.</p>
                 <p>— PhysioDanali</p>`,
        }),
      });
      sent++;
    } catch (e) {
      console.error(`[reminders] failed for ${r.id}`, e);
    }
  }
  console.log(`[reminders] sent ${sent}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("Reminders failed:", e instanceof Error ? e.message : e);
    process.exit(1);
  });
