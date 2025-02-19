import userModel from "../models/user.model";
import { IUser } from "../types/models";
import { NotFoundError } from "../utils/errors";
import bcrypt from "bcryptjs";
import { JwtUtils } from "../utils/jwt";

export default class UserService {
  static async register(user: IUser) {
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const newUser = await userModel.create(user);
    const token = JwtUtils.generateToken({ _id: user._id });

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

  static async verifyToken(token: string) {
    const payload = JwtUtils.verifyToken(token);
    if (!payload) {
      throw new NotFoundError("Invalid token");
    }

    const user = await userModel.findById(payload._id);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }
}
