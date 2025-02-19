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
const user_model_1 = __importDefault(require("../models/user.model"));
const errors_1 = require("../utils/errors");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
class UserService {
    static register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user) {
                throw new errors_1.NotFoundError("User not found");
            }
            const salt = yield bcryptjs_1.default.genSalt(12);
            const hashedPassword = yield bcryptjs_1.default.hash(user.password, salt);
            const newUser = yield user_model_1.default.create(Object.assign(Object.assign({}, user), { password: hashedPassword }));
            const token = jwt_1.JwtUtils.generateToken({ _id: newUser._id });
            return { user: newUser, token };
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                throw new errors_1.NotFoundError("User not found");
            }
            const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
            if (!isValidPassword) {
                throw new errors_1.NotFoundError("Invalid password");
            }
            const token = jwt_1.JwtUtils.generateToken({ _id: user._id });
            return { user, token };
        });
    }
    static verify(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findById(userId);
            if (!user) {
                throw new errors_1.NotFoundError("User not found");
            }
            return user;
        });
    }
}
exports.default = UserService;
