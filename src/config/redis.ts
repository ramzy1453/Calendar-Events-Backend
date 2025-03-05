import { createClient } from "redis";
import { REDIS_URL } from "./env";

export const redisClient = createClient({ url: REDIS_URL });
export const redisPublisher = createClient({ url: REDIS_URL });
export const redisSubscriber = createClient({ url: REDIS_URL });

[redisClient, redisPublisher, redisSubscriber].forEach((client) => {
  client.on("error", (err) => console.error("❌ Redis Error:", err));
});

Promise.all([
  redisClient.connect(),
  redisPublisher.connect(),
  redisSubscriber.connect(),
]).then(() => console.log("✅ Redis connected"));

export default redisClient;
