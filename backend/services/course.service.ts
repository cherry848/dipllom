import { AppError, ErrorCodes } from "../appError";
import courseModel from "../models/course.model";
import {
  Course,
  COURSE_MODULE_STEPS,
  CreateCourseServiceData,
  CreateOrUpdateModuleServiceData,
  CreateOrUpdateModuleStepServiceData,
  DeleteModuleStepServiceData,
  GetCoursesBody,
  UpdateCourseServiceData,
  UpdateStepContentService,
} from "../types/course.types";
import { BaseSort } from "../types/types";
import { QueryOptions, Types } from "mongoose";
import reviewModel from "../models/review.model";
import { User } from "../types/user.types";

class CourseService {
  async getCourses(sort: BaseSort) {
    const query: QueryOptions = {};

    if (sort.sortBy && sort.order) {
      query.sort = {
        [sort.sortBy]: +sort.order,
      };
    }

    if (sort.limit) {
      query.limit = sort.limit;
    }

    const courses = await courseModel.find({}, null, query);

    return courses;
  }

  async create(data: CreateCourseServiceData) {
    const course = (await courseModel.create(data)).toObject();
    return course;
  }

  async updateCourse({ courseId, ...data }: UpdateCourseServiceData) {
    const course = await courseModel
      .findByIdAndUpdate(courseId, data, { new: true })
      .lean();
    return course;
  }

  async getCoursesCatalog(body: GetCoursesBody = {}) {
    const filter: Record<string, any> = {};

    // 🔹 SEARCH (по названию)
    if (body.search?.trim()) {
      filter.name = {
        $regex: body.search,
        $options: "i",
      };
    }

    // 🔹 CATEGORY
    if (body.category?.length) {
      filter.category = { $in: body.category };
    }

    // 🔹 DURATION (через AND + OR)
    if (body.duration?.length) {
      const durationFilters = body.duration
        .map((d) => {
          if (d === "short") return { duration: { $lt: 10 } };
          if (d === "medium") return { duration: { $gte: 10, $lt: 30 } };
          if (d === "long") return { duration: { $gte: 30 } };
        })
        .filter(Boolean);

      if (durationFilters.length) {
        filter.$and = filter.$and || [];
        filter.$and.push({ $or: durationFilters });
      }
    }

    // 🔹 ПАГИНАЦИЯ
    const page = Math.max(body.page || 1, 1);
    const limit = Math.max(body.limit || 9, 1);
    const skip = (page - 1) * limit;

    const order: 1 | -1 = body.order === "asc" ? 1 : -1;

    let courses;
    let total;

    // 🔹 СОРТИРОВКА
    const allowedSortFields = ["users", "rating", "createdAt"];
    const sortBy = allowedSortFields.includes(body.sortBy || "")
      ? body.sortBy!
      : "createdAt";

    // 🔹 СОРТИРОВКА ПО USERS (aggregation)
    if (sortBy === "users") {
      const sort: Record<string, 1 | -1> = {
        usersCount: order,
        createdAt: -1,
      };

      [courses, total] = await Promise.all([
        courseModel.aggregate([
          { $match: filter },
          { $addFields: { usersCount: { $size: "$users" } } },
          { $sort: sort },
          { $skip: skip },
          { $limit: limit },
        ]),
        courseModel.countDocuments(filter),
      ]);
    } else {
      // 🔹 СОРТИРОВКА ПО RATING / CREATEDAT
      const sortMap: Record<string, string> = {
        rating: "rating",
        createdAt: "createdAt",
      };

      const sortField = sortMap[sortBy];

      [courses, total] = await Promise.all([
        courseModel
          .find(filter)
          .sort({ [sortField]: order, createdAt: -1 })
          .skip(skip)
          .limit(limit),
        courseModel.countDocuments(filter),
      ]);
    }

    return {
      data: courses,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    };
  }

  async uploadImage(_id: string, file: Express.Multer.File) {
    const img = `/uploads/avatars/${file.filename}`;
    const course = await courseModel.findByIdAndUpdate(
      _id,
      { img },
      { new: true, runValidators: true }
    );

    if (!course)
      throw new AppError("Курс не найден", ErrorCodes.COURSE_NOT_FOUND);

    return course;
  }

  async getCourseById(id: string): Promise<Course> {
    const course = await courseModel.findById(id);

    if (!course) {
      throw new AppError("курс не найден", ErrorCodes.COURSE_NOT_FOUND);
    }

    return course;
  }

  async getCourseReviews(courseId: string) {
    const reviews = await reviewModel
      .find({ courseId })
      .populate<{ userId: User }>("userId")
      .lean();

    const reviewsWithAuthor = reviews.map(({ userId, ...rest }) => ({
      ...rest,
      author: userId,
    }));

    return reviewsWithAuthor;
  }

