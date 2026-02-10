import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { valueProps } from "@/lib/content";

export function WhyCloudKeeping() {
  return (
    <section className="bg-surface py-20 lg:py-24">
      <Container>
        <SectionHeading
          title="Why CloudKeeping"
          subtitle="We go beyond the numbers to deliver a service you can rely on."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((prop) => (
            <div key={prop.title} className="text-center">
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon name={prop.icon as IconName} className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
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
