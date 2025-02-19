"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const room_controller_1 = __importDefault(require("../controllers/room.controller"));
const userRoom_controller_1 = __importDefault(require("../controllers/userRoom.controller"));
exports.router = (0, express_1.Router)();
exports.router.post("/", room_controller_1.default.createRoom);
exports.router.get("/", room_controller_1.default.getRooms);
exports.router.get("/:id", room_controller_1.default.getRoomById);
exports.router.put("/:id", room_controller_1.default.updateRoomById);
exports.router.delete("/:id", room_controller_1.default.deleteRoomById);
exports.router.post("/join/:room", userRoom_controller_1.default.joinRoom);
exports.router.post("/leave/:room", userRoom_controller_1.default.joinRoom);
exports.router.post("/:room/grant", userRoom_controller_1.default.grantRole);
exports.default = exports.router;
