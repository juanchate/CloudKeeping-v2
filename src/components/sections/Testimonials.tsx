import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import type { Dictionary } from "@/lib/dictionaries";

interface Props { content: Dictionary["testimonials"] }

export function Testimonials({ content }: Props) {
  return (
    <section className="py-24 lg:py-28">
      <Container>
        <SectionHeading title={content.heading} subtitle={content.subheading} />
        <div className="grid gap-8 md:grid-cols-3">
          {content.items.map((t, i) => (
            <Card key={i} className="relative">
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              <div className="pt-2">
                <blockquote className="mb-6 text-sm leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="border-t border-border/50 pt-4">
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted">{t.title}, {t.company}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
