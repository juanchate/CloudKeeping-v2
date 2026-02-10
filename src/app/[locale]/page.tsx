import { isValidLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
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

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const d = getDictionary(locale as Locale);

  return (
    <>
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
