import { Request, Response, NextFunction } from "express";
import { JwtUtils } from "../utils/jwt";
import { UnauthorizedError } from "../utils/errors";
import { JwtPayload } from "../types/global";
import { Socket } from "socket.io";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;
  if (!token) {
    throw new UnauthorizedError("Access denied. Please log in.");
  }

  const payload = JwtUtils.verifyToken<JwtPayload>(token);
  if (!payload) {
    throw new UnauthorizedError("Access denied. Please log in.");
  }

  req.user = payload;
  next();
};

export const authSocketMiddleware = (
  socket: Socket,
  next: (err?: any) => void
) => {
  const token =
    socket.handshake.auth?.token || socket.handshake.headers.authorization;

  if (!token) {
    return next(new Error("Authentication error"));
  }

  try {
    const payload = JwtUtils.verifyToken<JwtPayload>(token);
    (socket as any).user = payload;
    next();
  } catch (error) {
    return next(new Error("Invalid token"));
  }
};
