import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";

export default function NotFound() {
  return (
    <section className="py-32 lg:py-40">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <p className="text-7xl font-bold text-primary/20">404</p>
          <h1 className="mt-4 text-3xl font-bold text-foreground">
            Page Not Found
          </h1>
          <p className="mt-4 text-muted leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <LinkButton href="/" variant="primary" size="md">
              Go Home
            </LinkButton>
            <LinkButton href="/contact" variant="outline" size="md">
              Contact Us
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
