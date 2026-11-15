import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { auth } from "@/lib/auth";
import { db } from "@/lib/mongodb";
import { getProgram } from "@/lib/data/programs";
import {
  bookingFromDoc,
  isValidBookingDate,
  type BookingDoc,
} from "@/lib/bookings";

const bookings = () => db.collection<BookingDoc>("booking");

async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session ?? null;
}

/** GET /api/bookings — every booking owned by the signed-in user. */
export async function GET() {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const docs = await bookings()
    .find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({ bookings: docs.map(bookingFromDoc) });
}

/** POST /api/bookings — book a program as the signed-in user. */
export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const programSlug = typeof body?.programSlug === "string" ? body.programSlug : "";
  const date = typeof body?.date === "string" ? body.date : "";
  const notes = typeof body?.notes === "string" ? body.notes.slice(0, 500) : "";

  const program = getProgram(programSlug);
  if (!program) {
    return NextResponse.json({ error: "Unknown program." }, { status: 400 });
  }

  if (!isValidBookingDate(date)) {
    return NextResponse.json(
      { error: "Please choose a valid volunteer date." },
      { status: 400 }
    );
  }

  const existing = await bookings().findOne({
    userId: session.user.id,
    programSlug,
    status: { $ne: "cancelled" },
  });

  if (existing) {
    return NextResponse.json(
      { error: `You already have a booking for ${program.title}.` },
      { status: 409 }
    );
  }

  const now = new Date();
  const doc: BookingDoc = {
    _id: new ObjectId(),
    userId: session.user.id,
    userName: session.user.name ?? "",
    userEmail: session.user.email ?? "",
    programSlug,
    programTitle: program.title,
    date,
    notes,
    status: "confirmed",
    createdAt: now,
    updatedAt: now,
  };

  await bookings().insertOne(doc);

  return NextResponse.json(
    {
      booking: bookingFromDoc(doc),
    },
    { status: 201 }
  );
}
