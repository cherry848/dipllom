import { NextFunction, Request, Response } from "express";
import { courseService } from "../services/course.service";
import {
  Course,
  CreateCourseData,
  GetCoursesBody,
} from "../types/course.types";
import { AppError, ErrorCodes } from "../appError";

class CourseController {
  async create(
    req: Request<{ id: string }, {}, CreateCourseData>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { name, desc, category, duration, language } = req.body ?? {};

      const requiredFields = { name, desc, category, duration, language };
      const missingFields = Object.entries(requiredFields)
        .filter(
          ([_, value]) =>
            value === undefined ||
            value === null ||
            (typeof value === "string" && value.trim() === ""),
        )
        .map(([key]) => key);

      if (missingFields.length)
        throw new AppError(
          "Некорректные входные данные",
          ErrorCodes.INVALID_DATA,
        );

      const course = await courseService.create(req.params.id, {
        name,
        desc,
        category,
        duration,
        language,
      });
      res.status(201).json({ message: "Курс был успешно создан", course });
    } catch (error) {
      next(error);
    }
  }

  async getAll(
    req: Request<{}, {}, GetCoursesBody>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await courseService.getCoursesCatalog(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async uploadImage(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.file)
        throw new AppError("Файл отсутствует", ErrorCodes.INVALID_CREDENTIALS);

      const course = await courseService.uploadImage(req.params.id, req.file);

      res.json({ message: "Картинка была успешно загружена", course });
    } catch (error) {
      next(error);
    }
  }
}

export const courseController = new CourseController();
