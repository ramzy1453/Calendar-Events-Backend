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

  static async getRoomEvents(req: Request, res: Response) {
    const room = req.params.room;
    try {
      const events = EventService.getRoomEvents(room);
      return createResponse(res, StatusCodes.OK, "Events fetched", events);
    } catch (error) {
      if (error instanceof AppError) {
        return createResponse(res, error.statusCode, error.message);
      }
    }
  }

  static async getUserEvents(req: Request, res: Response) {
    const user = req.params.id;
    try {
      const events = EventService.getUserEvents(user);
      return createResponse(res, StatusCodes.OK, "Events fetched", events);
    } catch (error) {
      if (error instanceof AppError) {
        return createResponse(res, error.statusCode, error.message);
      }
    }
  }

  static getEventById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const event = EventService.getEventById(id);
      return createResponse(res, StatusCodes.OK, "Event fetched", event);
    } catch (error) {
      if (error instanceof AppError) {
        return createResponse(res, error.statusCode, error.message);
      }
    }
  }

  static updateEventById(req: Request, res: Response) {
    const id = req.params.id;
    const event = req.body;
    try {
      const updatedEvent = EventService.updateEventById(id, event);
      return createResponse(res, StatusCodes.OK, "Event updated", updatedEvent);
    } catch (error) {
      if (error instanceof AppError) {
        return createResponse(res, error.statusCode, error.message);
      }
    }
  }

  static deleteEventById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const deletedEvent = EventService.deleteEventById(id);
      return createResponse(res, StatusCodes.OK, "Event deleted", deletedEvent);
    } catch (error) {
      if (error instanceof AppError) {
        return createResponse(res, error.statusCode, error.message);
      }
    }
  }
}
