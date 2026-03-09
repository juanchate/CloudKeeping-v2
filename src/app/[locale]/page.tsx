import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { createPageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyCloudKeeping } from "@/components/sections/WhyCloudKeeping";
import { Stats } from "@/components/sections/Stats";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQPreview } from "@/components/sections/FAQPreview";
import { CTAStrip } from "@/components/sections/CTAStrip";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const d = getDictionary(locale as Locale);
  return createPageMetadata({
    locale: locale as Locale,
    path: "",
    title: d.metadata.title,
    description: d.metadata.description,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const d = getDictionary(locale as Locale);

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: String(d.testimonials.items.length),
      bestRating: "5",
      worstRating: "1",
    },
    review: d.testimonials.items.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
      reviewBody: t.quote,
      publisher: { "@type": "Organization", name: t.company },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <Hero content={d.hero} locale={locale} />
      <ServicesOverview content={d.servicesSection} services={d.services} locale={locale} />
      <WhyCloudKeeping content={d.whyUs} />
      <Stats content={d.stats} />
      <HowItWorks content={d.howItWorks} />
      <Testimonials content={d.testimonials} />
      <FAQPreview content={d.faq} locale={locale} />
      <CTAStrip title={d.cta.title} subtitle={d.cta.subtitle} ctaText={d.cta.button} ctaHref={`/${locale}/contact`} />
    </>
  );
}
