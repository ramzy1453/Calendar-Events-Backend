"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorMiddleware;
const errors_1 = __importDefault(require("../utils/errors"));
function errorMiddleware(err, req, res, next) {
    if (err instanceof errors_1.default) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message,
        });
    }
    else {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
