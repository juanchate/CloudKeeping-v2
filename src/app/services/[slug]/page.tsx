import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { LinkButton } from "@/components/ui/LinkButton";
import { CTAStrip } from "@/components/sections/CTAStrip";
import { services } from "@/lib/content";
import { SITE_NAME } from "@/lib/constants";
import { Check } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: `${service.title} Services`,
    description: service.description,
    openGraph: {
      title: `${service.title} Services | ${SITE_NAME}`,
      description: service.shortDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services.filter((s) => s.slug !== slug);

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-surface to-white py-12 lg:py-16">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />

          <div className="flex items-start gap-5">
            <div className="shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/8 text-accent">
              <Icon name={service.icon as IconName} className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {service.title}
              </h1>
              <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What's Included */}
      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-6">
                What&apos;s Included
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {service.included.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-accent/10">
                      <Check className="h-3 w-3 text-accent" />
                    </div>
                    <span className="text-sm text-muted leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Who It's For */}
              <div className="mt-12">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-4">
                  Who It&apos;s For
                </h2>
                <div className="rounded-2xl border border-border/60 bg-surface p-6">
                  <p className="text-muted leading-relaxed">
                    {service.whoItsFor}
                  </p>
                </div>
              </div>

              {/* Key Outcomes */}
              <div className="mt-12">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-6">
                  Key Outcomes
                </h2>
                <div className="grid gap-6 sm:grid-cols-3">
                  {service.outcomes.map((outcome) => (
                    <Card key={outcome.title} className="text-center">
                      <CardTitle className="mb-2">{outcome.title}</CardTitle>
                      <CardDescription>{outcome.description}</CardDescription>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* CTA Card */}
                <Card className="relative overflow-hidden bg-primary p-8 text-center border-0">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Get Started with {service.title}
                  </h3>
                  <p className="text-white/50 text-sm mb-6">
                    Book a free consultation to discuss your needs.
                  </p>
                  <LinkButton
                    href="/contact"
                    variant="primary"
                    size="md"
                    trackLabel={`Service Detail - ${service.title} CTA`}
                    className="w-full"
                  >
                    Book a Consultation
                  </LinkButton>
                </Card>

                {/* Related Services */}
                <Card>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted mb-4">
                    Other Services
                  </h3>
                  <ul className="space-y-2">
                    {relatedServices.map((related) => (
                      <li key={related.slug}>
                        <Link
                          href={`/services/${related.slug}`}
                          className="flex items-center gap-3 rounded-xl p-2.5 -mx-2.5 text-sm text-muted transition-colors hover:text-foreground hover:bg-surface"
                        >
                          <Icon
                            name={related.icon as IconName}
                            className="h-4 w-4 shrink-0 text-accent"
                          />
                          {related.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTAStrip
        title={`Ready to Get Started with ${service.title}?`}
        subtitle="Let's discuss how we can support your business."
      />
    </>
  );
}
