import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { LinkButton } from "@/components/ui/LinkButton";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const d = getDictionary(locale as Locale);
  return { title: d.faq.pageTitle, description: d.faq.pageSubtitle };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const d = getDictionary(locale as Locale);
  const f = d.faq;

  const categories = [...new Set(f.items.map((q) => q.category))];
  const grouped = categories.map((cat) => ({ category: cat, items: f.items.filter((q) => q.category === cat) }));

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-16 lg:py-20">
        <Container><div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{f.pageTitle}</h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">{f.pageSubtitle}</p>
        </div></Container>
      </section>

      <section className="py-24 lg:py-28">
        <Container><div className="mx-auto max-w-3xl">
          {grouped.map((g) => (
            <div key={g.category} className="mb-14 last:mb-0">
              <h2 className="mb-6 text-lg font-semibold tracking-tight text-foreground">{g.category}</h2>
              <Accordion items={g.items} />
            </div>
          ))}
        </div></Container>
      </section>

      <section className="bg-surface py-20 lg:py-24">
        <Container><div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-4">{f.stillTitle}</h2>
          <p className="text-muted mb-8 text-sm leading-relaxed">{f.stillSubtitle}</p>
          <LinkButton href={`/${locale}/contact`} variant="primary" size="lg" trackLabel="FAQ - Contact Us">{f.contactUs}</LinkButton>
        </div></Container>
      </section>
    </>
  );
}
