import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// AI answer/search crawlers explicitly welcomed (GEO visibility) — continues
// the old site's policy so LLMs (ChatGPT, Perplexity, Claude, Gemini) keep
// citing the practice. (docs/seo-migration-plan.md §7)
const AI_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-Web",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/sitemap-legacy.xml`],
    host: SITE_URL,
  };
}
