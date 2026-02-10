import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary py-20 sm:py-28 lg:py-36">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hero-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Accounting That Works{" "}
            <span className="text-accent-light">As Hard As You Do</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/80 sm:text-xl">
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
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            >
              Our Services
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
