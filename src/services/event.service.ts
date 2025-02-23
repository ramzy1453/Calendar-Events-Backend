import eventModel from "../models/event.model";
import { ICreateEvent } from "../types/dto/event.dto";
import { BadRequestError, NotFoundError } from "../utils/errors";

export default class EventService {
  static async createEvent(room: string, user: string, event: ICreateEvent) {
    if (!event || !room || !user) {
      throw new BadRequestError("Event data is required");
    }
    // todo : verify is the user is member of the room
    const { date, name, description } = event;
    const newEvent = await eventModel.create({
      room,
      user,
      name,
      description,
      date: new Date(date),
    });
    return newEvent;
  }

  static async getRoomEvents(room: string) {
    // todo : verify is the room belongs to one of the rooms of the user

    const events = await eventModel
      .find({ room })
      .populate("user")
      .populate({ path: "room", select: "name" });

    return events;
  }

  static async getUserEvents(user: string) {
    // todo : verify that we share same room
    const events = await eventModel.find({ user });
    return events;
  }

  static async getEventById(id: string) {
    // todo : verify is the event belongs to one of the rooms of the user
    const event = await eventModel.findOne({ _id: id }).populate("user");
    if (!event) {
      throw new NotFoundError("Event not found");
    }
    return event;
  }

  static async updateEventById(id: string, event: ICreateEvent) {
    // todo : verify is the event belongs to one of the rooms of the user
    const updatedEvent = await eventModel.findOneAndUpdate({ _id: id }, event, {
      new: true,
    });
    if (!updatedEvent) {
      throw new Error("Event not found");
    }

    return updatedEvent;
  }

  static async deleteEventById(id: string) {
    // todo : verify is the event belongs to one of the rooms of the user
    const deletedEvent = await eventModel.findOneAndDelete({ _id: id });
    if (!deletedEvent) {
      throw new Error("Event not found");
    }

    return deletedEvent;
  }
}
