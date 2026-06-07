import type { Request, Response, NextFunction } from "express";
import { getHeaderAccessToken } from "../utils/jwt.utils";
import jwt from "jsonwebtoken";
import { AppError, ErrorCodes } from "../appError";
import { authService } from "../services/auth.service";

export const authCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = getHeaderAccessToken(req);

    if (!accessToken)
      throw new AppError("чет с токеном", ErrorCodes.TOKEN_ERROR);

    const user = await authService.authorize(accessToken);

    req.userId = user._id;

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
