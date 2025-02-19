import { Request } from "express";
import { JwtPayload } from "./global";

declare module "express" {
  interface Request {
    user?: JwtPayload;
  }
}
