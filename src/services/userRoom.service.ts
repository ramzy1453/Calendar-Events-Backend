import { Types } from "mongoose";
import { BACKEND_URL } from "../config/env";
import userRoomModel from "../models/userRoom.model";
import { UserRoleEnum } from "../types/enums/enum";
import { JwtUtils } from "../utils/jwt";
import { getSocketInstance } from "../config/socket";

export default class UserRoomService {
  static async generateMagicLink(roomId: string) {
    // todo : you can only share room only if you are a member of it

    const magicLink = JwtUtils.generateToken({ roomId }, { expiresIn: "1h" });

    return `${BACKEND_URL}/room/join?magicLink=${magicLink}`;
  }
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
    const rooms = await userRoomModel.aggregate([
      { $match: { user: new Types.ObjectId(user) } },
      {
        $lookup: {
          from: "rooms",
          localField: "room",
          foreignField: "_id",
          as: "room",
        },
      },
      { $unwind: "$room" },
      { $replaceRoot: { newRoot: "$room" } },
    ]);

    return rooms;
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
