import { Socket } from "socket.io";
import { SocketService } from "../services/socket.service";

export const handleSocketEvents = (socket: Socket) => {
  socket.on("join_room", async (room: string) => {
    await SocketService.joinRoom(socket, socket.user?._id.toString()!, room);
    socket.emit("room_joined", room);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.user?._id} disconnect`);
  });
};
