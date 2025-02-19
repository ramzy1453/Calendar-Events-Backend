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
const room_model_1 = __importDefault(require("../models/room.model"));
const errors_1 = require("../utils/errors");
const userRoom_service_1 = __importDefault(require("./userRoom.service"));
class RoomService {
    static createRoom(owner, room) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!room || !owner) {
                throw new errors_1.BadRequestError("Room data must be provided");
            }
            const newRoom = yield room_model_1.default.create({ owner, room });
            yield userRoom_service_1.default.joinRoom(owner, newRoom._id.toString());
            return newRoom;
        });
    }
    static getRooms() {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield room_model_1.default.find({});
            return rooms;
        });
    }
    static getRoomById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield room_model_1.default.findById(id);
            // todo : verify if you are member of this room
            if (!room) {
                throw new Error("Room not found");
            }
            return room;
        });
    }
    static deleteRoomById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield room_model_1.default.findByIdAndDelete(id);
            if (!room) {
                throw new Error("Room not found");
            }
            return room;
        });
    }
    static updateRoomById(id, room) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedRoom = yield room_model_1.default.findByIdAndUpdate(id, room, {
                new: true,
            });
            if (!updatedRoom) {
                throw new Error("Room not found");
            }
            return updatedRoom;
        });
    }
}
exports.default = RoomService;
