import { Request, Response, NextFunction } from "express";
import { createResponse } from "../utils/response";
import { StatusCodes } from "http-status-codes";
import { JwtUtils } from "../utils/jwt";
import { UnauthorizedError } from "../utils/errors";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new UnauthorizedError("Access denied. Please log in.");
  }

  const payload = JwtUtils.verifyToken(token);
  if (!payload) {
    throw new UnauthorizedError("Access denied. Please log in.");
  }

  req.user = payload;
  next();
};
