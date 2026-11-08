import { ArrowUpRightIcon } from "lucide-react";
import { impactStats } from "@/lib/data/site";
import SectionHeading from "@/components/goodora/section-heading";

export default function ImpactStats() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground lg:py-20" aria-labelledby="impact-stats">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-24 size-72 rounded-full bg-gold/20 blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our Impact"
          title="Together, our hours add up"
          // PLACEHOLDER figures — replace with real data when available.
          description="Illustrative totals across all Goodora community programs. Real figures will be shown once live data is connected."
        />

        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {impactStats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-xl bg-primary-foreground/10 p-6 text-center ring-1 ring-primary-foreground/15 transition-colors hover:bg-primary-foreground/15"
            >
              <p className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {stat.value}
                {stat.suffix && (
                  <span className="text-gold">{stat.suffix}</span>
                )}
              </p>
              <p className="mt-2 text-sm text-primary-foreground/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/impact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:underline underline-offset-4"
          >
            See the full impact report
            <ArrowUpRightIcon className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
