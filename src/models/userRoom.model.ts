import { Schema, model } from "mongoose";
import { IUserRoom } from "../types/models";

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
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userRoomModel = model<IUserRoom>("UserRoom", userRoomSchema);
export default userRoomModel;
