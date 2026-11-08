import type { Metadata } from "next";
import Image from "next/image";
import { CircleCheckIcon, TargetIcon, EyeIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/goodora/section-heading";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Goodora — a social development and volunteer platform connecting people with community initiatives.",
};

const pillars = [
  {
    icon: TargetIcon,
    title: "Our Mission",
    description:
      "Make community service accessible to everyone by connecting willing volunteers with vetted local initiatives that need them.",
  },
  {
    icon: EyeIcon,
    title: "Our Vision",
    description:
      "A city where every neighborhood has an active volunteer network and every resident knows how to contribute.",
  },
  {
    icon: UsersIcon,
    title: "Our Values",
    description:
      "Community-first decisions, transparency in everything we report, and respect for the time every volunteer gives.",
  },
];

const facts = [
  "Founded as a student-led community project",
  "Run entirely with partner organizations and volunteers",
  "Open program design — suggest a cause, we help you start it",
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b bg-muted/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <SectionHeading
            align="left"
            eyebrow="About Us"
            title="Goodora — where good intentions become organized help"
            description="We are a volunteer coordination platform focused on social development: food security, education, environment, elderly care, and community welfare."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl bg-card p-6 ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:ring-primary/30 hover:shadow-md"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
                <pillar.icon className="size-5" aria-hidden />
              </div>
              <h2 className="font-heading mt-4 text-lg font-semibold text-foreground">
                {pillar.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl ring-1 ring-foreground/10 shadow-lg">
            <Image
              src="/option/Food%20Distribution.jpeg"
              alt="Volunteers distributing food in the community"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              Who we are
            </h2>
            <ul className="mt-5 space-y-3">
              {facts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <CircleCheckIcon
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    aria-hidden
                  />
                  {fact}
                </li>
              ))}
            </ul>
            <Button className="mt-8" render={<a href="/signup" />}>
              Join the community
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
