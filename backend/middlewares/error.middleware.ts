import { AppError, ErrorCodes } from "../appError";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const STATUS_BY_CODE = new Map<ErrorCodes, number>([
  [ErrorCodes.USER_EXIST, 409],
  [ErrorCodes.USER_NOT_FOUND, 404],
  [ErrorCodes.TOKEN_ERROR, 401],
  [ErrorCodes.INVALID_CREDENTIALS, 400],
]);

const ERROR_MESSAGE_BY_CODE = new Map<ErrorCodes, string>([
  [ErrorCodes.USER_EXIST, "User with this email already exists"],
  [ErrorCodes.USER_NOT_FOUND, "User not found"],
  [ErrorCodes.TOKEN_ERROR, "Not authenticated"],
  [ErrorCodes.INVALID_CREDENTIALS, "Invalid email or password"],
]);

const DEFAULT_STATUS = 500;
const DEFAULT_MESSAGE = "Internal Server Error";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("error middleware", error);

  if (error instanceof AppError) {
    const status = STATUS_BY_CODE.get(error.code) ?? DEFAULT_STATUS;
    const message = ERROR_MESSAGE_BY_CODE.get(error.code) ?? DEFAULT_MESSAGE;

    return res.status(status).json({ message });
  }

  if (
    error instanceof jwt.JsonWebTokenError ||
    error instanceof jwt.TokenExpiredError
  ) {
    const status = STATUS_BY_CODE.get(ErrorCodes.TOKEN_ERROR) ?? DEFAULT_STATUS;
    const message =
      ERROR_MESSAGE_BY_CODE.get(ErrorCodes.TOKEN_ERROR) ?? DEFAULT_MESSAGE;

    return res.status(status).json({ message });
  }

  return res.status(DEFAULT_STATUS).json({
    message: DEFAULT_MESSAGE,
  });
};
