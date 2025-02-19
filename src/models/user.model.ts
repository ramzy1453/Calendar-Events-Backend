import { model, Schema } from "mongoose";
import { IUser } from "../types/models";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model<IUser>("User", userSchema);
export default userModel;
