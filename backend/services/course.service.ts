import { AppError, ErrorCodes } from "../appError";
import courseModel from "../models/course.model";
import {
  Course,
  CreateCourseData,
  GetCoursesBody,
} from "../types/course.types";
import { BaseSort } from "../types/types";
import { QueryOptions } from "mongoose";
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

  async create(
    authorId: string,
    { name, desc, category, duration, language }: CreateCourseData,
  ) {
    const course = await courseModel.create({
      name,
      desc,
      authorId,
      category,
      duration,
      language,
    });

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

    // 🔹 LANGUAGE
    if (body.language?.length) {
      filter.language = { $in: body.language };
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
      { new: true, runValidators: true },
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
}

export const courseService = new CourseService();
