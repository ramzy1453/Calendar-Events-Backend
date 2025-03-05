import express from "express";
import { redisSubscriber } from "../config/redis";

const router = express.Router();
const CHANNELS = ["new_event"];

router.get("/notifications", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  for (const channel of CHANNELS) {
    await redisSubscriber.subscribe(channel, (message, channel) => {
      try {
        console.log(`📥 Received ${channel} from Redis`);
        res.write(`data: ${JSON.parse(message)}\n\n`);
      } catch (error) {
        console.error(`❌ Error parsing Redis message from ${channel}:`, error);
      }
    });
  }

  req.on("close", () => {
    redisSubscriber.unsubscribe("new_event");
    console.log("🔌 SSE connection closed");
  });
});

export default router;
