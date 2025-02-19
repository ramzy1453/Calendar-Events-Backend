import { model, Schema } from "mongoose";
import { IEvent } from "../types/models";

const eventSchema = new Schema<IEvent>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const eventModel = model<IEvent>("Event", eventSchema);
export default eventModel;
