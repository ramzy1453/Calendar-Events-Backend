import { Server, Socket } from "socket.io";
import http from "http";
import { FRONTEND_URL } from "./env";
import { authSocketMiddleware } from "../middlewares/auth.middleware";

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: FRONTEND_URL,
      methods: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    },
  });

  io.use(authSocketMiddleware);

  io.on("connection", (socket: Socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getSocketInstance = () => {
  if (!io) {
    throw new Error("❌ Socket.io is not initialized!");
  }
  return io;
};
