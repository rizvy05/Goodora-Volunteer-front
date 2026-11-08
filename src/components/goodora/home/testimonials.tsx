import { QuoteIcon, StarIcon } from "lucide-react";
import { testimonials } from "@/lib/data/site";
import SectionHeading from "@/components/goodora/section-heading";

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-20" aria-labelledby="testimonials">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="Hear it from our volunteers"
          description="Sample testimonials shown for design purposes until real volunteer stories are collected."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="relative flex flex-col rounded-xl bg-card p-6 ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:ring-primary/30 hover:shadow-md"
            >
              <QuoteIcon
                className="absolute top-5 right-5 size-8 text-secondary"
                aria-hidden
              />
              <div
                className="flex gap-0.5 text-gold"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="size-4 fill-current" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90 text-pretty">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t pt-4">
                <p className="font-heading text-sm font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
