import { Response } from "express";
import AppError from "./errors";
import { Mongoose, MongooseError } from "mongoose";
import { StatusCodes } from "http-status-codes";

export default class CreateResponse {
  static successful<T>(
    res: Response,
    status: number,
    message: string,
    data: T
  ) {
    res.status(status).json({
      success: true,
      message,
      data,
    });
  }
  static error(res: Response, err: unknown) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        data: null,
      });
    } else if (err instanceof MongooseError) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
        data: null,
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: (err as any).message,
        data: null,
      });
    }
  }
}
