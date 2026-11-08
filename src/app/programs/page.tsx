import type { Metadata } from "next";
import { programs } from "@/lib/data/programs";
import ProgramCard from "@/components/goodora/program-card";
import SectionHeading from "@/components/goodora/section-heading";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Browse all Goodora volunteer programs — blood donation, education, environment, elderly care, and more.",
};

export default function ProgramsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <SectionHeading
        eyebrow="Our Programs"
        title="Volunteer programs across eight community causes"
        description="Every program is run with local partners and open to new volunteers. Pick a cause and see how you can help."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {programs.map((program) => (
          <ProgramCard key={program.slug} program={program} />
        ))}
      </div>
    </div>
  );
}
