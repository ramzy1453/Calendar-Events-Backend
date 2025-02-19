import userRoomModel from "../models/userRoom.model";
import { UserRoleEnum } from "../types/enums/enum";
import { NotFoundError } from "../utils/errors";

export default class UserRoomService {
  static async joinRoom(user: string, room: string) {
    const existingUserRoom = await userRoomModel.findOne({ user, room });
    if (existingUserRoom) {
      throw new Error("User already in room");
    }

    await userRoomModel.create({ user, room });
    return null;
  }

  static async leaveRoom(user: string, room: string) {
    const existingUserRoom = await userRoomModel.findOne({ user, room });
    if (!existingUserRoom) {
      throw new Error("User not in room");
    }

    await userRoomModel.findOneAndDelete({ user, room });
    return null;
  }

  static async getUserRooms(user: string) {
    const userRooms = await userRoomModel
      .find({ user })
      .select("-_id -user")
      .populate("room");
    return userRooms;
  }

  static async getRoomMembers(room: string) {
    const roomUsers = await userRoomModel
      .find({ room })
      .select("-_id -room")
      .populate("user");
    return roomUsers;
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
