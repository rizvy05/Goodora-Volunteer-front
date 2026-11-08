import Image from "next/image";
import { CircleCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/goodora/section-heading";

const highlights = [
  "Community-led programs with local partners",
  "Flexible roles for every schedule",
  "Transparent tracking of volunteer hours",
];

export default function AboutIntro() {
  return (
    <section className="py-16 lg:py-20" aria-labelledby="about-intro">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <SectionHeading
            align="left"
            eyebrow="About Goodora"
            title="A platform built around people who want to help"
            description="Goodora brings volunteers and community initiatives together in one place — so showing up for your neighborhood is as easy as finding an event that fits your week."
          />
          <ul className="mt-6 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CircleCheckIcon
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            className="mt-8"
            render={<a href="/about" />}
          >
            Learn more about us
          </Button>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl ring-1 ring-foreground/10 shadow-lg lg:ml-8">
            <Image
              src="/option/Community%20Cleaning.jpeg"
              alt="Volunteers cleaning a community space"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
