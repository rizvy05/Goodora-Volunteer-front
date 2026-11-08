import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pastEvents } from "@/lib/data/site";
import { getProgram } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Volunteer Dashboard",
  description: "Manage your volunteer activities, hours, and upcoming events.",
};

/* PLACEHOLDER dashboard data — replace with real per-user backend data. */
const myStats = [
  { label: "Events attended", value: "14" },
  { label: "Hours contributed", value: "96" },
  { label: "Programs joined", value: "4" },
  { label: "Impact badges", value: "6" },
];

const myActivities = [
  {
    id: "ACT-001",
    title: "Weekend community kitchen",
    programTitle: "Food Distribution",
    date: "Nov 14, 2026",
    status: "Confirmed",
  },
  {
    id: "ACT-002",
    title: "Old-town plaza cleanup",
    programTitle: "Community Cleaning",
    date: "Nov 15, 2026",
    status: "Confirmed",
  },
  {
    id: "ACT-003",
    title: "Winter clothing drive launch",
    programTitle: "Clothing Donation",
    date: "Nov 21, 2026",
    status: "Waitlisted",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Volunteer Dashboard
          </p>
          <h1 className="font-heading mt-1 text-3xl font-semibold tracking-tight text-foreground">
            Welcome back, <span className="text-primary">Volunteer</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            All dashboard data below is illustrative until the backend is
            connected.
          </p>
        </div>
        <Button render={<Link href="/programs" />}>
          Find new events
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {myStats.map((stat) => (
          <Card key={stat.label} size="sm" className="py-4">
            <CardContent>
              <p className="font-heading text-2xl font-semibold text-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2" aria-labelledby="my-activities">
          <Card className="py-5">
            <CardHeader className="pb-1 [.border-b]:pb-4 border-b">
              <CardTitle className="text-base font-semibold">
                My activities
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="divide-y divide-border">
                {myActivities.map((activity) => (
                  <li
                    key={activity.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.programTitle} · {activity.date}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        activity.status === "Confirmed"
                          ? "bg-secondary text-primary"
                          : "bg-gold/20 text-gold-foreground"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="past-summary">
          <Card className="py-5">
            <CardHeader className="pb-1 [.border-b]:pb-4 border-b">
              <CardTitle className="text-base font-semibold">
                Your history snapshot
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-3">
                {pastEvents.slice(0, 3).map((event) => {
                  const program = getProgram(event.programSlug);
                  return (
                    <li key={event.id} className="rounded-lg bg-muted/60 p-3 text-sm">
                      <p className="font-medium text-foreground">{event.title}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDaysIcon className="size-3.5" aria-hidden />
                        {event.date}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPinIcon className="size-3.5" aria-hidden />
                        {program?.title}
                        <ClockIcon className="ml-1 size-3.5" aria-hidden aria-label="volunteers" />
                        {event.volunteers} volunteers
                      </p>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
