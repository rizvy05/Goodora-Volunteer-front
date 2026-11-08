import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { impactStats, howItWorks, type HowItWorksStep } from "@/lib/data/site";
import { impactByProgram } from "@/lib/data/programs";
import SectionHeading from "@/components/goodora/section-heading";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "See the difference Goodora volunteers make — hours contributed, programs run, and neighborhoods reached.",
};

export default function ImpactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <SectionHeading
        eyebrow="Our Impact"
        title="The difference your hours make"
        description="Figures below are illustrative placeholders — live impact data will replace them once the backend is connected."
      />

      <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {impactStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-card p-6 text-center ring-1 ring-foreground/10"
          >
            <p className="font-heading text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              {stat.value}
              {stat.suffix && <span className="text-gold-foreground">{stat.suffix}</span>}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-14" aria-labelledby="impact-by-program">
        <h2
          id="impact-by-program"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          Impact by program
        </h2>
        <div className="mt-6 overflow-x-auto rounded-xl bg-card ring-1 ring-foreground/10">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="border-b bg-muted/60 text-left text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              <tr>
                <th scope="col" className="px-4 py-3">Program</th>
                <th scope="col" className="px-4 py-3">Volunteers</th>
                <th scope="col" className="px-4 py-3">Hours</th>
                <th scope="col" className="px-4 py-3"><span className="sr-only">Link</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {impactByProgram.map((row) => (
                <tr key={row.slug} className="transition-colors hover:bg-muted/50">
                  <th scope="row" className="flex items-center gap-2 px-4 py-3 text-left font-medium text-foreground">
                    <row.icon className="size-4 text-primary" aria-hidden />
                    {row.title}
                  </th>
                  <td className="px-4 py-3 text-muted-foreground">{row.volunteers}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.hours}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/programs/${row.slug}`}
                      className="inline-flex items-center gap-1 font-medium text-primary hover:underline underline-offset-4"
                    >
                      Details <ArrowRightIcon className="size-3.5" aria-hidden />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14" aria-labelledby="how-impact-happens">
        <h2
          id="how-impact-happens"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          How impact happens
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step: HowItWorksStep, index: number) => (
            <div
              key={step.title}
              className="rounded-xl bg-card p-5 ring-1 ring-foreground/10"
            >
              <p className="text-xs font-semibold tracking-wider text-gold-foreground uppercase">
                Step {index + 1}
              </p>
              <h3 className="font-heading mt-2 text-sm font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
