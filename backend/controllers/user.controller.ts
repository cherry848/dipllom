import { NextFunction, Request, Response } from "express";
import { User } from "../types/user.types";
import { userService } from "../services/user.service";

class UserController {
  async updatePassword(
    req: Request<{}, {}, User>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await userService.updatePassword(req);
      res.json({ message: "Пароль был успешно обновлен", user });
    } catch (error) {
      next(error);
    }
  }

  async updateName(
    req: Request<{}, {}, User>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await userService.updateName(req);
      res.json({ message: "Имя пользователя было успешно изменено!", user });
    } catch (error) {
      next(error);
    }
  }

  async uploadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.uploadAvatar(req);
      res.json({ message: "Аватар был успешно загружен", user });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
