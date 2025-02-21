import express, { Router, Application } from "express";
import userRouter from "./user.routes";
import roomRouter from "./room.routes";
import eventRouter from "./event.routes";
import { VERSION } from "../config/env";
import { authMiddleware } from "../middlewares/auth.middleware";
import errorMiddleware from "../middlewares/error.middleware";

export default function setupRoutes(app: Application) {
  const router = Router();

  router.use("/:room", express.static("public"));
  router.use("/user", userRouter);
  router.use("/room", authMiddleware, roomRouter);
  router.use("/event", authMiddleware, eventRouter);

  app.use(`/api/${VERSION}`, router);
  app.use(errorMiddleware);
}
