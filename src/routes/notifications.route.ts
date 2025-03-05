import express from "express";
import { createClient } from "redis";

const router = express.Router();
const CHANNELS = ["new_event"];

router.get("/", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const subscriber = createClient();
  await subscriber.connect();

  for (const channel of CHANNELS) {
    await subscriber.subscribe(channel, (message, channel) => {
      try {
        console.log(`📥 Received ${channel} from Redis`);
        const data = JSON.stringify({
          type: channel,
          content: message,
        });
        res.write(`data: ${data}\n\n`);
      } catch (error) {
        console.error(`❌ Error parsing Redis message from ${channel}:`, error);
      }
    });
  }

  req.on("close", async () => {
    for (const channel of CHANNELS) {
      await subscriber.unsubscribe(channel);
    }
    await subscriber.quit();
    console.log("🔌 SSE connection closed");
  });
});

export default router;
