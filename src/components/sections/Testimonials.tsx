import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { testimonials } from "@/lib/content";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section className="py-20 lg:py-24">
      <Container>
        <SectionHeading
          title="What Our Clients Say"
          subtitle="We measure our success by the success of the businesses we support."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <Quote className="mb-4 h-8 w-8 text-accent/20" />
              <blockquote className="mb-6 text-sm leading-relaxed text-muted italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted">
                  {testimonial.title}, {testimonial.company}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
