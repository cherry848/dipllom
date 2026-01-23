import type { Request, Response, NextFunction } from "express";
import { getHeaderAccessToken } from "../utils/jwt.utils";
import jwt from "jsonwebtoken";
import { AppError, ErrorCodes } from "../appError";

const JWT_SECRET = process.env.JWT_SECRET || "secretKey";

export const authCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = getHeaderAccessToken(req);

    if (!accessToken)
      throw new AppError("чет с токеном", ErrorCodes.TOKEN_ERROR);

    jwt.verify(accessToken, JWT_SECRET);

    next();
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      throw new AppError("чет с токеном", ErrorCodes.TOKEN_ERROR);
    }

    next(error);
  }
};
