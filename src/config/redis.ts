import { createClient } from "redis";
import { REDIS_URL } from "./env";

const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

redisClient.connect().then(() => console.log("✅ Redis connected"));

export default redisClient;
