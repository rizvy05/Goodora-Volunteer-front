import Link from "next/link";
import { CalendarDaysIcon, ClockIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { upcomingEvents, type VolunteerEvent } from "@/lib/data/site";
import { getProgram } from "@/lib/data/programs";
import SectionHeading from "@/components/goodora/section-heading";

export default function UpcomingEvents() {
  return (
    <section className="bg-muted/60 py-16 lg:py-20" aria-labelledby="upcoming-events">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Upcoming Events"
          title="What's happening next"
          description="Reserve your spot on an upcoming community activity. Registration opens to registered volunteers."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Sign in to see every open shift on your{" "}
          <Link href="/dashboard" className="font-medium text-primary hover:underline underline-offset-4">
            volunteer dashboard
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: VolunteerEvent }) {
  const program = getProgram(event.programSlug);

  return (
    <article className="group flex flex-col rounded-xl bg-card p-5 ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:ring-primary/30 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-11 flex-col items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-primary">
          <CalendarDaysIcon className="size-5" aria-hidden />
        </div>
        <span className="rounded-full bg-gold/20 px-2.5 py-1 text-xs font-semibold text-gold-foreground">
          {program?.title ?? "Volunteering"}
        </span>
      </div>

      <h3 className="font-heading mt-4 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
        {event.title}
      </h3>

      <dl className="mt-3 flex flex-1 flex-col gap-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <ClockIcon className="size-4 shrink-0" aria-hidden />
          {event.date} · {event.time}
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon className="size-4 shrink-0" aria-hidden />
          {event.location}
        </div>
        <div className="flex items-center gap-2">
          <UsersIcon className="size-4 shrink-0" aria-hidden />
          {event.volunteersNeeded} volunteers needed
        </div>
      </dl>

      <Link
        href="/signin"
        className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
      >
        Register interest
      </Link>
    </article>
  );
}
