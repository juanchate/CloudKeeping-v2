import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { CTAStrip } from "@/components/sections/CTAStrip";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { Target, Shield, Eye, Headphones } from "lucide-react";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const d = getDictionary(locale as Locale);
  return { title: d.about.pageTitle, description: d.about.pageSubtitle };
}

const valueIcons = [Target, Shield, Eye, Headphones];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const d = getDictionary(locale as Locale);
  const a = d.about;

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-16 lg:py-20">
        <Container><div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{a.pageTitle}</h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">{a.pageSubtitle}</p>
        </div></Container>
      </section>

      <section className="py-24 lg:py-28">
        <Container><div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-6">{a.storyTitle}</h2>
          <div className="space-y-4 text-muted leading-relaxed"><p>{a.story}</p><p>{a.storyExtended}</p></div>
        </div></Container>
      </section>

      <section className="bg-surface py-24 lg:py-28">
        <Container>
          <SectionHeading title={a.valuesHeading} subtitle={a.valuesSubheading} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {a.values.map((v, i) => { const Ic = valueIcons[i]; return (
              <Card key={v.title} className="text-center">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/8 text-accent"><Ic className="h-5 w-5" /></div>
                <CardTitle className="text-center mb-2">{v.title}</CardTitle>
                <CardDescription className="text-center">{v.description}</CardDescription>
              </Card>
            ); })}
          </div>
        </Container>
      </section>

      <section className="py-24 lg:py-28">
        <Container>
          <SectionHeading title={a.diffHeading} subtitle={a.diffSubheading} />
          <div className="grid gap-10 lg:grid-cols-3">
            {a.differentiators.map((diff, i) => (
              <div key={diff.title} className="relative pl-10">
                <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-accent/30 bg-accent/8 text-xs font-semibold text-accent">{i + 1}</div>
                <h3 className="text-base font-semibold tracking-tight text-foreground mb-2">{diff.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{diff.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTAStrip title={d.aboutCta.title} subtitle={d.aboutCta.subtitle} ctaText={d.cta.button} ctaHref={`/${locale}/contact`} />
    </>
  );
}
