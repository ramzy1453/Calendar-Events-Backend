import { Application } from "express";
import mongoose from "mongoose";
import { DB_URL, PORT } from "./env";

export async function runServer(app: Application) {
  app.listen(PORT, () => {
    console.log("✅ Server is running on port " + PORT);
  });
}
export async function connectDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
  }
}
