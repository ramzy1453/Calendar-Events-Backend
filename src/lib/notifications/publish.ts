import redisClient from "../../config/redis";

export const publishNotification = async (channel: string, data: object) => {
  await redisClient.publish(channel, JSON.stringify(data));
};
