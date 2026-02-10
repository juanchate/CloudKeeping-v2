import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { valueProps } from "@/lib/content";

export function WhyCloudKeeping() {
  return (
    <section className="bg-surface py-24 lg:py-28">
      <Container>
        <SectionHeading
          title="Why CloudKeeping"
          subtitle="We go beyond the numbers to deliver a service you can rely on."
        />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((prop) => (
            <div key={prop.title} className="text-center">
              <div className="mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/8 text-accent">
                <Icon name={prop.icon as IconName} className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold tracking-tight text-foreground">
                {prop.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
