import { Request, Response } from "express";
import UserRoomService from "../services/userRoom.service";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors";
import CreateResponse from "../utils/response";
import { MongooseError } from "mongoose";
import { UserRoleEnum } from "../types/enums/enum";
import { JwtUtils } from "../utils/jwt";

export default class UserRoomController {
  /************ POST *************/
  static async generateMagicLink(req: Request, res: Response) {
    const { room } = req.params;
    try {
      const link = await UserRoomService.generateMagicLink(room);
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "Magic link generated",
        { link }
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }

  /************ POST *************/

  static async joinRoomWithMagicLink(req: Request, res: Response) {
    const { url } = req.query;
    const user = req.user?._id.toString()!;

    try {
      if (!url) throw new AppError("Token is missing", StatusCodes.BAD_REQUEST);

      const decoded: any = JwtUtils.verifyToken(url as string);
      const roomId = decoded.roomId;

      const result = await UserRoomService.joinRoom(user, roomId);
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "User joined room via magic link",
        result
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }

  /************ POST *************/
  static async leaveRoom(req: Request, res: Response) {
    const user = req.user?._id.toString()!;
    const room = req.params.room;
    try {
      const result = await UserRoomService.leaveRoom(user, room);
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "User left room",
        result
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }

  static async getUserRooms(req: Request, res: Response) {
    const user = req.user?._id.toString()!;
    try {
      const userRooms = await UserRoomService.getUserRooms(user);
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "User rooms fetched",
        userRooms
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }

  static async getRoomMembers(req: Request, res: Response) {
    const room = req.params.room;
    try {
      const roomUsers = await UserRoomService.getRoomMembers(room);
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "Room users fetched",
        roomUsers
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }

  static async grantRole(req: Request, res: Response) {
    const user = req.params.user;
    const room = req.params.room;
    const role = req.params.body;

    try {
      const result = await UserRoomService.grantRole(
        user,
        room,
        role as UserRoleEnum
      );
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "fetched user room",
        result
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }
}
