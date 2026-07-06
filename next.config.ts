import type { NextConfig } from "next";
import { legacyRedirects } from "./src/lib/legacy-redirects";

// Security headers applied to every response. These are safe, high-value
// defaults with zero risk of breaking the app.
//
// NOTE on CSP: a full Content-Security-Policy is intentionally NOT enforced
// here yet. This app uses Next's inline hydration runtime, framer-motion +
// three.js (inline styles, blob workers) and Supabase — a strict CSP needs
// per-request nonces and careful testing to avoid breaking the site. Enable
// it as a hardening follow-up. A starting template:
//   default-src 'self';
//   script-src 'self' 'unsafe-inline';
//   style-src 'self' 'unsafe-inline';
//   img-src 'self' data: blob: https:;
//   connect-src 'self' https://*.supabase.co;
//   font-src 'self' data:; frame-ancestors 'self';
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Supabase Storage — cover images for articles created via the CMS.
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
    // Allow SVG sources (e.g. /apta-transparent.svg). All SVGs are
    // local, vetted, and served from /public, so the usual XSS risk
    // of arbitrary remote SVGs does not apply here.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Legacy 301s from the old static site (SEO migration — docs/seo-migration-plan.md).
  // Lives HERE, not in src/proxy.ts: the proxy matcher excludes dotted paths
  // (*.html), so legacy redirects placed there would never fire. Each mapping
  // expands to .html + extensionless (old Apache MultiViews served both) and a
  // lowercase variant for mixed-case slugs (matching is case-sensitive).
  // permanent: true → 308, equivalent to 301 for search engines. These rules
  // must never be removed (NFC cards, indexed URLs, old backlinks).
  async redirects() {
    const seen = new Set<string>();
    const rules: { source: string; destination: string; permanent: true }[] = [];
    const add = (source: string, destination: string) => {
      if (source === destination || seen.has(source)) return;
      seen.add(source);
      rules.push({ source, destination, permanent: true });
    };

    for (const { old, target } of legacyRedirects) {
      add(old, target);
      if (old.endsWith(".html")) add(old.slice(0, -5), target);
      const lower = old.toLowerCase();
      if (lower !== old) {
        add(lower, target);
        if (lower.endsWith(".html")) add(lower.slice(0, -5), target);
      }
    }

    // Old language roots + old XML sitemaps (→ legacy sitemap so Google
    // re-crawls every old URL and discovers the 301s fast).
    add("/el", "/");
    add("/en/index-eng", "/en");
    add("/el/sitemap-gr.xml", "/sitemap-legacy.xml");
    add("/en/sitemap-eng.xml", "/sitemap-legacy.xml");

    return rules;
  },
};

export default nextConfig;
