import { howItWorks } from "@/lib/data/site";
import SectionHeading from "@/components/goodora/section-heading";

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-20" aria-labelledby="how-it-works">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How It Works"
          title="From sign-up to on-the-ground impact"
          description="Four steps between you and your first volunteer shift."
        />

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-xl bg-card p-6 ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:ring-primary/30 hover:shadow-md"
            >
              <span
                aria-hidden
                className="font-heading inline-flex size-10 items-center justify-center rounded-lg bg-primary text-base font-semibold text-primary-foreground"
              >
                {index + 1}
              </span>
              <h3 className="font-heading mt-4 text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
