import { model, Schema } from "mongoose";
import { IRoom } from "../types/models";
import autoPopulatePlugin from "../utils/db";

const roomSchema = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

roomSchema.plugin(autoPopulatePlugin);
const roomModel = model<IRoom>("Room", roomSchema);

export default roomModel;
