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

  async getModules(req: Request, res: Response) {
    const modules = [
    {
      id: 13434324,
      title: "Основы JavaScript",

      steps: [
        {
          id: 1312312312312313123,
          title: "Что такое JavaScript",
          type: "lesson",
          content: "JavaScript — язык программирования...",
        },

        {
          id: 123131212332,
          title: "Тест по переменным",
          type: "test",

          questions: [
            {
              id: 923847234234,
              question: "Как объявить переменную?",
              multiple: false,

              answers: [
                {
                  id: 923847234235,
                  text: "let name",
                  correct: true,
                },
                {
                  id: 923847234236,
                  text: "variable name",
                  correct: false,
                },
                {
                  id: 923847234237,
                  text: "string name",
                  correct: false,
                },
              ],
            },

            {
              id: 923847234238,
              question: "Какие типы данных существуют?",
              multiple: true,

              answers: [
                {
                  id: 923847234239,
                  text: "string",
                  correct: true,
                },
                {
                  id: 923847234240,
                  text: "number",
                  correct: true,
                },
                {
                  id: 923847234241,
                  text: "table",
                  correct: false,
                },
                {
                  id: 923847234242,
                  text: "boolean",
                  correct: true,
                },
              ],
            },
          ],
        },
      ],
    },

    {
      id: 845672341,
      title: "Продвинутый JavaScript",

      steps: [
        {
          id: 845672342,
          title: "Замыкания",
          type: "lesson",
          content: "Замыкания позволяют функции помнить окружение...",
        },

        {
          id: 845672343,
          title: "Тест по функциям",
          type: "test",

          questions: [
            {
              id: 845672344,
              question: "Что такое callback?",
              multiple: false,

              answers: [
                {
                  id: 845672345,
                  text: "Функция внутри функции",
                  correct: false,
                },
                {
                  id: 845672346,
                  text: "Функция, переданная аргументом",
                  correct: true,
                },
                {
                  id: 845672347,
                  text: "Тип массива",
                  correct: false,
                },
              ],
            },

            {
              id: 845672348,
              question: "Какие методы массивов существуют?",
              multiple: true,

              answers: [
                {
                  id: 845672349,
                  text: "map",
                  correct: true,
                },
                {
                  id: 845672350,
                  text: "filter",
                  correct: true,
                },
                {
                  id: 845672351,
                  text: "append",
                  correct: false,
                },
                {
                  id: 845672352,
                  text: "reduce",
                  correct: true,
                },
              ],
            },
          ],
        },
      ],
    },

    {
      id: 556781223,
      title: "TypeScript",

      steps: [
        {
          id: 556781224,
          title: "Типизация",
          type: "lesson",
          content: "TypeScript добавляет статическую типизацию...",
        },

        {
          id: 556781225,
          title: "Тест по интерфейсам",
          type: "test",

          questions: [
            {
              id: 556781226,
              question: "Для чего нужны интерфейсы?",
              multiple: false,

              answers: [
                {
                  id: 556781227,
                  text: "Для стилизации",
                  correct: false,
                },
                {
                  id: 556781228,
                  text: "Для описания структуры объекта",
                  correct: true,
                },
                {
                  id: 556781229,
                  text: "Для работы с DOM",
                  correct: false,
                },
              ],
            },

            {
              id: 556781230,
              question: "Какие типы есть в TypeScript?",
              multiple: true,

              answers: [
                {
                  id: 556781231,
                  text: "string",
                  correct: true,
                },
                {
                  id: 556781232,
                  text: "number",
                  correct: true,
                },
                {
                  id: 556781233,
                  text: "object",
                  correct: true,
                },
                {
                  id: 556781234,
                  text: "table",
                  correct: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

    res.json(modules);
  }
}

export const courseController = new CourseController();
