"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const errors_1 = require("../utils/errors");
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        throw new errors_1.UnauthorizedError("Access denied. Please log in.");
    }
    const payload = jwt_1.JwtUtils.verifyToken(token);
    if (!payload) {
        throw new errors_1.UnauthorizedError("Access denied. Please log in.");
    }
    req.user = payload;
    next();
};
exports.authMiddleware = authMiddleware;
