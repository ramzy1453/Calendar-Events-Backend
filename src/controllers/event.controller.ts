import { Request, Response } from "express";
import { ICreateEvent } from "../types/dto/event.dto";
import EventService from "../services/event.service";
import { createResponse } from "../utils/response";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors";

export default class EventController {
  static async createEvent(req: Request, res: Response) {
    const event: ICreateEvent = req.body;
    const user = req.user?._id.toString()!;
    const room = req.params.id;
    try {
      const result = EventService.createEvent(room, user, event);
      return createResponse(res, StatusCodes.CREATED, "Event created", result);
    } catch (error) {
      if (error instanceof AppError) {
        return createResponse(res, error.statusCode, error.message);
      }
    }
  }
}
