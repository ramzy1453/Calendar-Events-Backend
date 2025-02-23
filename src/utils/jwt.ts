import * as jwt from "jsonwebtoken";
import { StringValue } from "ms";
import { JwtPayload } from "../types/global";
import { JWT_SECRET, JWT_EXPIRE } from "../config/env";

export class JwtUtils {
  private static jwtSecret = JWT_SECRET as string;
  private static jwtExpire = JWT_EXPIRE as string;

  static verifyToken<T>(token: string) {
    return jwt.verify(token, this.jwtSecret) as T;
  }

  static generateToken<T extends object>(
    payload: T,
    options?: jwt.SignOptions
  ) {
    return jwt.sign(
      payload,
      this.jwtSecret,
      options || {
        expiresIn: this.jwtExpire as StringValue,
      }
    );
  }
}
