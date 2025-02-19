"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkEnv;
require("dotenv/config");
function checkEnv(envField, defaultValue) {
    const envValue = process.env[envField];
    if (envValue) {
        console.log(`🟢 Found ${envField} in env with value`);
        return envValue;
    }
    else {
        console.log(`🔴 Not found ${envField} Using default`);
        return defaultValue;
    }
}
