import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { LinkButton } from "@/components/ui/LinkButton";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about CloudKeeping's accounting, bookkeeping, tax, and payroll services for businesses in British Columbia.",
};

export default function FAQPage() {
  // Group FAQs by category
  const categories = [...new Set(faqs.map((faq) => faq.category || "General"))];
  const groupedFaqs = categories.map((category) => ({
    category,
    items: faqs.filter((faq) => (faq.category || "General") === category),
  }));

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface to-white py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Everything you need to know about our services, process, and
              pricing. Can&apos;t find what you&apos;re looking for? Get in touch.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            {groupedFaqs.map((group) => (
              <div key={group.category} className="mb-12 last:mb-0">
                <h2 className="mb-6 text-xl font-semibold text-foreground">
                  {group.category}
                </h2>
                <Accordion items={group.items} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="bg-surface py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-muted mb-8">
              We&apos;re happy to help. Reach out and we&apos;ll get back to you
              within one business day.
            </p>
            <LinkButton
              href="/contact"
              variant="primary"
              size="lg"
              trackLabel="FAQ - Contact Us"
            >
              Contact Us
            </LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
