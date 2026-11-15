"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  CalendarCheckIcon,
  CalendarDaysIcon,
  MailIcon,
  PencilIcon,
  RotateCcwIcon,
  Trash2Icon,
  UserIcon,
  XCircleIcon,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Booking, BookingStatus } from "@/lib/bookings";

function formatDate(value: string) {
  const date = new Date(value.length === 10 ? `${value}T00:00:00` : value);
  if (Number.isNaN(date.getTime())) return value;
  return format(date, "MMM d, yyyy");
}

function todayIso() {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** Reject volunteer dates in the past (checked in submit handlers only). */
function isPastDate(value: string) {
  return Boolean(value) && value < todayIso();
}

export default function MyBookingsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState<Booking | null>(null);
  const [editDate, setEditDate] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editPending, setEditPending] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const [deleting, setDeleting] = useState<Booking | null>(null);
  const [deletePending, setDeletePending] = useState(false);

  const load = useCallback(async () => {
    setError(null);

    try {
      const response = await fetch("/api/bookings");

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Could not load your bookings.");
      }

      const data = await response.json();
      setBookings((data.bookings as Booking[]) ?? []);
    } catch (err) {
      setBookings([]);
      setError(err instanceof Error ? err.message : "Could not load your bookings.");
    }
  }, []);

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

  async function patchBooking(id: string, payload: Record<string, unknown>) {
    const response = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.error ?? "Could not update the booking.");
    }

    return data.booking as Booking;
  }

  function replaceBooking(updated: Booking) {
    setBookings((current) =>
      (current ?? []).map((item) => (item.id === updated.id ? updated : item))
    );
  }

  function openEdit(booking: Booking) {
    setEditError(null);
    setEditDate(booking.date);
    setEditNotes(booking.notes);
    setEditing(booking);
  }

  async function handleEditSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;

    if (isPastDate(editDate)) {
      setEditError("Please choose today or a later date.");
      return;
    }

    setEditError(null);
    setEditPending(true);

    try {
      const updated = await patchBooking(editing.id, {
        date: editDate,
        notes: editNotes,
      });
      replaceBooking(updated);
      setEditing(null);
      toast.add({
        type: "success",
        title: "Booking updated",
        description: `${updated.programTitle} — ${formatDate(updated.date)}`,
      });
    } catch (err) {
      setEditError(err instanceof Error ? err.message : "Could not update the booking.");
    } finally {
      setEditPending(false);
    }
  }

  async function handleStatusChange(booking: Booking, status: BookingStatus) {
    try {
      const updated = await patchBooking(booking.id, { status });
      replaceBooking(updated);

      toast.add({
        type: status === "cancelled" ? "warning" : "success",
        title: status === "cancelled" ? "Booking cancelled" : "Booking reactivated",
        description: `${updated.programTitle} — ${formatDate(updated.date)}`,
      });
    } catch (err) {
      toast.add({
        type: "error",
        title: "Could not update the booking",
        description: err instanceof Error ? err.message : undefined,
      });
    }
  }

  async function handleDelete() {
    if (!deleting) return;

    setDeletePending(true);

    try {
      const response = await fetch(`/api/bookings/${deleting.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Could not delete the booking.");
      }

      const removed = deleting;
      setBookings((current) =>
        (current ?? []).filter((item) => item.id !== removed.id)
      );
      setDeleting(null);

      toast.add({
        type: "success",
        title: "Booking deleted",
        description: `${removed.programTitle} was removed.`,
      });
    } catch (err) {
      toast.add({
        type: "error",
        title: "Could not delete the booking",
        description: err instanceof Error ? err.message : undefined,
      });
    } finally {
      setDeletePending(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            My Bookings
          </p>
          <h1 className="font-heading mt-1 text-3xl font-semibold tracking-tight text-foreground">
            Your volunteer bookings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Every program you have booked, with your date, name and email on
            record.
          </p>
        </div>

        <Button render={<Link href="/programs" />}>Find new programs</Button>
      </div>

      {isPending && (
        <div className="mt-8 flex flex-col gap-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      )}

      {!isPending && !session && (
        <Card className="mt-8 py-8 text-center">
          <CardContent className="flex flex-col items-center gap-4">
            <CalendarCheckIcon className="size-10 text-primary" aria-hidden />
            <div>
              <CardTitle className="text-lg">Sign in to see your bookings</CardTitle>
              <CardDescription className="mt-1">
                Bookings are saved to your account — sign in to view, edit or
                cancel them.
              </CardDescription>
            </div>
            <Button
              render={<Link href="/signin?callbackURL=%2Fmy-bookings" />}
            >
              Sign in
            </Button>
          </CardContent>
        </Card>
      )}

      {!isPending && session && error && (
        <Card className="mt-8 border-destructive/40 py-8 text-center">
          <CardContent className="flex flex-col items-center gap-4">
            <div>
              <CardTitle className="text-lg">Could not load your bookings</CardTitle>
              <CardDescription className="mt-1">{error}</CardDescription>
            </div>
            <Button variant="outline" onClick={() => void load()}>
              Try again
            </Button>
          </CardContent>
        </Card>
      )}

      {!isPending && session && !error && bookings === null && (
        <div className="mt-8 flex flex-col gap-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      )}

      {!isPending && session && !error && bookings?.length === 0 && (
        <Card className="mt-8 py-10 text-center">
          <CardContent className="flex flex-col items-center gap-4">
            <CalendarDaysIcon className="size-10 text-muted-foreground" aria-hidden />
            <div>
              <CardTitle className="text-lg">No bookings yet</CardTitle>
              <CardDescription className="mt-1">
                Browse the programs and book your first volunteer day.
              </CardDescription>
            </div>
            <Button render={<Link href="/programs" />}>Browse programs</Button>
          </CardContent>
        </Card>
      )}

      {!isPending && session && !error && (bookings?.length ?? 0) > 0 && (
        <ul className="mt-8 flex flex-col gap-4">
          {bookings!.map((booking) => (
            <li key={booking.id}>
              <Card
                className={booking.status === "cancelled" ? "opacity-70" : undefined}
              >
                <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="text-lg">{booking.programTitle}</CardTitle>
                      <Badge
                        variant={
                          booking.status === "confirmed" ? "secondary" : "outline"
                        }
                      >
                        {booking.status === "confirmed" ? "Confirmed" : "Cancelled"}
                      </Badge>
                    </div>

                    <ul className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CalendarDaysIcon className="size-4 shrink-0 text-primary" aria-hidden />
                        Volunteer date:{" "}
                        <span className="font-medium text-foreground">
                          {formatDate(booking.date)}
                        </span>
                        <span className="text-muted-foreground/70">
                          · booked {formatDate(booking.createdAt)}
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <UserIcon className="size-4 shrink-0 text-primary" aria-hidden />
                        <span className="truncate">{booking.userName}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <MailIcon className="size-4 shrink-0 text-primary" aria-hidden />
                        <span className="truncate">{booking.userEmail}</span>
                      </li>
                    </ul>

                    {booking.notes && (
                      <p className="mt-3 rounded-lg bg-muted/60 p-3 text-sm text-foreground">
                        {booking.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(booking)}>
                      <PencilIcon />
                      Edit
                    </Button>

                    {booking.status === "confirmed" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => void handleStatusChange(booking, "cancelled")}
                      >
                        <XCircleIcon />
                        Cancel
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => void handleStatusChange(booking, "confirmed")}
                      >
                        <RotateCcwIcon />
                        Reactivate
                      </Button>
                    )}

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleting(booking)}
                    >
                      <Trash2Icon />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}

      {/* Edit booking */}
      <Dialog
        open={editing !== null}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit booking — {editing?.programTitle}</DialogTitle>
            <DialogDescription>
              Change your volunteer date or update the note for the
              coordinators.
            </DialogDescription>
          </DialogHeader>

          <form className="flex flex-col gap-4" onSubmit={handleEditSubmit}>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Volunteer date
              <Input
                type="date"
                required
                value={editDate}
                onChange={(event) => setEditDate(event.target.value)}
                className="h-10"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              Note{" "}
              <span className="font-normal text-muted-foreground">(optional)</span>
              <Textarea
                rows={3}
                maxLength={500}
                placeholder="Anything the coordinators should know…"
                value={editNotes}
                onChange={(event) => setEditNotes(event.target.value)}
              />
            </label>

            {editError && (
              <p role="alert" className="text-sm text-destructive">
                {editError}
              </p>
            )}

            <DialogFooter>
              <DialogClose render={<Button variant="outline" type="button" />}>
                Cancel
              </DialogClose>
              <Button type="submit" disabled={editPending}>
                {editPending ? "Saving…" : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete booking */}
      <AlertDialog
        open={deleting !== null}
        onOpenChange={(open) => {
          if (!open) setDeleting(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this booking?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleting
                ? `${deleting.programTitle} on ${formatDate(deleting.date)} will be removed permanently. This cannot be undone.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletePending}>
              Keep booking
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={deletePending}
              onClick={() => void handleDelete()}
            >
              {deletePending ? "Deleting…" : "Delete booking"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
