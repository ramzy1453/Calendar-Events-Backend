import roomModel from "../models/room.model";
import userRoomModel from "../models/userRoom.model";
import { ICreateRoom, IUpdateRoom } from "../types/dto/room.dto";
import { BadRequestError, NotFoundError } from "../utils/errors";
import UserRoomService from "./userRoom.service";

export default class RoomService {
  static async createRoom(owner: string, room: ICreateRoom) {
    if (!room || !owner) {
      throw new BadRequestError("Room data must be provided");
    }
    const newRoom = await roomModel.create({ owner, ...room });

    await UserRoomService.joinRoom(owner, newRoom._id.toString());

    return newRoom;
  }

  static async getRoomById(id: string, user: string) {
    const room = await roomModel.findById(id);

    if (!room) {
      throw new NotFoundError("Room not found");
    }

    const userInRoom = await userRoomModel.find({ room: id, user });
    if (!userInRoom) {
      throw new NotFoundError("Room not found");
    }

    return room;
  }

  static async deleteRoomById(id: string, user: string) {
    const room = await roomModel.findByIdAndDelete(id);
    if (!room) {
      throw new NotFoundError("Room not found");
    }

    const userInRoom = await userRoomModel.find({ room: id, user });
    if (!userInRoom) {
      throw new NotFoundError("Room not found");
    }

    return room;
  }

  static async updateRoomById(id: string, user: string, room: IUpdateRoom) {
    const updatedRoom = await roomModel.findByIdAndUpdate(id, room, {
      new: true,
    });
    if (!updatedRoom) {
      throw new NotFoundError("Room not found");
    }
    const userInRoom = await userRoomModel.find({ room: id, user });
    if (!userInRoom) {
      throw new NotFoundError("Room not found");
    }

    return updatedRoom;
  }
}
