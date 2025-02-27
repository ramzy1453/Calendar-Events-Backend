import path from "path";
import checkEnv from "../utils/env";
const CWD = process.cwd();
console.log(`\n🔵 Current working directory: ${CWD}`);
console.log(`Environment variables are loading... \n`);

export const logsRoot = path.join(CWD, "tmp");
export const PORT = checkEnv("PORT", "3000");
export const NODE_ENV = checkEnv("NODE_ENV", "development");
export const DB_URL = checkEnv("DB_URL", "mongodb://localhost:27017");
export const DB_NAME = checkEnv("DB_NAME", "mongo");
export const DB_PASS = checkEnv("DB_PASS", "mongo");
export const VERSION = checkEnv("VERSION", "v1");
export const JWT_SECRET = checkEnv("JWT_SECRET", "1234567");
export const JWT_EXPIRE = checkEnv("JWT_EXPIRE", "7d");
export const FRONTEND_URL = checkEnv("FRONTEND_URL", "http://localhost:3000");
export const REDIS_URL = checkEnv("REDIS_URL", "redis://localhost:6379");
export const BACKEND_URL = checkEnv(
  "BACKEND_URL",
  "http://localhost:5000/api/v1"
);

export const EMAIL_USER = checkEnv("EMAIL_USER", "email");
export const EMAIL_PASS = checkEnv("EMAIL_PASS", "password");
