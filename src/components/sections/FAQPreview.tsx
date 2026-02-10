import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { LinkButton } from "@/components/ui/LinkButton";
import type { Dictionary } from "@/lib/dictionaries";

interface Props { content: Dictionary["faq"]; locale: string }

export function FAQPreview({ content, locale }: Props) {
  const previewFaqs = content.items.slice(0, 4);
  return (
    <section className="bg-surface py-24 lg:py-28">
      <Container>
        <SectionHeading title={content.previewHeading} subtitle={content.previewSubheading} />
        <div className="mx-auto max-w-3xl">
          <Accordion items={previewFaqs} />
          <div className="mt-12 text-center">
            <LinkButton href={`/${locale}/faq`} variant="outline" size="md" trackLabel="FAQ Preview - See All FAQs">{content.seeAll}</LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
