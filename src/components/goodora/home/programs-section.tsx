import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { programs } from "@/lib/data/programs";
import ProgramCard from "@/components/goodora/program-card";
import SectionHeading from "@/components/goodora/section-heading";

export default function ProgramsSection() {
  return (
    <section className="bg-muted/60 py-16 lg:py-20" aria-labelledby="programs-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Volunteer Programs"
          title="Pick a cause, make a difference"
          description="Eight ongoing program areas where volunteers of every background contribute — donate blood, teach, plant trees, or serve warm meals."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4"
          >
            View all programs
            <ArrowRightIcon className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
