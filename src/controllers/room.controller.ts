import { Request, Response } from "express";
import { IRoom } from "../types/models";
import RoomService from "../services/room.service";
import CreateResponse from "../utils/response";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors";
import { ICreateRoom, IUpdateRoom } from "../types/dto/room.dto";

export default class RoomController {
  static async createRoom(req: Request, res: Response) {
    const room: ICreateRoom = req.body;
    const owner = req.user?._id.toString()!;

    try {
      const newRoom = await RoomService.createRoom(owner, room);
      return CreateResponse.successful(
        res,
        StatusCodes.CREATED,
        "Room created",
        newRoom
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }

  static async getRooms(req: Request, res: Response) {
    try {
      const rooms = await RoomService.getRooms();
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "Rooms fetched",
        rooms
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }

  static async getRoomById(req: Request, res: Response) {
    const id: string = req.params.id;
    try {
      const room = await RoomService.getRoomById(id);
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "Room fetched",
        room
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }

  static async deleteRoomById(req: Request, res: Response) {
    const id: string = req.params.id;
    try {
      const room = await RoomService.deleteRoomById(id);
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "Room deleted",
        room
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }

  static async updateRoomById(req: Request, res: Response) {
    const id: string = req.params.id;
    const room: IUpdateRoom = req.body;
    try {
      const updatedRoom = await RoomService.updateRoomById(id, room);
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "Room updated",
        updatedRoom
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }
}