  async getCoursesByUser(authorId: string) {
    const courses = await courseModel.find({
      authorId,
    });

    return courses;
  }

  async createOrUpdateModule({
    courseId,
    moduleId,
    moduleName,
  }: CreateOrUpdateModuleServiceData) {
    const course = await courseModel.findById(courseId);

    if (!course) {
      throw new AppError("Курс не найден", ErrorCodes.COURSE_NOT_FOUND);
    }

    // Update
    if (moduleId) {
      const currentModule = course.modules.find(
        (module) => module._id.toString() === moduleId
      );

      if (!currentModule) {
        throw new AppError(
          "Модуль не найден",
          ErrorCodes.COURSE_MODULE_NOT_FOUND
        );
      }

      currentModule.moduleName = moduleName;

      return await course.save();
    }

    // Create
    course.modules.push({ _id: new Types.ObjectId(), moduleName, steps: [] });

    return await course.save();
  }

  async deleteModule(courseId: string, moduleId: string) {
    const course = await courseModel.findById(courseId);

    if (!course) {
      throw new AppError("Курс не найден", ErrorCodes.COURSE_NOT_FOUND);
    }

    const moduleIdx = course.modules.findIndex(
      (module) => module._id.toString() === moduleId
    );

    if (moduleIdx === -1) {
      throw new AppError(
        "Модуль не найден",
        ErrorCodes.COURSE_MODULE_NOT_FOUND
      );
    }

    course.modules.splice(moduleIdx, 1);

    return await course.save();
  }

  async createOrUpdateModuleStep({
    courseId,
    moduleId,
    stepId,
    stepName,
    stepType,
  }: CreateOrUpdateModuleStepServiceData) {
    const course = await courseModel.findById(courseId);

    if (!course) {
      throw new AppError("Курс не найден", ErrorCodes.COURSE_NOT_FOUND);
    }

    const module = course.modules.find(
      (module) => module._id.toString() === moduleId
    );

    if (!module) {
      throw new AppError(
        "Модуль не найден",
        ErrorCodes.COURSE_MODULE_NOT_FOUND
      );
    }

    // Update
    if (stepId) {
      const step = module.steps.find((step) => step._id.toString() === stepId);

      if (!step) {
        throw new AppError(
          "Шаг не найден",
          ErrorCodes.COURSE_MODULE_STEP_NOT_FOUND
        );
      }

      step.stepName = stepName;
      step.stepType = stepType;

      return (await course.save()).toObject();
    }

    // Create
    module.steps.push({
      stepName,
      stepType,
      content: {},
    } as any);

    return (await course.save()).toObject();
  }

  async updateStepContent({
    courseId,
    moduleId,
    stepId,
    content,
  }: UpdateStepContentService) {
    const course = await courseModel.findById(courseId);

    if (!course) {
      throw new AppError("Курс не найден", ErrorCodes.COURSE_NOT_FOUND);
    }

    const module = course.modules.find(
      (module) => module._id.toString() === moduleId
    );

    if (!module) {
      throw new AppError(
        "Модуль не найден",
        ErrorCodes.COURSE_MODULE_NOT_FOUND
      );
    }

    const step = module.steps.find((step) => step._id.toString() === stepId);

    if (!step) {
      throw new AppError(
        "Шаг не найден",
        ErrorCodes.COURSE_MODULE_STEP_NOT_FOUND
      );
    }

    if (content[COURSE_MODULE_STEPS.Test] !== undefined) {
      step.content[COURSE_MODULE_STEPS.Test] = content[
        COURSE_MODULE_STEPS.Test
      ] as any;
      course.markModified("modules");
    }

    if (content[COURSE_MODULE_STEPS.Theory] !== undefined) {
      step.content[COURSE_MODULE_STEPS.Theory] =
        content[COURSE_MODULE_STEPS.Theory];
      course.markModified("modules");
    }

    return await course.save();
  }

  async deleteModuleStep({
    courseId,
    moduleId,
    stepId,
  }: DeleteModuleStepServiceData) {
    const course = await courseModel.findById(courseId);

    if (!course) {
      throw new AppError("Курс не найден", ErrorCodes.COURSE_NOT_FOUND);
    }

    const module = course.modules.find(
      (module) => module._id.toString() === moduleId
    );

    if (!module) {
      throw new AppError(
        "Модуль не найден",
        ErrorCodes.COURSE_MODULE_NOT_FOUND
      );
    }

    const stepIdx = module.steps.findIndex(
      (step) => step._id.toString() === stepId
    );

    if (stepIdx === -1) {
      throw new AppError(
        "Шаг не найден",
        ErrorCodes.COURSE_MODULE_STEP_NOT_FOUND
      );
    }

    module.steps.splice(stepIdx, 1);

    return (await course.save()).toObject();
  }
}

export const courseService = new CourseService();
