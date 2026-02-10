import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

const SITE_URL = process.env.SITE_URL || "https://cloudkeeping.cpa";

export default function sitemap(): MetadataRoute.Sitemap {
  const en = getDictionary("en");
  const staticPaths = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/faq", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy", priority: 0.3 },
  ];

  const servicePaths = en.services.map((s) => ({
    path: `/services/${s.slug}`,
    priority: 0.8,
  }));

  const allPaths = [...staticPaths, ...servicePaths];

  return locales.flatMap((locale) =>
    allPaths.map((p) => ({
      url: `${SITE_URL}/${locale}${p.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p.priority,
    }))
  );
}
