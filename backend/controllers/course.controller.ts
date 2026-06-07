import { NextFunction, Request, Response } from "express";
import { courseService } from "../services/course.service";
import {
  Course,
  CreateCourseData,
  GetCoursesBody,
} from "../types/course.types";
import { AppError, ErrorCodes } from "../appError";
import progressModel from "../models/progress.model";

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
            content: `Язык JavaScript разработал американский программист Брендан Айк в 1995 году. Брендан создал язык всего за несколько недель во время работы в компании Netscape Communications. Изначально язык назывался Mocha, затем LiveScript, а позже получил имя JavaScript для популярности на фоне языка Java. Сегодня JavaScript используется для создания интерактивных сайтов, веб-приложений и серверных решений.
`,
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
            content: `Замыкания (closures) в JavaScript — это механизм, при котором функция «запоминает» переменные из области видимости, где была создана, даже после завершения внешней функции. Благодаря замыканиям можно хранить состояние, создавать приватные переменные и писать более гибкий код. Замыкания часто используются в обработчиках событий, таймерах и функциях обратного вызова.
`,
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
            content: `Типизация в TypeScript позволяет заранее описывать типы данных и проверять код ещё до запуска программы. TypeScript является надстройкой над JavaScript и помогает находить ошибки на этапе разработки. С помощью типов можно задавать структуру объектов, параметры функций и возвращаемые значения. Это делает код более понятным, безопасным и удобным для поддержки в крупных проектах.
`,
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

    // res.json({modules, passedSteps: []});
    res.json(modules);
  }

  async getCourseWalkthrough(
    req: Request<{ courseId: string; userId: string }>,
    res: Response,
  ) {
    const progress = await progressModel.findOne({
      courseId: req.params.courseId,
      userId: req.params.userId,
    });

    console.log(progress);

    const course = {
      title: "Python для начинающих",
      modules: [
        {
          title: "Переменные",
          moduleId: "jfjslei",
          steps: [
            {
              stepId: "fffff",
              title: "Теория",
              type: "theory",
              theoryContent:
                "Переменные Python asd asda asdsad sda sda sda sda ",
            },
            {
              stepId: "step-1",
              title: "Тестирование",
              type: "test",
              testContent: [
                {
                  questionTitle: "Зачем переменные?",
                  answers: [
                    { title: "Затем", answerId: "fffsdddd" },
                    { title: "Потому что", answerId: "bbnbnbnb" },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Функции",
          moduleId: "module_functions_001",
          steps: [
            {
              stepId: "func_theory_01",
              title: "Теория функций",
              type: "theory",
              theoryContent:
                "Функции в Python позволяют группировать код в переиспользуемые блоки. Они могут принимать параметры и возвращать значения.",
            },
            {
              stepId: "step-2",
              title: "Тест по функциям",
              type: "test",
              testContent: [
                {
                  questionTitle: "Что делает функция?",
                  questionId: "QUESTION__1",
                  answers: [
                    {
                      title: "Выполняет набор инструкций",
                      answerId: "ans_func_1",
                    },
                    { title: "Удаляет код", answerId: "ans_func_2" },
                  ],
                },
                {
                  questionTitle: "Как обозначается функция в Python?",
                  questionId: "QUESTION__2",
                  answers: [
                    { title: "def", answerId: "ans_func_3" },
                    { title: "function", answerId: "ans_func_4" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    res.json({ progress, course });
  }

  async completeLesson(
    req: Request<{ courseId: string; stepId: string; userId: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { courseId, stepId, userId } = req.params;

      // ищем progress
      let progress = await progressModel.findOne({
        courseId,
        userId,
      });

      // если нет — создаём
      if (!progress) {
        progress = await progressModel.create({
          courseId,
          userId,
          progress: 0,
          progressByStepId: [],
        });
      }

      // проверяем есть ли уже этот step
      const existingStep = progress.progressByStepId.find(
        (s) => s.stepId.toString() === stepId,
      );

      if (existingStep) {
        // если уже есть — просто обновляем
        existingStep.completed = true;
        existingStep.answers = [];
      } else {
        // если нет — добавляем новый
        progress.progressByStepId.push({
          stepId,
          completed: true,
          answers: [],
        });
      }

      await progress.save();

      return res.json({
        message: "Lesson completed",
        progress,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const courseController = new CourseController();
