// lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cachedClient: mongoose.Mongoose | null = null;
let cachedDb: mongoose.Connection | null = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    cachedClient = await mongoose.connect(MONGODB_URI);
    cachedDb = cachedClient.connection;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }

  return { client: cachedClient, db: cachedDb };
}
