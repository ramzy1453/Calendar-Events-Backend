"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_1 = require("../types/enums/enum");
const userRoomSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    role: {
        type: String,
        default: enum_1.UserRoleEnum.MEMBER,
    },
}, {
    timestamps: true,
});
const userRoomModel = (0, mongoose_1.model)("UserRoom", userRoomSchema);
exports.default = userRoomModel;
