import { Request, Response } from "express";
import { ICreateEvent } from "../types/dto/event.dto";
import EventService from "../services/event.service";
import CreateResponse from "../utils/response";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors";

export default class EventController {
  static async createEvent(req: Request, res: Response) {
    const event: ICreateEvent = req.body;
    const user = req.user?._id.toString()!;
    const room = req.params.room;
    try {
      const result = await EventService.createEvent(room, user, event);
      return CreateResponse.successful(
        res,
        StatusCodes.CREATED,
        "Event created",
        result
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }

  static async getRoomEvents(req: Request, res: Response) {
    const room = req.params.room;
    const user = req.user?._id.toString()!;
    try {
      const events = await EventService.getRoomEvents(room, user);
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "Events fetched",
        events
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }

  static async getUserEvents(req: Request, res: Response) {
    const id = req.params.id;
    const user = req.user?._id.toString()!;

    try {
      const events = await EventService.getUserEvents(id, user);
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "Events fetched",
        events
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }

  static async getEventById(req: Request, res: Response) {
    const id = req.params.id;
    const user = req.user?._id.toString()!;

    try {
      const event = await EventService.getEventById(id, user);
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "Event fetched",
        event
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }

  static async updateEventById(req: Request, res: Response) {
    const id = req.params.id;
    const event = req.body;
    const user = req.user?._id.toString()!;

    try {
      const updatedEvent = await EventService.updateEventById(id, user, event);
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "Event updated",
        updatedEvent
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }

  static async deleteEventById(req: Request, res: Response) {
    const id = req.params.id;
    const user = req.user?._id.toString()!;

    try {
      const deletedEvent = await EventService.deleteEventById(id, user);
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "Event deleted",
        deletedEvent
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }
}
