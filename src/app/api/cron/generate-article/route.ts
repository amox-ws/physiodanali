import { NextResponse } from "next/server";
import { generateAndInsertArticle } from "@/lib/generate-article";

// Manual/Pro AI generation endpoint. On the Vercel Hobby plan, functions are
// capped at 60s but generation takes ~150s, so the WEEKLY job runs in GitHub
// Actions instead (.github/workflows/weekly-article.yml). This route stays for
// manual triggering on Pro: Authorization: Bearer $CRON_SECRET. Never publishes.

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Hobby plan max; full generation runs in CI

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

async function handle(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await generateAndInsertArticle();
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export const GET = handle;
export const POST = handle;
