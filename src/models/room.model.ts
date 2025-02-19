import { model, Schema } from "mongoose";
import { IRoom } from "../types/models";

const roomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const roomModel = model<IRoom>("Room", roomSchema);
export default roomModel;
