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
const response_1 = __importDefault(require("../utils/response"));
const user_service_1 = __importDefault(require("../services/user.service"));
const http_status_codes_1 = require("http-status-codes");
const env_1 = require("../config/env");
class UserController {
    /********************* POST **********************/
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            try {
                const result = yield user_service_1.default.register(user);
                res.cookie("token", result.token, {
                    httpOnly: true,
                    secure: env_1.NODE_ENV === "production",
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                });
                return response_1.default.successful(res, http_status_codes_1.StatusCodes.CREATED, "User created", result);
            }
            catch (error) {
                response_1.default.error(res, error);
            }
        });
    }
    /********************* POST **********************/
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const password = req.body.password;
            try {
                const result = yield user_service_1.default.login(email, password);
                res.cookie("token", result.token, {
                    httpOnly: true,
                    secure: env_1.NODE_ENV === "production",
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                });
                return response_1.default.successful(res, http_status_codes_1.StatusCodes.OK, "User logged in", result);
            }
            catch (error) {
                response_1.default.error(res, error);
            }
        });
    }
    /********************* POST **********************/
    static verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString();
            try {
                const result = yield user_service_1.default.verify(userId);
                return response_1.default.successful(res, http_status_codes_1.StatusCodes.OK, "User verified", result);
            }
            catch (error) {
                response_1.default.error(res, error);
            }
        });
    }
    /********************* POST **********************/
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie("token");
            return response_1.default.successful(res, http_status_codes_1.StatusCodes.OK, "User logged out", null);
        });
    }
}
exports.default = UserController;
