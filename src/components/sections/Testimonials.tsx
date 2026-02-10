import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section className="py-24 lg:py-28">
      <Container>
        <SectionHeading
          title="What Our Clients Say"
          subtitle="We measure our success by the success of the businesses we support."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              {/* Gold accent bar */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

              <div className="pt-2">
                <blockquote className="mb-6 text-sm leading-relaxed text-muted">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="border-t border-border/50 pt-4">
                  <p className="text-sm font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
