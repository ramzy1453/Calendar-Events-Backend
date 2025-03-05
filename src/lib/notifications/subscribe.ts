import { redisSubscriber } from "../../config/redis";
import { getSocketInstance } from "../../config/socket";

const CHANNELS = ["new_event"];

export const setupSubscriber = async () => {
  const io = getSocketInstance();

  for (const channel of CHANNELS) {
    await redisSubscriber.subscribe(channel, (message, channel) => {
      try {
        const event = JSON.parse(message);
        console.log(`📥 Received ${channel} from Redis`);

        io.emit(channel, event);
      } catch (error) {
        console.error(`❌ Error parsing Redis message from ${channel}:`, error);
      }
    });
  }

  console.log(`✅ Listening for Redis events: ${CHANNELS.join(", ")}`);
};
