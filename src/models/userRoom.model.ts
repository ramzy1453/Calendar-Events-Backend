import { Schema, model } from "mongoose";
import { IUserRoom } from "../types/models";
import { UserRoleEnum } from "../types/enums/enum";
import autoPopulatePlugin from "../utils/db";

const userRoomSchema = new Schema<IUserRoom>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    role: {
      type: String,
      default: UserRoleEnum.MEMBER,
    },
  },
  {
    timestamps: true,
  }
);

const userRoomModel = model<IUserRoom>("UserRoom", userRoomSchema);
export default userRoomModel;
