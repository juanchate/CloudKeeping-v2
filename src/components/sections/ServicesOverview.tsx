import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { services } from "@/lib/content";
import { ArrowRight } from "lucide-react";

export function ServicesOverview() {
  return (
    <section className="py-20 lg:py-24">
      <Container>
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive financial services tailored to the needs of growing businesses."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group"
            >
              <Card hover className="h-full transition-all group-hover:border-accent/30">
                <CardHeader>
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon
                      name={service.icon as IconName}
                      className="h-6 w-6"
                    />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardDescription>{service.shortDescription}</CardDescription>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors group-hover:text-accent-dark">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
