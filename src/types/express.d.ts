import { Request } from "express";
import { JwtPayload } from "./global";

declare module "express" {
  export interface Request {
    user?: JwtPayload;
  }
}
