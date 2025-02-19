import userRoomModel from "../models/userRoom.model";
import { UserRoleEnum } from "../types/enums/enum";
import { NotFoundError } from "../utils/errors";

export default class UserRoomService {
  static async joinRoom(user: string, room: string) {
    const existingUserRoom = await userRoomModel.findOne({ user, room });
    if (existingUserRoom) {
      throw new Error("User already in room");
    }

    const userRoom = await userRoomModel.create({ user, room });
    return userRoom;
  }

  static async leaveRoom(user: string, room: string) {
    const existingUserRoom = await userRoomModel.findOne({ user, room });
    if (!existingUserRoom) {
      throw new Error("User not in room");
    }

    const userRoom = await userRoomModel.findOneAndDelete({ user, room });
    return userRoom;
  }

  static async getUserRooms(user: string) {
    const userRooms = await userRoomModel.find({ user });
    return userRooms;
  }

  static async getRoomUsers(room: string) {
    const userRooms = await userRoomModel.find({ room });
    return userRooms;
  }

  static async grantRole(user: string, room: string, role: UserRoleEnum) {
    // todo : only someone with higher role can grant roles
    const userRoom = await userRoomModel.findOneAndUpdate(
      { user, room },
      { role },
      { new: true }
    );
    return userRoom;
  }
}
