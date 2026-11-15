"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheckIcon, CalendarPlusIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Booking } from "@/lib/bookings";

function todayIso() {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** Reject volunteer dates in the past (checked in the submit handler only). */
function isPastDate(value: string) {
  return Boolean(value) && value < todayIso();
}

function GoogleIcon() {
  return (
    <svg
      aria-label="Google logo"
      width="17"
      height="17"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <g>
        <path d="m0 0H512V512H0" fill="#fff" />
        <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
        <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
        <path fill="#ea4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
      </g>
    </svg>
  );
}

/**
 * "Book this program" action shown on a program page.
 *
 * Always visible. Opens a dialog with the volunteer date; when the visitor
 * is signed out the dialog shows the sign-in options instead, returning to
 * the same program page afterwards.
 */
export default function BookProgramButton({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [pending, setPending] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (!session) return;

    let cancelled = false;

    (async () => {
      try {
        const response = await fetch("/api/bookings");
        if (!response.ok) return;
        const data = await response.json();
        if (cancelled) return;

        const match = (data.bookings as Booking[] | undefined)?.find(
          (item) => item.programSlug === slug && item.status !== "cancelled"
        );
        setBooking(match ?? null);
      } catch {
        /* ignore — the button just stays in the "book" state */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [session, slug]);

  /** Already booked → send the volunteer straight to their bookings list. */
  if (booking) {
    return (
      <Button variant="outline" nativeButton={false} render={<Link href="/my-bookings" />}>
        <CalendarCheckIcon />
        Booked — view my bookings
      </Button>
    );
  }

  async function handleSocialSignIn(provider: "google" | "github") {
    setError(null);
    setSigningIn(true);

    const { error: socialError } = await authClient.signIn.social({
      provider,
      callbackURL: pathname,
    });

    if (socialError) {
      setSigningIn(false);
      setError(socialError.message ?? "Unable to start sign in.");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isPastDate(date)) {
      setError("Please choose today or a later date.");
      return;
    }

    setError(null);
    setPending(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ programSlug: slug, date, notes }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.error ?? "Could not save your booking.");
        return;
      }

      setBooking(data.booking as Booking);
      setOpen(false);
      setNotes("");
      setDate("");

      toast.add({
        type: "success",
        title: "Booking confirmed",
        description: `${title} — ${data.booking.date}`,
      });
    } catch {
      setError("Could not save your booking. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <CalendarPlusIcon />
        Book this program
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book {title}</DialogTitle>
          <DialogDescription>
            {session
              ? "Reserve your spot as a volunteer. Your name and email from your account are saved with the booking."
              : "Sign in to reserve your spot — your name, email and chosen volunteer date are saved with the booking."}
          </DialogDescription>
        </DialogHeader>

        {!session ? (
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => void handleSocialSignIn("google")}
              disabled={signingIn}
              className="h-11 w-full"
            >
              <GoogleIcon />
              {signingIn ? "Opening Google…" : "Continue with Google"}
            </Button>

            <Button
              variant="outline"
              className="h-11 w-full"
              nativeButton={false}
              render={
                <Link
                  href={`/signin?callbackURL=${encodeURIComponent(pathname)}`}
                />
              }
            >
              Sign in with email
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              New to Goodora?{" "}
              <Link
                href="/signup"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Create an account
              </Link>
            </p>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Volunteer date
              <Input
                type="date"
                required
                value={date}
                onChange={(event) => setDate(event.target.value)}
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
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </label>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <DialogFooter>
              <DialogClose render={<Button variant="outline" type="button" />}>
                Cancel
              </DialogClose>
              <Button type="submit" disabled={pending}>
                {pending ? "Booking…" : "Confirm booking"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
