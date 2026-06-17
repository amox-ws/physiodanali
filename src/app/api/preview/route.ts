import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

// Enables Next.js Draft Mode so an admin can preview an unpublished article
// exactly as it will look live, WITHOUT publishing it. Admin-gated: only a
// logged-in allowlisted user can turn draft mode on, so drafts never leak.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const slug = searchParams.get("slug");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdminEmail(user?.email)) {
    return NextResponse.redirect(`${origin}/admin/login`);
  }
  if (!slug) return NextResponse.redirect(`${origin}/admin`);

  (await draftMode()).enable();
  redirect(`/articles/${slug}`);
}
