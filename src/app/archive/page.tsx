import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDaysIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { pastEvents } from "@/lib/data/site";
import { getProgram } from "@/lib/data/programs";
import SectionHeading from "@/components/goodora/section-heading";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Browse completed Goodora events and the results of previous volunteer activities.",
};

export default function ArchivePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <SectionHeading
        eyebrow="Event Archive"
        title="Completed events"
        description="Past volunteer activities and what they achieved. Entries below are illustrative until live data is connected."
      />

      <ol className="relative mt-12 space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[1.05rem] before:w-px before:bg-border sm:before:left-[1.3rem]">
        {pastEvents.map((event) => {
          const program = getProgram(event.programSlug);
          const Icon = program?.icon;
          return (
            <li key={event.id} className="relative flex gap-5">
              <span
                aria-hidden
                className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-4 ring-background"
              >
                {Icon && <Icon className="size-4 text-primary" />}
              </span>

              <article className="flex-1 rounded-xl bg-card p-5 ring-1 ring-foreground/10 transition-shadow hover:shadow-md">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className="rounded-full bg-secondary px-2.5 py-1 font-semibold text-secondary-foreground">
                    {event.programTitle}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDaysIcon className="size-3.5" aria-hidden />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPinIcon className="size-3.5" aria-hidden />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <UsersIcon className="size-3.5" aria-hidden />
                    {event.volunteers} volunteers
                  </span>
                </div>

                <h2 className="font-heading mt-3 text-lg font-semibold text-foreground">
                  {event.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground text-pretty">
                  {event.summary}
                </p>
                <Link
                  href={`/programs/${event.programSlug}`}
                  className="mt-3 inline-block text-sm font-medium text-primary hover:underline underline-offset-4"
                >
                  About this program
                </Link>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
