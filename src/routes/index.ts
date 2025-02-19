import express, { Router, Application } from "express";
import userRouter from "./user.routes";
import { VERSION } from "../config/env";

export default function setupRoutes(app: Application) {
  const router = Router();

  router.use("/", express.static("public"));
  router.use("/user", userRouter);

  app.use(`/api/${VERSION}`, router);
}
