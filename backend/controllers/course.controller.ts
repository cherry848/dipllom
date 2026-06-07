import { NextFunction, Request, Response } from "express";
import { courseService } from "../services/course.service";
import {
  COURSE_MODULE_STEPS,
  CreateCourseControllerBodyData,
  CreateOrUpdateModuleControllerBodyData,
  CreateOrUpdateModuleStepControllerData,
  CreateOrUpdateModuleStepControllerParamsData,
  DeleteModuleControllerParamsData,
  DeleteModuleStepControllerParamsData,
  GetCoursesBody,
  UpdateCourseControllerBodyData,
  UpdateCourseControllerParamsData,
} from "../types/course.types";
import { AppError, ErrorCodes } from "../appError";
import { ReqBodyType } from "../types/types";

class CourseController {
  async create(
    req: Request<{}, {}, ReqBodyType<CreateCourseControllerBodyData>>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, desc, category, tags } = req.body ?? {};

      const userId = req.userId;

      if (!userId)
        throw new AppError("Нет userId в request", ErrorCodes.INVALID_DATA);

      if (!name || !desc || !category || !tags?.length)
        throw new AppError(
          "Некорректные входные данные",
          ErrorCodes.INVALID_DATA
        );

      const course = await courseService.create({
        authorId: userId,
        name,
        desc,
        category,
        tags,
      });
      res.status(201).json({ message: "Курс был успешно создан", course });
    } catch (error) {
      next(error);
    }
  }

  async updateCourse(
    req: Request<
      UpdateCourseControllerParamsData,
      {},
      ReqBodyType<UpdateCourseControllerBodyData>
    >,
    res: Response
  ) {
    const courseId = req.params.id;
    const courseData = req.body;

    const updatedCourse = await courseService.updateCourse({
      courseId,
      ...courseData,
    });

    res.json({ message: "Курс успешно обновлен", course: updatedCourse });
  }

  async getAll(
    req: Request<{}, {}, GetCoursesBody>,
    res: Response,
    next: NextFunction
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
    next: NextFunction
  ) {
    try {
      if (!req.file)
        throw new AppError("Файл отсутствует", ErrorCodes.INVALID_DATA);

      const course = await courseService.uploadImage(req.params.id, req.file);

      res.json({ message: "Картинка была успешно загружена", course });
    } catch (error) {
      next(error);
    }
  }

  async createOrUpdateModule(
    req: Request<
      { id: string },
      {},
      ReqBodyType<CreateOrUpdateModuleControllerBodyData>
    >,
    res: Response
  ) {
    const courseId = req.params.id;
    const { moduleName, moduleId } = req.body ?? {};

    if (!moduleName)
      throw new AppError("Нет имени модуля", ErrorCodes.INVALID_DATA);

    const updatedCourse = await courseService.createOrUpdateModule({
      courseId,
      moduleId,
      moduleName,
    });

    res.json({ message: "Модуль обновлен", course: updatedCourse });
  }

  async deleteModule(
    req: Request<DeleteModuleControllerParamsData>,
    res: Response
  ) {
    const { courseId, moduleId } = req.params;

    const updatedCourse = await courseService.deleteModule(courseId, moduleId);

    res.json({ message: "Модуль удален", course: updatedCourse });
  }

  async createOrUpdateModuleStep(
    req: Request<
      CreateOrUpdateModuleStepControllerParamsData,
      {},
      ReqBodyType<CreateOrUpdateModuleStepControllerData>
    >,
    res: Response
  ) {
    const { courseId, moduleId } = req.params;
    const { stepName, stepType, stepId, content } = req.body ?? {};

    if (!stepName || !stepType) {
      throw new AppError("Не хватает данных", ErrorCodes.INVALID_DATA);
    }

    let updatedCourse = await courseService.createOrUpdateModuleStep({
      courseId,
      moduleId,
      stepId,
      stepName,
      stepType,
    });

    if (content) {
      if (!stepId) {
        throw new AppError("Не хватает данных", ErrorCodes.INVALID_DATA);
      }

      updatedCourse = await courseService.updateStepContent({
        courseId,
        moduleId,
        stepId,
        content,
      });
    }

    res.json({ message: "Шаг успешно обновлен", course: updatedCourse });
  }

  async deleteModuleStep(
    req: Request<DeleteModuleStepControllerParamsData>,
    res: Response
  ) {
    const { courseId, moduleId, stepId } = req.params;

    const updatedCourse = await courseService.deleteModuleStep({
      courseId,
      moduleId,
      stepId,
    });

    res.json({ message: "Шаг успешно удален", course: updatedCourse });
  }
}

export const courseController = new CourseController();
