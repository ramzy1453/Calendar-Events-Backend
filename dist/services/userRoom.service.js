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
const userRoom_model_1 = __importDefault(require("../models/userRoom.model"));
class UserRoomService {
    static joinRoom(user, room) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUserRoom = yield userRoom_model_1.default.findOne({ user, room });
            if (existingUserRoom) {
                throw new Error("User already in room");
            }
            const userRoom = yield userRoom_model_1.default.create({ user, room });
            return userRoom;
        });
    }
    static leaveRoom(user, room) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUserRoom = yield userRoom_model_1.default.findOne({ user, room });
            if (!existingUserRoom) {
                throw new Error("User not in room");
            }
            const userRoom = yield userRoom_model_1.default.findOneAndDelete({ user, room });
            return userRoom;
        });
    }
    static getUserRooms(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRooms = yield userRoom_model_1.default.find({ user });
            return userRooms;
        });
    }
    static getRoomUsers(room) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRooms = yield userRoom_model_1.default.find({ room });
            return userRooms;
        });
    }
    static grantRole(user, room, role) {
        return __awaiter(this, void 0, void 0, function* () {
            // todo : only someone with higher role can grant roles
            const userRoom = yield userRoom_model_1.default.findOneAndUpdate({ user, room }, { role }, { new: true });
            return userRoom;
        });
    }
}
exports.default = UserRoomService;
