import { Request, Response } from "express";
import CreateResponse from "../utils/response";
import UserService from "../services/user.service";
import { StatusCodes } from "http-status-codes";
import AppError, { BadRequestError, NotFoundError } from "../utils/errors";
import { NODE_ENV } from "../config/env";
import { IRegister } from "../types/dto/user.dto";
import crypto from "crypto";
import redisClient from "../config/redis";
import emailService from "../services/email.service";
import { resourceLimits } from "worker_threads";

export default class UserController {
  /********************* POST **********************/
  static async register(req: Request, res: Response) {
    const user: IRegister = req.body;

    try {
      const result = await UserService.register(user);

      res.cookie("token", result.token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      return CreateResponse.successful(
        res,
        StatusCodes.CREATED,
        "User created",
        result
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }
  /********************* POST **********************/
  static async login(req: Request, res: Response) {
    const email: string = req.body.email;
    const password: string = req.body.password;

    try {
      const result = await UserService.login(email, password);
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "User logged in",
        result
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }

  /********************* POST **********************/
  static async verify(req: Request, res: Response) {
    const userId = req.user?._id.toString()!;

    try {
      const result = await UserService.verify(userId);
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "User verified",
        result
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }

  /********************* POST **********************/
  static async logout(req: Request, res: Response) {
    res.clearCookie("token");
    return CreateResponse.successful(
      res,
      StatusCodes.OK,
      "User logged out",
      null
    );
  }

  /********************* POST **********************/
  static async sendOTP(req: Request, res: Response) {
    const email: string = req.body.email;
    if (!email) {
      throw new NotFoundError("Email is required");
    }

    try {
      await UserService.sendOTP(email);
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "User verified",
        null
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }

  /********************* POST **********************/
  static async verifyOTP(req: Request, res: Response) {
    const email: string = req.body.email;
    const otp: string = req.body.otp;

    try {
      const result = await UserService.verifyOTP(email, otp);
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      return CreateResponse.successful(
        res,
        StatusCodes.OK,
        "User logged in",
        result
      );
    } catch (error) {
      CreateResponse.error(res, error);
    }
  }
}
