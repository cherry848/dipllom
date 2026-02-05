import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";
import { getHeaderAccessToken } from "../utils/jwt.utils";
import { AppError, ErrorCodes } from "../appError";
import userModel from "../models/user.model";
import bcrypt from "bcryptjs";
import { User } from "../types/user.types";

class UserService {
  generateName(): string {
    const randomDigits = Math.floor(Math.random() * 899999999) + 100000;
    return `Пользователь${randomDigits}`;
  }

  async updateName(req: Request<{}, {}, User>) {
    const accessToken = getHeaderAccessToken(req);
    if (!accessToken) {
      throw new AppError("чет с токеном", ErrorCodes.TOKEN_ERROR);
    }
    const { id } = await authService.authorize(accessToken);
    const user = await userModel.findByIdAndUpdate(
      id,
      { name: req.body.name },
      { new: true, runValidators: true },
    );

    return user;
  }

  async updatePassword(req: Request<{}, {}, User>) {
    const accessToken = getHeaderAccessToken(req);
    if (!accessToken) {
      throw new AppError("чет с токеном", ErrorCodes.TOKEN_ERROR);
    }
    const { id } = await authService.authorize(accessToken);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await userModel.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true, runValidators: true },
    );
    return user;
  }

  async uploadAvatar(req: Request) {
    if (!req.file) {
      throw new AppError("Отсутствует файл", ErrorCodes.INVALID_DATA);
    }

    const accessToken = getHeaderAccessToken(req);
    if (!accessToken) {
      throw new AppError("чет с токеном", ErrorCodes.TOKEN_ERROR);
    }
    const { id } = await authService.authorize(accessToken);

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    const user = await userModel.findByIdAndUpdate(
      id,
      { avatar: avatarUrl },
      { new: true },
    );
    return user;
  }
}

export const userService = new UserService();
