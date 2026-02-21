import { NextFunction, Request, Response } from "express";
import { User } from "../types/user.types";
import { userService } from "../services/user.service";

import { ReqBodyType } from "../types/types";

class UserController {
  async update(
    req: Request<{ id: string }, {}, ReqBodyType<User>>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      let user;

      if (req.file) {
        user = await userService.uploadAvatar(req.params.id, req.file);
      }

      console.log(req.params.id);
      console.log(req.body?.password);

      user = await userService.update(req.params.id, req.body ?? {});

      res.json({
        message: "Пользователь был обновлен",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyPassword(
    req: Request<{ id: string }, {}, Pick<User, "password">>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await userService.verifyPassword(req.params.id, req.body);
      if (user) {
        console.log("Пароли сходятся");
        return res.status(200).json({ message: "Пароли сходятся" });
      }
      res.status(401).json({ message: "Пароли не совпадают" });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
