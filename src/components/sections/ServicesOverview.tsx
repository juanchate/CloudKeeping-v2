import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { services } from "@/lib/content";
import { ArrowRight } from "lucide-react";

export function ServicesOverview() {
  return (
    <section className="py-24 lg:py-28">
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
              <Card hover className="h-full transition-all group-hover:border-accent/25">
                <CardHeader>
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/8 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon
                      name={service.icon as IconName}
                      className="h-5 w-5"
                    />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardDescription>{service.shortDescription}</CardDescription>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors group-hover:text-accent-dark">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
