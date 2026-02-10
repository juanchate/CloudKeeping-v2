import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CTAStrip } from "@/components/sections/CTAStrip";
import { services } from "@/lib/content";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore CloudKeeping's comprehensive accounting services: bookkeeping, tax management & planning, payroll, and accounting & consulting for SMBs in British Columbia.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface to-white py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Our Services
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              From day-to-day bookkeeping to strategic tax planning, we provide
              the financial services your business needs to stay compliant, save
              time, and grow with confidence.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-24 lg:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group"
              >
                <Card hover className="h-full p-8 transition-all group-hover:border-accent/25">
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/8 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                      <Icon
                        name={service.icon as IconName}
                        className="h-6 w-6"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold tracking-tight text-foreground mb-2">
                        {service.title}
                      </h2>
                      <p className="text-muted leading-relaxed mb-4 text-sm">
                        {service.shortDescription}
                      </p>

                      <ul className="space-y-2 mb-5">
                        {service.included.slice(0, 3).map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-muted"
                          >
                            <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-accent-dark">
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTAStrip />
    </>
  );
}
