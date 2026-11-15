import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI!;

/**
 * Single shared MongoDB connection.
 *
 * Reused by Better Auth (see `src/lib/auth.ts`) and by the booking API
 * routes so we never open more than one pool. The global cache keeps
 * `next dev` hot-reload from leaking a new client on every edit.
 */
const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClient?: MongoClient;
};

export const client: MongoClient =
  globalWithMongo._mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalWithMongo._mongoClient = client;
}

export const db: Db = client.db("Volunteer_Website");
