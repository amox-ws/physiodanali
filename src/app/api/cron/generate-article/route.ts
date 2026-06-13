import { NextResponse } from "next/server";
import { generateAndInsertArticle } from "@/lib/generate-article";

// Weekly AI generation endpoint (Phase 5). Trigger from a scheduler (Railway
// cron / Vercel cron / GitHub Action) with: Authorization: Bearer $CRON_SECRET
// It generates ONE article as a draft and notifies (Phase 6). Never publishes.

export const dynamic = "force-dynamic";
export const maxDuration = 300; // generation can take ~30-90s

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
