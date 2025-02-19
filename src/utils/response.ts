import { Response } from "express";

export function createResponse<T>(
  res: Response,
  status: number,
  message: string,
  data?: T
) {
  if (data) {
    res.status(status).json({
      success: status >= 200 && status < 300,
      message,
      data,
    });
  } else {
    res.status(status).json({
      success: status >= 200 && status < 300,
      message,
    });
  }
}
