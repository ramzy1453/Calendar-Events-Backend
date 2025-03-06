import { redisClient } from "../config/redis";
import crypto from "crypto";

export const generateTempCode = async (roomId: string) => {
  const tempCode = crypto.randomInt(100000, 999999).toString();
  await redisClient.setEx(`room_code:${tempCode}`, 900, roomId);
  return tempCode;
};
