import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB, runServer } from "./config";
import errorMiddleware from "./middlewares/error.middleware";
import setupRoutes from "./routes";
const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
setupRoutes(app);
app.use(errorMiddleware);

// Run server and connect to database
runServer(app);
connectDB();
