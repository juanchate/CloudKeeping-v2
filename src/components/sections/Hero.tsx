import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 sm:py-32 lg:py-40">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/50 via-transparent to-primary-light/20" />

      {/* Delicate gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent-light">
            Accounting &middot; Bookkeeping &middot; Tax
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
            Accounting That Works{" "}
            <span className="text-accent-light">As Hard As You Do</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/60 sm:text-xl max-w-2xl mx-auto">
            Professional bookkeeping, tax planning, and financial services that
            give you clarity, confidence, and more time to focus on growing your
            business.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <LinkButton
              href="/contact"
              variant="primary"
              size="lg"
              trackLabel="Hero - Book a Consultation"
            >
              Book a Consultation
            </LinkButton>
            <LinkButton
              href="/services"
              variant="outline"
              size="lg"
              trackLabel="Hero - Our Services"
              className="border-white/20 text-white/80 hover:border-accent/50 hover:text-accent-light"
            >
              Our Services
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
