"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponse = createResponse;
function createResponse(res, status, message, data) {
    if (data) {
        res.status(status).json({
            success: status >= 200 && status < 300,
            message,
            data,
        });
    }
    else {
        res.status(status).json({
            success: status >= 200 && status < 300,
            message,
        });
    }
}
