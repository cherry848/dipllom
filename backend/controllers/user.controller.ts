import { NextFunction, Request, Response } from "express";
import { User } from "../types/user.types";
import { userService } from "../services/user.service";
import { queryObjects } from "node:v8";
import { ReqBodyType } from "../types/types";

class UserController {
  async update(
    req: Request<{ id: string }, {}, ReqBodyType<User>>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      let user = await userService.update(req.params.id, req.body ?? {});

      if (req.file) {
        user = await userService.uploadAvatar(req.params.id, req.file);
      }

      res.json({
        message: "Пользователь был обновлен",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
