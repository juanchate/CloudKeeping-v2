import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { CALCULATORS, ARTICLES } from "@/lib/tools-data";

const SITE_URL = process.env.SITE_URL || "https://cloudkeeping.cpa";

export default function sitemap(): MetadataRoute.Sitemap {
  const en = getDictionary("en");
  const staticPaths = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/tools", priority: 0.9 },
    { path: "/tools/dashboard", priority: 0.8 },
    { path: "/tools/articles", priority: 0.8 },
    { path: "/cra-authorization", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/faq", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy", priority: 0.3 },
  ];

  const servicePaths = en.services.map((s) => ({
    path: `/services/${s.slug}`,
    priority: 0.8,
  }));

  const calculatorPaths = CALCULATORS.map((c) => ({
    path: `/tools/calculators/${c.slug}`,
    priority: 0.7,
  }));

  const articlePaths = ARTICLES.map((a) => ({
    path: `/tools/articles/${a.slug}`,
    priority: 0.7,
  }));

  const allPaths = [...staticPaths, ...servicePaths, ...calculatorPaths, ...articlePaths];

  return locales.flatMap((locale) =>
    allPaths.map((p) => ({
      url: `${SITE_URL}/${locale}${p.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p.priority,
    }))
  );
}
