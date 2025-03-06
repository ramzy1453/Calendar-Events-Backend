import express, { Application } from "express";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { connectDB, runServer } from "./config";
import setupRoutes from "./routes";
import { FRONTEND_URL } from "./config/env";
import { initSocket } from "./config/socket";

const app: Application = express();
const server = http.createServer(app);

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

runServer(server);
connectDB();
initSocket(server);
// setupSubscriber();
