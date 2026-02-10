import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/content";

export function HowItWorks() {
  return (
    <section className="bg-surface py-20 lg:py-24">
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
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-xl font-bold text-white">
                  {step.step}
                </div>

                {/* Connector line (hidden on mobile, shown between steps) */}
                {step.step < processSteps.length && (
                  <div className="absolute left-[calc(50%+2rem)] top-7 hidden h-0.5 w-[calc(100%-4rem)] bg-border md:block" />
                )}

                <h3 className="mb-2 text-lg font-semibold text-foreground">
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
