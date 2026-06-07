import { AppError, ErrorCodes } from "../appError";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const ERROR_CONFIG: Record<
  ErrorCodes,
  { status: number; message: string }
> = {
  [ErrorCodes.USER_EXIST]: {
    status: 409,
    message: "User with this email already exists",
  },
  [ErrorCodes.USER_NOT_FOUND]: {
    status: 404,
    message: "User not found",
  },
  [ErrorCodes.TOKEN_ERROR]: {
    status: 401,
    message: "Not authenticated",
  },
  [ErrorCodes.INVALID_DATA]: { status: 400, message: "Invalid data" },
  [ErrorCodes.INVALID_CREDENTIALS]: {
    status: 400,
    message: "Invalid email or password",
  },
  [ErrorCodes.COURSE_NOT_FOUND]: {
    status: 666,
    message: "Course not found",
  },
  [ErrorCodes.COURSE_MODULE_NOT_FOUND]: {
    status: 667,
    message: "Course module not found",
  },
  [ErrorCodes.COURSE_MODULE_STEP_NOT_FOUND]: {
    status: 668,
    message: "Step not found",
  },
};

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
    const { status, message } = ERROR_CONFIG[error.code];

    return res.status(status).json({ message });
  }

  if (
    error instanceof jwt.JsonWebTokenError ||
    error instanceof jwt.TokenExpiredError
  ) {
    const { status, message } = ERROR_CONFIG[ErrorCodes.TOKEN_ERROR];

    return res.status(status).json({ message });
  }

  return res.status(DEFAULT_STATUS).json({
    message: DEFAULT_MESSAGE,
  });
};
