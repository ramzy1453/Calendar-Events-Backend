import { Types } from "mongoose";
import { UserRoleEnum } from "./enums/enum";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IRoom {
  _id: Types.ObjectId;
  name: string;
  description: string;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvent {
  _id: Types.ObjectId;
  name: string;
  description: string;
  date: Date;
  room: Types.ObjectId;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserRoom {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  room: Types.ObjectId;
  role: UserRoleEnum;
  createdAt: Date;
  updatedAt: Date;
}
