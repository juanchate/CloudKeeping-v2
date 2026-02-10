import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTACT } from "@/lib/constants";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us — Book a Consultation",
  description:
    "Get in touch with CloudKeeping. Book a free consultation to discuss your accounting, bookkeeping, tax, or payroll needs. We respond within one business day.",
};

function ContactInfoItem({
  icon: IconComponent,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0 mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <IconComponent className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <div className="text-sm text-muted">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-surface to-white py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Ready to take the next step? Send us a message or reach out
              directly. We typically respond within one business day.
            </p>
          </div>
        </Container>
      </section>

      {/* Form + Contact Info */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="relative lg:col-span-3">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-28">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <ContactInfoItem icon={Phone} label="Phone">
                    <a
                      href={`tel:${CONTACT.phoneRaw}`}
                      className="text-accent hover:text-accent-dark transition-colors"
                    >
                      {CONTACT.phone}
                    </a>
                  </ContactInfoItem>

                  <ContactInfoItem icon={Mail} label="Email">
                    <a
                      href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(CONTACT.emailSubject)}`}
                      className="text-accent hover:text-accent-dark transition-colors"
                    >
                      {CONTACT.email}
                    </a>
                  </ContactInfoItem>

                  <ContactInfoItem icon={Clock} label="Office Hours">
                    <p>{CONTACT.hours}</p>
                  </ContactInfoItem>

                  <ContactInfoItem icon={MapPin} label="Service Area">
                    <p>{CONTACT.serviceArea}</p>
                    <p className="text-xs text-muted/70 mt-1">
                      All services available remotely across BC
                    </p>
                  </ContactInfoItem>
                </div>

                {/* Expectation callout */}
                <div className="mt-8 rounded-xl border border-border bg-surface p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    What to Expect
                  </h3>
                  <ul className="space-y-2 text-sm text-muted">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      We respond within 1 business day
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      Initial consultations are free, no obligation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      We&apos;ll recommend only the services you need
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
