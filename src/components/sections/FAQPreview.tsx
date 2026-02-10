import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { LinkButton } from "@/components/ui/LinkButton";
import { faqs } from "@/lib/content";

export function FAQPreview() {
  // Show first 4 FAQs on homepage
  const previewFaqs = faqs.slice(0, 4);

  return (
    <section className="bg-surface py-20 lg:py-24">
      <Container>
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Quick answers to the questions we hear most often."
        />

        <div className="mx-auto max-w-3xl">
          <Accordion items={previewFaqs} />

          <div className="mt-10 text-center">
            <LinkButton
              href="/faq"
              variant="outline"
              size="md"
              trackLabel="FAQ Preview - See All FAQs"
            >
              See All FAQs
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
