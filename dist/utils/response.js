"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = __importDefault(require("./errors"));
const mongoose_1 = require("mongoose");
const http_status_codes_1 = require("http-status-codes");
class CreateResponse {
    static successful(res, status, message, data) {
        res.status(status).json({
            success: true,
            message,
            data,
        });
    }
    static error(res, err) {
        if (err instanceof errors_1.default) {
            return res.status(err.statusCode).json({
                success: false,
                message: err.message,
            });
        }
        else if (err instanceof mongoose_1.MongooseError) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: err.message,
            });
        }
        else {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: err.message,
            });
        }
    }
}
exports.default = CreateResponse;
