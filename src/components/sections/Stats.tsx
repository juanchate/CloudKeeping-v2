import { Container } from "@/components/ui/Container";
import { stats } from "@/lib/content";

export function Stats() {
  return (
    <section className="py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-semibold tracking-tight text-accent sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
