import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/lib/dictionaries";

interface Props { content: Dictionary["howItWorks"] }

export function HowItWorks({ content }: Props) {
  return (
    <section className="bg-surface py-24 lg:py-28">
      <Container>
        <SectionHeading title={content.heading} subtitle={content.subheading} />
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            {content.steps.map((step) => (
              <div key={step.step} className="relative text-center">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent/30 bg-accent/8 text-lg font-semibold text-accent">{step.step}</div>
                {step.step < content.steps.length && (
                  <div className="absolute left-[calc(50%+1.75rem)] top-6 hidden h-px w-[calc(100%-3.5rem)] bg-border md:block" />
                )}
                <h3 className="mb-2 text-base font-semibold tracking-tight text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
