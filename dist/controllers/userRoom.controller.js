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
const userRoom_service_1 = __importDefault(require("../services/userRoom.service"));
const http_status_codes_1 = require("http-status-codes");
const response_1 = __importDefault(require("../utils/response"));
class UserRoomController {
    /************ POST *************/
    static joinRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString();
            const room = req.params.room;
            try {
                const result = yield userRoom_service_1.default.joinRoom(user, room);
                return response_1.default.successful(res, http_status_codes_1.StatusCodes.CREATED, "User joined room", result);
            }
            catch (error) {
                response_1.default.error(res, error);
            }
        });
    }
    /************ POST *************/
    static leaveRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString();
            const room = req.params.room;
            try {
                const result = yield userRoom_service_1.default.leaveRoom(user, room);
                return response_1.default.successful(res, http_status_codes_1.StatusCodes.OK, "User left room", result);
            }
            catch (error) {
                response_1.default.error(res, error);
            }
        });
    }
    static getUserRooms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString();
            try {
                const userRooms = yield userRoom_service_1.default.getUserRooms(user);
                return response_1.default.successful(res, http_status_codes_1.StatusCodes.OK, "User rooms fetched", userRooms);
            }
            catch (error) {
                response_1.default.error(res, error);
            }
        });
    }
    static getRoomMembers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = req.params.room;
            try {
                const roomUsers = yield userRoom_service_1.default.getRoomMembers(room);
                return response_1.default.successful(res, http_status_codes_1.StatusCodes.OK, "Room users fetched", roomUsers);
            }
            catch (error) {
                response_1.default.error(res, error);
            }
        });
    }
    static grantRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString();
            const room = req.params.room;
            const role = req.params.body;
            try {
                const result = yield userRoom_service_1.default.grantRole(user, room, role);
                return response_1.default.successful(res, http_status_codes_1.StatusCodes.OK, "fetched user room", result);
            }
            catch (error) {
                response_1.default.error(res, error);
            }
        });
    }
}
exports.default = UserRoomController;
