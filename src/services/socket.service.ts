import userRoomModel from "../models/userRoom.model";
import { Socket } from "socket.io";
import { BadRequestError } from "../utils/errors";

export class SocketService {
  static async joinRoom(socket: Socket, user: string, room: string) {
    const existingUserRoom = await userRoomModel.findOne({ user, room });
    if (existingUserRoom) {
      throw new BadRequestError("User already in room");
    }

    await userRoomModel.create({ user, room });

    socket.join(room);
    console.log(`${user} joined the room ${room}`);

    socket.to(room).emit("user_joined", { user, room });
  }
}
