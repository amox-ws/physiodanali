import { legacyRedirects } from "@/lib/legacy-redirects";
import { SITE_URL } from "@/lib/seo";

// Legacy sitemap — lists the OLD site's URLs (which now 301 to their new
// homes) so Google re-visits each one quickly after cutover and transfers the
// equity in weeks instead of months. Submitted to GSC alongside the real
// sitemap.xml on launch day; remove ~6 months after the migration settles.
// (docs/seo-migration-plan.md §5.9)

export const dynamic = "force-static";

export function GET(): Response {
  const urls = legacyRedirects
    .map(({ old }) => `  <url><loc>${SITE_URL}${old}</loc></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
