import type { MetadataRoute } from "next";
import { allProjects, hasDetailPage, projectHref, siteUrl } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/projects`, changeFrequency: "monthly", priority: 0.9 },
    ...allProjects.filter(hasDetailPage).map((p) => ({
      url: `${siteUrl}${projectHref(p)}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
