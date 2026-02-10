import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import type { Dictionary } from "@/lib/dictionaries";

interface HeroProps { content: Dictionary["hero"]; locale: string }

export function Hero({ content, locale }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/50 via-transparent to-primary-light/20" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent-light">{content.badge}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
            {content.title}{" "}<span className="text-accent-light">{content.titleAccent}</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/60 sm:text-xl max-w-2xl mx-auto">{content.subtitle}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <LinkButton href={`/${locale}/contact`} variant="primary" size="lg" trackLabel="Hero - Book a Consultation">{content.ctaPrimary}</LinkButton>
            <LinkButton href={`/${locale}/services`} variant="outline" size="lg" trackLabel="Hero - Our Services" className="border-white/20 text-white/80 hover:border-accent/50 hover:text-accent-light">{content.ctaSecondary}</LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
