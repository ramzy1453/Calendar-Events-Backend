"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupRoutes;
const express_1 = __importStar(require("express"));
const user_routes_1 = __importDefault(require("./user.routes"));
const room_routes_1 = __importDefault(require("./room.routes"));
const event_routes_1 = __importDefault(require("./event.routes"));
const env_1 = require("../config/env");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
function setupRoutes(app) {
    const router = (0, express_1.Router)();
    router.use("/", express_1.default.static("public"));
    router.use("/user", user_routes_1.default);
    router.use("/room", auth_middleware_1.authMiddleware, room_routes_1.default);
    router.use("/event", auth_middleware_1.authMiddleware, event_routes_1.default);
    app.use(`/api/${env_1.VERSION}`, router);
    app.use(error_middleware_1.default);
}
