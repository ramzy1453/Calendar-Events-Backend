"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const env_1 = require("./env");
const redisClient = (0, redis_1.createClient)({
    url: env_1.REDIS_URL,
});
redisClient.on("error", (err) => console.error("❌ Redis Error:", err));
redisClient.connect().then(() => console.log("✅ Redis connected"));
exports.default = redisClient;
