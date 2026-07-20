import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { conditions } from "@/lib/content";
import { getPublishedSlugs } from "@/lib/articles";

type Freq = "weekly" | "monthly" | "yearly";

// Marketing routes that exist in BOTH languages (el at root, en at /en/...).
// These are what international clients search ("physiotherapist Glyfada").
const BILINGUAL: { path: string; priority: number; changeFrequency: Freq }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/therapies", priority: 0.95, changeFrequency: "monthly" },
  { path: "/chiropractic", priority: 0.9, changeFrequency: "monthly" },
  { path: "/lymphatic", priority: 0.9, changeFrequency: "monthly" },
  { path: "/clinical-pilates", priority: 0.9, changeFrequency: "monthly" },
  { path: "/home-care", priority: 0.95, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/physiotherapy-glyfada", priority: 0.9, changeFrequency: "monthly" },
  { path: "/physiotherapy-voula", priority: 0.9, changeFrequency: "monthly" },
  { path: "/physiotherapy-vari", priority: 0.9, changeFrequency: "monthly" },
  { path: "/physiotherapy-vouliagmeni", priority: 0.9, changeFrequency: "monthly" },
  { path: "/chiropractic-glyfada", priority: 0.9, changeFrequency: "monthly" },
  { path: "/chiropractic-vari", priority: 0.9, changeFrequency: "monthly" },
  { path: "/chiropractic-vouliagmeni", priority: 0.9, changeFrequency: "monthly" },
  { path: "/reviews", priority: 0.85, changeFrequency: "monthly" },
  ...Object.keys(conditions).map((slug) => ({
    path: `/${slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as Freq,
  })),
];

// Greek-only routes (legal + the blog, which is Greek).
const EL_ONLY: { path: string; priority: number; changeFrequency: Freq }[] = [
  { path: "/articles", priority: 0.8, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const enUrl = (p: string) => `${SITE_URL}/en${p === "/" ? "" : p}`;

  const bilingual: MetadataRoute.Sitemap = BILINGUAL.flatMap(
    ({ path, priority, changeFrequency }) => {
      const languages = { el: `${SITE_URL}${path}`, en: enUrl(path) };
      const common = {
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages },
      };
      return [
        { url: `${SITE_URL}${path}`, ...common },
        { url: enUrl(path), ...common },
      ];
    },
  );

  const elOnly: MetadataRoute.Sitemap = EL_ONLY.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    priority: r.priority,
    changeFrequency: r.changeFrequency,
  }));

  const slugs = await getPublishedSlugs();
  const articleRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/articles/${slug}`,
    lastModified: now,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...bilingual, ...elOnly, ...articleRoutes];
}
