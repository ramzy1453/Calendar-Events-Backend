"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
exports.router = (0, express_1.Router)();
exports.router.post("/register", user_controller_1.default.register);
exports.router.post("/login", user_controller_1.default.login);
exports.router.post("/verify", auth_middleware_1.authMiddleware, user_controller_1.default.verify);
exports.router.post("/logout", auth_middleware_1.authMiddleware, user_controller_1.default.logout);
exports.default = exports.router;
