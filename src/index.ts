import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { connectDB, runServer } from "./config";
import setupRoutes from "./routes";
import { FRONTEND_URL } from "./config/env";
import userRoomModel from "./models/userRoom.model";
import userModel from "./models/user.model";
const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [FRONTEND_URL],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(morgan("dev"));

// Routes
setupRoutes(app);

// Run server and connect to database
runServer(app);
connectDB();

async function main() {
  const sharedRoom = await userModel.distinct("email", { name: "eren" });

  console.log({ sharedRoom });
}

main();
