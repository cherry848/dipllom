import { NextFunction, Request, Response } from "express";
import { User } from "../types/user.types";
import { userService } from "../services/user.service";
import { queryObjects } from "node:v8";

class UserController {
  async update(req: Request<{}, {}, User>, res: Response, next: NextFunction) {
    try {
      const user = await userService.update(req.body);
      res.json({
        message: "Пользователь был обновлен",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async uploadAvatar(
    req: Request<{}, {}, {}, { _id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      console.log(req.query._id);
      const user = await userService.uploadAvatar(req.query._id, req.file);
      res.json({ message: "Аватар был успешно загружен", user });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
