import type { NextConfig } from "next";

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
};

export default nextConfig;
