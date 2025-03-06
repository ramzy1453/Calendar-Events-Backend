import userModel from "../models/user.model";
import { IUser } from "../types/models";
import { BadRequestError, NotFoundError } from "../utils/errors";
import bcrypt from "bcryptjs";
import { JwtUtils } from "../utils/jwt";
import { IRegister } from "../types/dto/user.dto";
import crypto from "crypto";
import emailService from "./email.service";
import redisClient from "../config/redis";

export default class UserService {
  static async register(user: IRegister) {
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(user.password, salt);
    const newUser = await userModel.create({
      ...user,
      password: hashedPassword,
    });
    const token = JwtUtils.generateToken({ _id: newUser._id });

    return { user: newUser, token };
  }

  static async login(email: string, password: string) {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new NotFoundError("Invalid password");
    }

    const token = JwtUtils.generateToken({ _id: user._id });

    return { user, token };
  }

  static async verify(userId: string) {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }
  static async sendOTP(email: string) {
    const otp = crypto.randomInt(100000, 999999).toString();
    await redisClient.setEx(`otp:${email}`, 60, otp);
    await emailService.sendEmail(email, "Your OTP Code", otp);
  }
  static async verifyOTP(email: string, otp: string) {
    const storedOtp = await redisClient.get(`otp:${email}`);
    if (!storedOtp || storedOtp !== otp) {
      throw new BadRequestError("Invalid or expired OTP");
    }

    await redisClient.del(`otp:${email}`);

    const user = await userModel.findOne({ email });
    const token = JwtUtils.generateToken({ _id: user?.id });

    // Stock the session in Redis for 7 days
    await redisClient.setEx(`session:${email}`, 604800, token);

    return { user, token };
  }
}
