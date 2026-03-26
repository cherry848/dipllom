import { AppError, ErrorCodes } from "../appError";
import courseModel from "../models/course.model";
import { Course } from "../types/course.types";
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
}

export const courseService = new CourseService();
