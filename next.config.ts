import type { NextConfig } from "next";

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
};

export default nextConfig;
