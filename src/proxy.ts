import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy-session";

// Next 16: the former `middleware` convention, renamed to `proxy`.
//
// Responsibilities:
//  1. English SEO — serve the EN site on crawlable `/en/*` URLs by rewriting to
//     the real route and signalling locale via the `x-locale` header (so
//     getLocale resolves EN without a cookie → Googlebot indexes English).
//  2. Expose the canonical path via `x-pathname` so the layout can emit correct
//     hreflang / canonical for both languages.
//  3. Keep guarding /admin (Supabase session refresh).
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. English locale routing: /en/about → render /about with locale=en.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const stripped = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
    const url = request.nextUrl.clone();
    url.pathname = stripped;
    const headers = new Headers(request.headers);
    headers.set("x-locale", "en");
    headers.set("x-pathname", stripped);
    const res = NextResponse.rewrite(url, { request: { headers } });
    // Keep in-session navigation in English even on unprefixed links.
    res.cookies.set("locale", "en", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return res;
  }

  // 2. Admin guard (unchanged behaviour).
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return updateSession(request);
  }

  // 3. Greek (or cookie-based) routes — just expose the path for hreflang.
  const headers = new Headers(request.headers);
  headers.set("x-pathname", pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  // Run on all pages (for /en routing + hreflang), excluding api, _next and
  // any path with a file extension (static assets, sitemap.xml, og images…).
  matcher: ["/((?!api|_next|.*\\.).*)"],
};
