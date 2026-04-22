import { NextFunction, Request, Response } from "express";
import { BaseSort, ReqSearchQueryType } from "../types/types";
import { courseService } from "../services/course.service";
import { userService } from "../services/user.service";
import { Course } from "../types/course.types";
import { User } from "../types/user.types";
import { Review } from "../types/review.types";

type GetCourseReqParams = {
  id: string;
};

type ReviewWithAuthor = Omit<Review, "userId"> & { author: User };

type GetCourseResBody = {
  course: Course;
  author: User;
  reviews: ReviewWithAuthor[];
};

class CoursesController {
  async getCourses(
    req: Request<{}, {}, {}, ReqSearchQueryType<BaseSort>>,
    res: Response,
  ) {
    const query: BaseSort = {
      sortBy: req.query.sortBy,
      order: req.query.order ? +req.query.order : undefined,
      limit: req.query.limit ? +req.query.limit : undefined,
    };

    let courses = await courseService.getCourses(query);

    return res.json(courses);
  }

  async getCourse(
    req: Request<GetCourseReqParams>,
    res: Response<GetCourseResBody>,
  ) {
    const courseId = req.params.id;

    const course = await courseService.getCourseById(courseId);
    const author = await userService.getUserById(String(course.authorId));
    const reviews = await courseService.getCourseReviews(courseId);

    return res.json({ course, author, reviews });
  }

  async getCoursesByUser(
    req: Request<{ authorId: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      console.log(1);
      console.log(req.params.authorId);
      const courses = await courseService.getCoursesByUser(req.params.authorId);

      return res.json(courses);
    } catch (e) {
      next(e);
    }
  }
}

export const coursesController = new CoursesController();
