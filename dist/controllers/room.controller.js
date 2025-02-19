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
const room_service_1 = __importDefault(require("../services/room.service"));
const response_1 = __importDefault(require("../utils/response"));
const http_status_codes_1 = require("http-status-codes");
class RoomController {
    static createRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const name = req.body.name;
            const owner = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString();
            console.log({ owner });
            try {
                const newRoom = yield room_service_1.default.createRoom(owner, { name });
                return response_1.default.successful(res, http_status_codes_1.StatusCodes.CREATED, "Room created", newRoom);
            }
            catch (error) {
                response_1.default.error(res, error);
            }
        });
    }
    static getRooms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield room_service_1.default.getRooms();
                return response_1.default.successful(res, http_status_codes_1.StatusCodes.OK, "Rooms fetched", rooms);
            }
            catch (error) {
                response_1.default.error(res, error);
            }
        });
    }
    static getRoomById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const room = yield room_service_1.default.getRoomById(id);
                return response_1.default.successful(res, http_status_codes_1.StatusCodes.OK, "Room fetched", room);
            }
            catch (error) {
                response_1.default.error(res, error);
            }
        });
    }
    static deleteRoomById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const room = yield room_service_1.default.deleteRoomById(id);
                return response_1.default.successful(res, http_status_codes_1.StatusCodes.OK, "Room deleted", room);
            }
            catch (error) {
                response_1.default.error(res, error);
            }
        });
    }
    static updateRoomById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const room = req.body;
            try {
                const updatedRoom = yield room_service_1.default.updateRoomById(id, room);
                return response_1.default.successful(res, http_status_codes_1.StatusCodes.OK, "Room updated", updatedRoom);
            }
            catch (error) {
                response_1.default.error(res, error);
            }
        });
    }
}
exports.default = RoomController;
