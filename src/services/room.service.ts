import roomModel from "../models/room.model";
import { ICreateRoom, IUpdateRoom } from "../types/dto/room.dto";

export default class RoomService {
  static async createRoom(owner: string, room: ICreateRoom) {
    if (!room || !owner) {
    }
    const newRoom = await roomModel.create({ owner, room });
    return newRoom;
  }

  static async getRooms() {
    const rooms = await roomModel.find({});
    return rooms;
  }

  static async getRoomById(id: string) {
    const room = await roomModel.findById(id);
    if (!room) {
      throw new Error("Room not found");
    }

    return room;
  }

  static async deleteRoomById(id: string) {
    const room = await roomModel.findByIdAndDelete(id);
    if (!room) {
      throw new Error("Room not found");
    }

    return room;
  }

  static async updateRoomById(id: string, room: IUpdateRoom) {
    const updatedRoom = await roomModel.findByIdAndUpdate(id, room, {
      new: true,
    });
    if (!updatedRoom) {
      throw new Error("Room not found");
    }

    return updatedRoom;
  }
}
