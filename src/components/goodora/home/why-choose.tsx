import { whyChoose } from "@/lib/data/site";
import SectionHeading from "@/components/goodora/section-heading";

export default function WhyChoose() {
  return (
    <section className="bg-muted/60 py-16 lg:py-20" aria-labelledby="why-choose">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why Choose Goodora"
          title="Volunteering made simple and meaningful"
          description="We remove the friction between good intentions and real help."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map((item) => (
            <div
              key={item.title}
              className="rounded-xl bg-card p-6 ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:ring-primary/30 hover:shadow-md"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                <item.icon className="size-5" aria-hidden />
              </div>
              <h3 className="font-heading mt-4 text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
