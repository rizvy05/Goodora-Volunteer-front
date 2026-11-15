import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";
import { db } from "@/lib/mongodb";
import {
  bookingFromDoc,
  isValidBookingDate,
  type BookingDoc,
  type BookingStatus,
} from "@/lib/bookings";

const bookings = () => db.collection<BookingDoc>("booking");

type Params = { params: Promise<{ id: string }> };

async function findOwnBooking(id: string) {
  if (!ObjectId.isValid(id)) {
    return { error: NextResponse.json({ error: "Invalid booking id." }, { status: 400 }) };
  }

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: NextResponse.json({ error: "You must be signed in." }, { status: 401 }) };
  }

  const doc = await bookings().findOne({ _id: new ObjectId(id) });
  if (!doc) {
    return { error: NextResponse.json({ error: "Booking not found." }, { status: 404 }) };
  }

  if (doc.userId !== session.user.id) {
    return { error: NextResponse.json({ error: "Not your booking." }, { status: 403 }) };
  }

  return { doc };
}

/**
 * PATCH /api/bookings/:id
 *
 * Edit the volunteer date / notes, or cancel and reactivate the booking.
 */
export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const found = await findOwnBooking(id);
  if ("error" in found) return found.error;

  const body = await request.json().catch(() => null);
  const updates: Partial<Pick<BookingDoc, "date" | "notes" | "status" | "updatedAt">> = {};

  if (body?.date !== undefined) {
    if (!isValidBookingDate(body.date)) {
      return NextResponse.json(
        { error: "Please choose a valid volunteer date." },
        { status: 400 }
      );
    }
    updates.date = body.date;
  }

  if (body?.notes !== undefined) {
    updates.notes = typeof body.notes === "string" ? body.notes.slice(0, 500) : "";
  }

  if (body?.status !== undefined) {
    if (body.status !== "confirmed" && body.status !== "cancelled") {
      return NextResponse.json({ error: "Unknown status." }, { status: 400 });
    }
    updates.status = body.status as BookingStatus;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  updates.updatedAt = new Date();

  const result = await bookings().findOneAndUpdate(
    { _id: found.doc._id },
    { $set: updates },
    { returnDocument: "after" }
  );

  if (!result) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  return NextResponse.json({ booking: bookingFromDoc(result) });
}

/** DELETE /api/bookings/:id — permanently remove a booking. */
export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const found = await findOwnBooking(id);
  if ("error" in found) return found.error;

  await bookings().deleteOne({ _id: found.doc._id });

  return NextResponse.json({ ok: true });
}
