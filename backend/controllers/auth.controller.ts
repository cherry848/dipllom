import { CookieOptions, NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";
import {
  getCookiesRefreshToken,
  getHeaderAccessToken,
} from "../utils/jwt.utils";
import type {
  AuthLoginControllerData,
  AuthRegisterControllerData,
} from "../types/auth.types";
import { AppError, ErrorCodes } from "../appError";

const REFRESH_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 дней
};

class AuthController {
  async register(
    req: Request<{}, {}, AuthRegisterControllerData>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email, password } = req.body ?? {};

      if (!email || !password)
        throw new AppError(
          "email и password обязательны",
          ErrorCodes.INVALID_CREDENTIALS,
        );

      const user = await authService.register({ email, password });

      const tokens = authService.getTokens(user._id);

      return res
        .cookie("refreshToken", tokens.refreshToken, REFRESH_COOKIE_OPTIONS)
        .status(201)
        .json({
          message: "User registered",
          user,
          accessToken: tokens.accessToken,
        });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request<{}, {}, AuthLoginControllerData>, res: Response) {
    const { email, password } = req.body ?? {};

    if (!email || !password)
      throw new AppError(
        "email и password обязательны",
        ErrorCodes.INVALID_CREDENTIALS,
      );

    const user = await authService.login({ email, password });

    const tokens = authService.getTokens(user._id);

    return res
      .cookie("refreshToken", tokens.refreshToken, REFRESH_COOKIE_OPTIONS)
      .json({ message: "User login", accessToken: tokens.accessToken, user });
  }

  async authorize(req: Request, res: Response) {
    const accessToken = getHeaderAccessToken(req);

    if (!accessToken)
      throw new AppError("чет с токеном", ErrorCodes.TOKEN_ERROR);

    const user = await authService.authorize(accessToken);

    return res.json({ message: "User authorized", user });
  }

  refresh(req: Request, res: Response) {
    const refreshToken = getCookiesRefreshToken(req);

    if (!refreshToken)
      throw new AppError("чет с токеном", ErrorCodes.TOKEN_ERROR);

    const newTokens = authService.getTokens(refreshToken);

    return res
      .cookie("refreshToken", newTokens.refreshToken, REFRESH_COOKIE_OPTIONS)
      .json({
        message: "Tokens refreshed",
        accessToken: newTokens.accessToken,
      });
  }
}

export const authController = new AuthController();
