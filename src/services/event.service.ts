import { redisClient } from "../config/redis";
import { getSocketInstance } from "../config/socket";
import { publishNotification } from "../lib/notifications/publish";
import eventModel from "../models/event.model";
import userRoomModel from "../models/userRoom.model";
import { ICreateEvent } from "../types/dto/event.dto";
import { BadRequestError, NotFoundError } from "../utils/errors";

export default class EventService {
  static async createEvent(room: string, user: string, event: ICreateEvent) {
    if (!event || !room || !user) {
      throw new BadRequestError("Event data is required");
    }

    const userInRoom = await userRoomModel.find({ user, room });
    if (!userInRoom) {
      throw new NotFoundError("Room not found");
    }

    const { date, name, description } = event;
    const newEvent = await eventModel.create({
      room,
      user,
      name,
      description,
      date: new Date(date),
    });

    const populatedEvent = await newEvent.populate("user room");

    await publishNotification("new_event", populatedEvent);

    const io = getSocketInstance();
    io.emit("new_event", populatedEvent);
    return populatedEvent;
  }

  static async getRoomEvents(room: string, user: string) {
    const userInRoom = await userRoomModel.find({ user, room });
    if (!userInRoom) {
      throw new NotFoundError("Room not found");
    }

    const events = await eventModel
      .find({ room })
      .populate("user")
      .populate({ path: "room", select: "name" });

    return events;
  }

  static async getUserEvents(id: string, user: string) {
    const userRooms = await userRoomModel.distinct("room", { user: id });

    const sharedRoom = await userRoomModel.findOne({
      user: user,
      room: { $in: userRooms },
    });

    if (!sharedRoom) {
      throw new NotFoundError("Room not found");
    }

    const events = await eventModel.find({ user: id });
    return events;
  }

  static async getEventById(id: string, user: string) {
    const userRooms = await userRoomModel.distinct("room", { user });

    const event = await eventModel
      .findOne({ _id: id, room: { $in: userRooms } })
      .populate("user");

    if (!event) {
      throw new NotFoundError("Event not found or not accessible");
    }

    return event;
  }

  static async updateEventById(id: string, user: string, event: ICreateEvent) {
    const userRooms = await userRoomModel.distinct("room", { user });

    const existingEvent = await eventModel.findOne({
      _id: id,
      room: { $in: userRooms },
    });

    if (!existingEvent) {
      throw new Error("Event not found or not accessible");
    }

    const updatedEvent = await eventModel.findOneAndUpdate({ _id: id }, event, {
      new: true,
    });

    return updatedEvent;
  }
  static async deleteEventById(id: string, user: string) {
    const userRooms = await userRoomModel.distinct("room", { user });

    const existingEvent = await eventModel.findOne({
      _id: id,
      room: { $in: userRooms },
    });

    if (!existingEvent) {
      throw new Error("Event not found or not accessible");
    }

    const deletedEvent = await eventModel.findOneAndDelete({ _id: id });

    return deletedEvent;
  }
}
