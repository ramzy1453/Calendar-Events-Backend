"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const db_1 = __importDefault(require("../utils/db"));
const roomSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
roomSchema.plugin(db_1.default);
const roomModel = (0, mongoose_1.model)("Room", roomSchema);
exports.default = roomModel;
