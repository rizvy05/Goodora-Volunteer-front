import type { ObjectId } from "mongodb";

export type BookingStatus = "confirmed" | "cancelled";

/** Shape of a document in the `booking` collection. */
export type BookingDoc = {
  _id: ObjectId;
  userId: string;
  userName: string;
  userEmail: string;
  programSlug: string;
  programTitle: string;
  /** Volunteer date, `YYYY-MM-DD`. */
  date: string;
  notes: string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
};

/** Booking as returned by the API to the client. */
export type Booking = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  programSlug: string;
  programTitle: string;
  date: string;
  notes: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isValidBookingDate(value: unknown): value is string {
  if (typeof value !== "string" || !DATE_RE.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime());
}

export function bookingFromDoc(doc: BookingDoc): Booking {
  return {
    id: doc._id.toString(),
    userId: doc.userId,
    userName: doc.userName,
    userEmail: doc.userEmail,
    programSlug: doc.programSlug,
    programTitle: doc.programTitle,
    date: doc.date,
    notes: doc.notes,
    status: doc.status,
    createdAt: new Date(doc.createdAt).toISOString(),
    updatedAt: new Date(doc.updatedAt).toISOString(),
  };
}
