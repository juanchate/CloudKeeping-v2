import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/content";

export function HowItWorks() {
  return (
    <section className="bg-surface py-24 lg:py-28">
      <Container>
        <SectionHeading
          title="How It Works"
          subtitle="Getting started is simple. Here's what to expect."
        />

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            {processSteps.map((step) => (
              <div key={step.step} className="relative text-center">
                {/* Step number */}
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent/30 bg-accent/8 text-lg font-semibold text-accent">
                  {step.step}
                </div>

                {/* Connector line */}
                {step.step < processSteps.length && (
                  <div className="absolute left-[calc(50%+1.75rem)] top-6 hidden h-px w-[calc(100%-3.5rem)] bg-border md:block" />
                )}

                <h3 className="mb-2 text-base font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
