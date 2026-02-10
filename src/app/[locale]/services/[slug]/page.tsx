import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { LinkButton } from "@/components/ui/LinkButton";
import { CTAStrip } from "@/components/sections/CTAStrip";
import { isValidLocale, locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { createPageMetadata } from "@/lib/seo";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { Check } from "lucide-react";

interface Props { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  const en = getDictionary("en");
  return locales.flatMap((locale) =>
    en.services.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const d = getDictionary(locale as Locale);
  const service = d.services.find((s) => s.slug === slug);
  if (!service) return {};

  const meta = createPageMetadata({
    locale: locale as Locale,
    path: `/services/${slug}`,
    title: service.title,
    description: service.shortDescription,
  });

  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      title: `${service.title} | ${SITE_NAME}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const d = getDictionary(locale as Locale);
  const sp = d.servicesPage;
  const service = d.services.find((s) => s.slug === slug);
  if (!service) notFound();
  const related = d.services.filter((s) => s.slug !== slug);

  // Service structured data
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "ProfessionalService",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: { "@type": "State", name: "British Columbia" },
    url: `${SITE_URL}/${locale}/services/${slug}`,
    inLanguage: locale,
  };

  // Breadcrumb structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: d.nav.home, item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: d.nav.services, item: `${SITE_URL}/${locale}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${SITE_URL}/${locale}/services/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="bg-gradient-to-b from-surface to-white py-12 lg:py-16">
        <Container>
          <Breadcrumb items={[{ label: d.nav.home, href: `/${locale}` }, { label: d.nav.services, href: `/${locale}/services` }, { label: service.title }]} />
          <div className="flex items-start gap-5">
            <div className="shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/8 text-accent">
              <Icon name={service.icon as IconName} className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">{service.title}</h1>
              <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">{service.description}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-6">{sp.whatsIncluded}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {service.included.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-accent/10"><Check className="h-3 w-3 text-accent" /></div>
                    <span className="text-sm text-muted leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-4">{sp.whoItsFor}</h2>
                <div className="rounded-2xl border border-border/60 bg-surface p-6"><p className="text-muted leading-relaxed">{service.whoItsFor}</p></div>
              </div>
              <div className="mt-12">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-6">{sp.keyOutcomes}</h2>
                <div className="grid gap-6 sm:grid-cols-3">
                  {service.outcomes.map((o) => (<Card key={o.title} className="text-center"><CardTitle className="mb-2">{o.title}</CardTitle><CardDescription>{o.description}</CardDescription></Card>))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <Card className="relative overflow-hidden bg-primary p-8 text-center border-0">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
                  <h3 className="text-lg font-semibold text-white mb-2">{sp.getStartedWith} {service.title}</h3>
                  <p className="text-white/50 text-sm mb-6">{sp.bookConsultationSub}</p>
                  <LinkButton href={`/${locale}/contact`} variant="primary" size="md" trackLabel={`Service - ${service.title} CTA`} className="w-full">{sp.bookConsultation}</LinkButton>
                </Card>
                <Card>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted mb-4">{sp.otherServices}</h3>
                  <ul className="space-y-2">
                    {related.map((r) => (
                      <li key={r.slug}><Link href={`/${locale}/services/${r.slug}`} className="flex items-center gap-3 rounded-xl p-2.5 -mx-2.5 text-sm text-muted transition-colors hover:text-foreground hover:bg-surface">
                        <Icon name={r.icon as IconName} className="h-4 w-4 shrink-0 text-accent" />{r.title}
                      </Link></li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTAStrip title={`${sp.readyWith} ${service.title}?`} subtitle={sp.readyWithSub} ctaText={sp.bookConsultation} ctaHref={`/${locale}/contact`} />
    </>
  );
}
