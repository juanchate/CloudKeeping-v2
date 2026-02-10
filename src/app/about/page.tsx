import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { CTAStrip } from "@/components/sections/CTAStrip";
import { aboutContent } from "@/lib/content";
import { Target, Shield, Eye, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about CloudKeeping — our story, values, and approach to delivering professional accounting, bookkeeping, and tax services for businesses in British Columbia.",
};

const valueIcons = [Target, Shield, Eye, Headphones];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface to-white py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About CloudKeeping
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Professional financial services built on accuracy, transparency,
              and a commitment to your success.
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>{aboutContent.story}</p>
              <p>{aboutContent.storyExtended}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-surface py-20 lg:py-24">
        <Container>
          <SectionHeading
            title="Our Values"
            subtitle="The principles that guide every engagement and every decision."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutContent.values.map((value, index) => {
              const IconComponent = valueIcons[index];
              return (
                <Card key={value.title} className="text-center">
                  <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-center mb-2">
                    {value.title}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {value.description}
                  </CardDescription>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Differentiators */}
      <section className="py-20 lg:py-24">
        <Container>
          <SectionHeading
            title="What Sets Us Apart"
            subtitle="The CloudKeeping difference."
          />

          <div className="grid gap-8 lg:grid-cols-3">
            {aboutContent.differentiators.map((diff, index) => (
              <div key={diff.title} className="relative pl-8">
                <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {diff.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {diff.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTAStrip
        title="Let's Work Together"
        subtitle="We'd love to learn about your business and discuss how we can help."
      />
    </>
  );
}
