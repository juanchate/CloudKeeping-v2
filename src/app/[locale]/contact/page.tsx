import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTACT } from "@/lib/constants";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

interface Props { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const d = getDictionary(locale as Locale);
  return { title: d.contact.pageTitle, description: d.contact.pageSubtitle };
}

function InfoItem({ icon: Ic, label, children }: { icon: React.ElementType; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0 mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/8 text-accent"><Ic className="h-5 w-5" /></div>
      <div><p className="text-sm font-medium text-foreground">{label}</p><div className="text-sm text-muted">{children}</div></div>
    </div>
  );
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const d = getDictionary(locale as Locale);
  const c = d.contact;

  return (
    <>
      <section className="bg-gradient-to-b from-surface to-white py-16 lg:py-20">
        <Container><div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{c.pageTitle}</h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">{c.pageSubtitle}</p>
        </div></Container>
      </section>

      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="relative lg:col-span-3">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-6">{c.formTitle}</h2>
              <ContactForm content={d.form} />
            </div>
            <div className="lg:col-span-2">
              <div className="sticky top-28">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-6">{c.infoTitle}</h2>
                <div className="space-y-5">
                  <InfoItem icon={Phone} label={c.phoneLabel}>
                    <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-dark transition-colors">{CONTACT.phone}</a>
                  </InfoItem>
                  <InfoItem icon={Mail} label={c.emailLabel}>
                    <a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(CONTACT.emailSubject)}`} className="text-accent hover:text-accent-dark transition-colors">{CONTACT.email}</a>
                  </InfoItem>
                  <InfoItem icon={Clock} label={c.hoursLabel}><p>{CONTACT.hours}</p></InfoItem>
                  <InfoItem icon={MapPin} label={c.areaLabel}><p>{CONTACT.serviceArea}</p><p className="text-xs text-muted/70 mt-1">{c.areaNote}</p></InfoItem>
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83327.34083555497!2d-123.22370805!3d49.2577143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548673f143a94fb3%3A0xbb9196ea9b81f38b!2sVancouver%2C%20BC!5e0!3m2!1sen!2sca!4v1707600000000!5m2!1sen!2sca" width="100%" height="200" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={c.mapTitle} className="grayscale-[30%] opacity-90" />
                </div>

                <div className="mt-6 rounded-2xl border border-border/60 bg-surface p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3">{c.whatToExpect}</h3>
                  <ul className="space-y-2.5 text-sm text-muted">
                    {c.expectations.map((e, i) => (
                      <li key={i} className="flex items-start gap-2.5"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />{e}</li>
                    ))}
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
