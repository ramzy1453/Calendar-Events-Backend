"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const event_controller_1 = __importDefault(require("../controllers/event.controller"));
exports.router = (0, express_1.Router)();
exports.router.post("/", event_controller_1.default.createEvent);
exports.router.get("/:id", event_controller_1.default.getEventById);
exports.router.get("/room/:room", event_controller_1.default.getRoomEvents);
exports.router.get("/user/:id", event_controller_1.default.getUserEvents);
exports.router.put("/:id", event_controller_1.default.updateEventById);
exports.router.delete("/:id", event_controller_1.default.deleteEventById);
exports.default = exports.router;
