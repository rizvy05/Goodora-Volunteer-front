"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRightIcon, CalendarCheckIcon, CalendarDaysIcon } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Booking } from "@/lib/bookings";

function formatDate(value: string) {
  const date = new Date(value.length === 10 ? `${value}T00:00:00` : value);
  if (Number.isNaN(date.getTime())) return value;
  return format(date, "MMM d, yyyy");
}

function useMyBookings() {
  const { data: session } = authClient.useSession();
  const [bookings, setBookings] = useState<Booking[] | null>(null);

  useEffect(() => {
    if (!session) return;

    let cancelled = false;

    (async () => {
      try {
        const response = await fetch("/api/bookings");
        if (!response.ok) return;

        const data = await response.json();
        if (!cancelled) setBookings((data.bookings as Booking[]) ?? []);
      } catch {
        if (!cancelled) setBookings([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [session]);

  return { signedIn: Boolean(session), bookings };
}

/** Live count of the programs the signed-in volunteer has booked. */
export function ProgramsJoinedStat() {
  const { signedIn, bookings } = useMyBookings();

  return (
    <Card size="sm" className="py-4">
      <CardContent>
        <p className="font-heading text-2xl font-semibold text-primary">
          {!signedIn
            ? "—"
            : bookings === null
              ? "…"
              : bookings.filter((item) => item.status === "confirmed").length}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Programs joined</p>
      </CardContent>
    </Card>
  );
}

/** The volunteer's real bookings, replacing the placeholder activity list. */
export function RecentBookings() {
  const { signedIn, bookings } = useMyBookings();

  return (
    <Card className="py-5">
      <CardHeader className="pb-4 border-b">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base font-semibold">My activities</CardTitle>

          {signedIn && (bookings?.length ?? 0) > 0 && (
            <Button
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<Link href="/my-bookings" />}
            >
              View all
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {!signedIn && (
          <div className="flex flex-col items-start gap-3 py-2">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarCheckIcon className="size-4 text-primary" aria-hidden />
              Sign in to see your bookings here.
            </p>

            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href="/signin?callbackURL=%2Fdashboard" />}
            >
              Sign in
            </Button>
          </div>
        )}

        {signedIn && bookings === null && (
          <ul className="flex flex-col gap-3">
            <li>
              <Skeleton className="h-12 w-full rounded-lg" />
            </li>
            <li>
              <Skeleton className="h-12 w-full rounded-lg" />
            </li>
          </ul>
        )}

        {signedIn && bookings?.length === 0 && (
          <div className="flex flex-col items-start gap-3 py-2">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarCheckIcon className="size-4 text-primary" aria-hidden />
              You have not booked a program yet.
            </p>

            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href="/programs" />}
            >
              Browse programs
            </Button>
          </div>
        )}

        {signedIn && bookings !== null && bookings.length > 0 && (
          <ul className="divide-y divide-border">
            {bookings.slice(0, 4).map((booking) => (
              <li
                key={booking.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {booking.programTitle}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDaysIcon className="size-3.5" aria-hidden />
                    {formatDate(booking.date)} · {booking.userName}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    booking.status === "confirmed"
                      ? "bg-secondary text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {booking.status === "confirmed" ? "Confirmed" : "Cancelled"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
