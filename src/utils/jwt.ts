import * as jwt from "jsonwebtoken";
import { StringValue } from "ms";
import { JwtPayload } from "../types/global";
import { JWT_SECRET, JWT_EXPIRE } from "../config/env";

export class JwtUtils {
  private static jwtSecret = JWT_SECRET as string;
  private static jwtExpire = JWT_EXPIRE as string;

  static verifyToken(token: string) {
    return jwt.verify(token, this.jwtSecret) as JwtPayload;
  }

  static generateToken(payload: JwtPayload) {
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpire as StringValue,
    });
  }
}
