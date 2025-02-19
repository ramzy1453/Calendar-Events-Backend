import { Types } from "mongoose";
import { AccountEnum } from "./enums/enum";

declare type JwtPayload = {
  _id: Types.ObjectId;
};
