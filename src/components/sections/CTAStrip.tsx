import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";

interface CTAStripProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function CTAStrip({
  title = "Ready to Simplify Your Finances?",
  subtitle = "Book a free consultation and discover how CloudKeeping can support your business.",
  ctaText = "Book a Consultation",
  ctaHref = "/contact",
}: CTAStripProps) {
  return (
    <section className="bg-primary py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-white/70">{subtitle}</p>
          <div className="mt-8">
            <LinkButton
              href={ctaHref}
              variant="primary"
              size="lg"
              trackLabel={`CTA Strip - ${ctaText}`}
            >
              {ctaText}
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
