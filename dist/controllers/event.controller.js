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
const event_service_1 = __importDefault(require("../services/event.service"));
const response_1 = require("../utils/response");
const http_status_codes_1 = require("http-status-codes");
const errors_1 = __importDefault(require("../utils/errors"));
class EventController {
    static createEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const event = req.body;
            const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString();
            const room = req.params.id;
            try {
                const result = event_service_1.default.createEvent(room, user, event);
                return (0, response_1.createResponse)(res, http_status_codes_1.StatusCodes.CREATED, "Event created", result);
            }
            catch (error) {
                if (error instanceof errors_1.default) {
                    return (0, response_1.createResponse)(res, error.statusCode, error.message);
                }
            }
        });
    }
    static getRoomEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = req.params.room;
            try {
                const events = event_service_1.default.getRoomEvents(room);
                return (0, response_1.createResponse)(res, http_status_codes_1.StatusCodes.OK, "Events fetched", events);
            }
            catch (error) {
                if (error instanceof errors_1.default) {
                    return (0, response_1.createResponse)(res, error.statusCode, error.message);
                }
            }
        });
    }
    static getUserEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.params.id;
            try {
                const events = event_service_1.default.getUserEvents(user);
                return (0, response_1.createResponse)(res, http_status_codes_1.StatusCodes.OK, "Events fetched", events);
            }
            catch (error) {
                if (error instanceof errors_1.default) {
                    return (0, response_1.createResponse)(res, error.statusCode, error.message);
                }
            }
        });
    }
    static getEventById(req, res) {
        const id = req.params.id;
        try {
            const event = event_service_1.default.getEventById(id);
            return (0, response_1.createResponse)(res, http_status_codes_1.StatusCodes.OK, "Event fetched", event);
        }
        catch (error) {
            if (error instanceof errors_1.default) {
                return (0, response_1.createResponse)(res, error.statusCode, error.message);
            }
        }
    }
    static updateEventById(req, res) {
        const id = req.params.id;
        const event = req.body;
        try {
            const updatedEvent = event_service_1.default.updateEventById(id, event);
            return (0, response_1.createResponse)(res, http_status_codes_1.StatusCodes.OK, "Event updated", updatedEvent);
        }
        catch (error) {
            if (error instanceof errors_1.default) {
                return (0, response_1.createResponse)(res, error.statusCode, error.message);
            }
        }
    }
    static deleteEventById(req, res) {
        const id = req.params.id;
        try {
            const deletedEvent = event_service_1.default.deleteEventById(id);
            return (0, response_1.createResponse)(res, http_status_codes_1.StatusCodes.OK, "Event deleted", deletedEvent);
        }
        catch (error) {
            if (error instanceof errors_1.default) {
                return (0, response_1.createResponse)(res, error.statusCode, error.message);
            }
        }
    }
}
exports.default = EventController;
