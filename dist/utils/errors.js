"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayTimeoutError = exports.ServiceUnavailableError = exports.NotImplementedError = exports.InternalServerError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
class BadRequestError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends AppError {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends AppError {
    constructor(message) {
        super(message, 403);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class InternalServerError extends AppError {
    constructor(message) {
        super(message, 500);
    }
}
exports.InternalServerError = InternalServerError;
class NotImplementedError extends AppError {
    constructor(message) {
        super(message, 501);
    }
}
exports.NotImplementedError = NotImplementedError;
class ServiceUnavailableError extends AppError {
    constructor(message) {
        super(message, 503);
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
class GatewayTimeoutError extends AppError {
    constructor(message) {
        super(message, 504);
    }
}
exports.GatewayTimeoutError = GatewayTimeoutError;
exports.default = AppError;
