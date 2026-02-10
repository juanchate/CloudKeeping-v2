import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";

interface CTAStripProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export function CTAStrip({ title, subtitle, ctaText, ctaHref }: CTAStripProps) {
  return (
    <section className="relative bg-primary py-20 lg:py-24">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-40" />
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-white/50 leading-relaxed">{subtitle}</p>
          <div className="mt-10">
            <LinkButton href={ctaHref} variant="primary" size="lg" trackLabel={`CTA Strip - ${ctaText}`}>{ctaText}</LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
