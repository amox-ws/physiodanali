import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

// Enables Next.js Draft Mode so an admin can preview an unpublished article
// exactly as it will look live, WITHOUT publishing it. ?locale=en lands on the
// English page — previewing the translation was previously impossible. Admin-gated: only a
// logged-in allowlisted user can turn draft mode on, so drafts never leak.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const slug = searchParams.get("slug");
  // ?locale=en previews the English page; anything else previews the Greek.
  const locale = searchParams.get("locale") === "en" ? "en" : "el";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdminEmail(user?.email)) {
    return NextResponse.redirect(`${origin}/admin/login`);
  }
  if (!slug) return NextResponse.redirect(`${origin}/admin`);

  (await draftMode()).enable();
  redirect(locale === "en" ? `/en/articles/${slug}` : `/articles/${slug}`);
}
