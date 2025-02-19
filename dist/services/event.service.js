"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_model_1 = __importDefault(require("../models/event.model"));
class EventService {
    static createEvent(room, user, event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!event || !room || !user) {
                throw new Error("Event data is required");
            }
            // todo : verify is the user is member of the room
            const newEvent = yield event_model_1.default.create({ room, user, event });
            return newEvent;
        });
    }
    static getRoomEvents(room) {
        return __awaiter(this, void 0, void 0, function* () {
            // todo : verify is the room belongs to one of the rooms of the user
            const events = yield event_model_1.default.find({ room });
            return events;
        });
    }
    static getUserEvents(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // todo : verify that we share same room
            const events = yield event_model_1.default.find({ user });
            return events;
        });
    }
    static getEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // todo : verify is the event belongs to one of the rooms of the user
            const event = yield event_model_1.default.findOne({ _id: id });
            return event;
        });
    }
    static updateEventById(id, event) {
        return __awaiter(this, void 0, void 0, function* () {
            // todo : verify is the event belongs to one of the rooms of the user
            const updatedEvent = yield event_model_1.default.findOneAndUpdate({ _id: id }, event, {
                new: true,
            });
            if (!updatedEvent) {
                throw new Error("Event not found");
            }
            return updatedEvent;
        });
    }
    static deleteEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // todo : verify is the event belongs to one of the rooms of the user
            const deletedEvent = yield event_model_1.default.findOneAndDelete({ _id: id });
            if (!deletedEvent) {
                throw new Error("Event not found");
            }
            return deletedEvent;
        });
    }
}
exports.default = EventService;
