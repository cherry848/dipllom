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

  async update(id: string, data: Partial<User>) {
    const updateData = { ...data };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const user = await userModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!user) throw new AppError("юзер не найден", ErrorCodes.USER_NOT_FOUND);

    return user;
  }

  async uploadAvatar(_id: string, file: Express.Multer.File) {
    const avatarUrl = `/uploads/avatars/${file.filename}`;

    const user = await userModel.findByIdAndUpdate(
      _id,
      { $set: { avatar: avatarUrl } },
      { new: true },
    );

    if (!user) throw new AppError("юзер не найден", ErrorCodes.USER_NOT_FOUND);

    return user;
  }
}

export const userService = new UserService();
