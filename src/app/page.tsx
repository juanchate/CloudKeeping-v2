import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyCloudKeeping } from "@/components/sections/WhyCloudKeeping";
import { Stats } from "@/components/sections/Stats";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQPreview } from "@/components/sections/FAQPreview";
import { CTAStrip } from "@/components/sections/CTAStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyCloudKeeping />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <FAQPreview />
      <CTAStrip />
    </>
  );
}
