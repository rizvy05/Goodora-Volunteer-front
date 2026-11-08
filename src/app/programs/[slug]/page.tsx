import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRightIcon, CircleCheckIcon, UsersIcon } from "lucide-react";
import { getProgram, programs } from "@/lib/data/programs";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/goodora/section-heading";
import ProgramCard from "@/components/goodora/program-card";

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return { title: "Program not found" };
  return {
    title: program.title,
    description: program.description,
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const Icon = program.icon;
  const related = programs.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Program hero */}
      <section className="border-b bg-muted/60">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">
              <Icon className="size-4 text-primary" aria-hidden />
              {program.tagline}
            </span>

            <h1 className="font-heading mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {program.title}
            </h1>

            <p className="mt-4 max-w-xl text-lg text-muted-foreground text-pretty">
              {program.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button render={<Link href="/signup" />}>
                Join as a volunteer
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
              <Button variant="outline" render={<Link href="/contact" />}>
                Ask a question
              </Button>
            </div>

            {/* PLACEHOLDER figures — replace with real data when available. */}
            <dl className="mt-8 flex gap-8">
              <div>
                <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Volunteers
                </dt>
                <dd className="font-heading mt-1 text-2xl font-semibold text-primary">
                  {program.volunteers}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  Hours contributed
                </dt>
                <dd className="font-heading mt-1 text-2xl font-semibold text-primary">
                  {program.hours}
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-3xl ring-1 ring-foreground/10 shadow-lg">
            {program.image ? (
              <Image
                src={program.image}
                alt={program.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/15 via-secondary to-gold/20">
                <Icon className="size-24 text-primary" aria-hidden />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <SectionHeading
          align="left"
          eyebrow="What you'll do"
          title="Typical volunteer activities"
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {program.activities.map((activity) => (
            <li
              key={activity}
              className="flex items-center gap-3 rounded-xl bg-card p-4 text-sm ring-1 ring-foreground/10"
            >
              <CircleCheckIcon
                className="size-4 shrink-0 text-primary"
                aria-hidden
              />
              {activity}
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <UsersIcon className="size-4 text-primary" aria-hidden />
          No prior experience required — orientation is provided for every
          activity.
        </p>
      </section>

      {/* Related programs */}
      <section className="bg-muted/60 px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            align="left"
            eyebrow="Explore more"
            title="Other ways to help"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedProgram) => (
              <ProgramCard key={relatedProgram.slug} program={relatedProgram} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
