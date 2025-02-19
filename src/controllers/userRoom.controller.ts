import { Request, Response } from "express";
import UserRoomService from "../services/userRoom.service";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors";
import { createResponse } from "../utils/response";
import { MongooseError } from "mongoose";
import { UserRoleEnum } from "../types/enums/enum";

export default class UserRoomController {
  /************ POST *************/
  static async joinRoom(req: Request, res: Response) {
    const user = req.user?._id.toString()!;
    const room = req.params.room;
    try {
      const result = await UserRoomService.joinRoom(user, room);
      return createResponse(
        res,
        StatusCodes.CREATED,
        "User joined room",
        result
      );
    } catch (error) {
      if (error instanceof AppError) {
        return createResponse(res, error.statusCode, error.message);
      }
    }
  }

  /************ POST *************/
  static async leaveRoom(req: Request, res: Response) {
    const user = req.user?._id.toString()!;
    const room = req.params.room;
    try {
      const result = await UserRoomService.leaveRoom(user, room);
      return createResponse(res, StatusCodes.OK, "User left room", result);
    } catch (error) {
      if (error instanceof AppError) {
        return createResponse(res, error.statusCode, error.message);
      }
    }
  }

  static async getUserRooms(req: Request, res: Response) {
    const user = req.user?._id.toString()!;
    try {
      const userRooms = await UserRoomService.getUserRooms(user);
      return createResponse(
        res,
        StatusCodes.OK,
        "User rooms fetched",
        userRooms
      );
    } catch (error) {
      if (error instanceof AppError) {
        return createResponse(res, error.statusCode, error.message);
      }
    }
  }

  static async getRoomUsers(req: Request, res: Response) {
    const room = req.params.room;
    try {
      const roomUsers = await UserRoomService.getRoomUsers(room);
      return createResponse(
        res,
        StatusCodes.OK,
        "Room users fetched",
        roomUsers
      );
    } catch (error) {
      if (error instanceof AppError) {
        return createResponse(res, error.statusCode, error.message);
      }
    }
  }

  static async grantRole(req: Request, res: Response) {
    const user = req.user?._id.toString()!;
    const room = req.params.room;
    const role = req.params.body;

    try {
      const result = await UserRoomService.grantRole(
        user,
        room,
        role as UserRoleEnum
      );
      return createResponse(res, StatusCodes.OK, "fetched user room", result);
    } catch (error) {
      if (error instanceof AppError) {
        return createResponse(res, error.statusCode, error.message);
      }
    }
  }
}
