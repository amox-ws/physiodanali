import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { conditions } from "@/lib/content";
import { getPublishedSlugs } from "@/lib/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    { url: `${SITE_URL}/privacy`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${SITE_URL}/cookies`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${SITE_URL}/terms`, priority: 0.3, changeFrequency: "yearly" },
  ].map((r) => ({ ...r, lastModified: now })) as MetadataRoute.Sitemap;

  const conditionRoutes: MetadataRoute.Sitemap = Object.keys(conditions).map(
    (slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: now,
      priority: 0.85,
      changeFrequency: "monthly",
    }),
  );

  const slugs = await getPublishedSlugs();
  const articleRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/articles/${slug}`,
    lastModified: now,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...conditionRoutes, ...articleRoutes];
}
