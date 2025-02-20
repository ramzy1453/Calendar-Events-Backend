import { Request, Response, NextFunction } from "express";
import { JwtUtils } from "../utils/jwt";
import { UnauthorizedError } from "../utils/errors";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;
  console.log({ token });
  if (!token) {
    throw new UnauthorizedError("Access denied. Please log in.");
  }

  const payload = JwtUtils.verifyToken(token);
  console.log({ payload, token });
  if (!payload) {
    throw new UnauthorizedError("Access denied. Please log in.");
  }

  req.user = payload;
  next();
};
