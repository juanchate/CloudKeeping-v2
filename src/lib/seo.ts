import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

/**
 * Generate consistent, per-page SEO metadata including
 * canonical URL, hreflang alternates, Open Graph, and Twitter cards.
 */
export function createPageMetadata({
  locale,
  path = "",
  title,
  description,
  ogType = "website",
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  ogType?: "website" | "article";
}): Metadata {
  const otherLocale = locale === "en" ? "es" : "en";
  const pageUrl = `${SITE_URL}/${locale}${path}`;
  const enUrl = `${SITE_URL}/en${path}`;
  const esUrl = `${SITE_URL}/es${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        en: enUrl,
        es: esUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      type: ogType,
      locale: locale === "es" ? "es_ES" : "en_CA",
      alternateLocale: otherLocale === "es" ? "es_ES" : "en_CA",
      url: pageUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: `${SITE_URL}/images/og-default.png`,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/images/og-default.png`],
    },
  };
}
