import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { areaPages, articles, conditions } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1.0, changeFrequency: "weekly" },
    { url: `${SITE_URL}/therapies`, priority: 0.95, changeFrequency: "monthly" },
    {
      url: `${SITE_URL}/chiropractic`,
      priority: 0.9,
      changeFrequency: "monthly",
    },
    { url: `${SITE_URL}/kyphosis`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${SITE_URL}/lymphatic`, priority: 0.9, changeFrequency: "monthly" },
    {
      url: `${SITE_URL}/clinical-pilates`,
      priority: 0.9,
      changeFrequency: "monthly",
    },
    { url: `${SITE_URL}/home-care`, priority: 0.95, changeFrequency: "monthly" },
    { url: `${SITE_URL}/about`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${SITE_URL}/articles`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${SITE_URL}/contact`, priority: 0.8, changeFrequency: "monthly" },
  ].map((r) => ({ ...r, lastModified: now }));

  const conditionRoutes: MetadataRoute.Sitemap = Object.keys(conditions).map(
    (slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: now,
      priority: 0.85,
      changeFrequency: "monthly",
    }),
  );

  const areaRoutes: MetadataRoute.Sitemap = Object.keys(areaPages).map(
    (slug) => ({
      url: `${SITE_URL}/home-care/${slug}`,
      lastModified: now,
      priority: 0.75,
      changeFrequency: "monthly",
    }),
  );

  const articleRoutes: MetadataRoute.Sitemap = articles.posts.map((p) => ({
    url: `${SITE_URL}/articles/${p.slug}`,
    lastModified: now,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [
    ...staticRoutes,
    ...conditionRoutes,
    ...areaRoutes,
    ...articleRoutes,
  ];
}
