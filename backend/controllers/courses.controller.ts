import { Request, Response } from "express";
import { BaseSort, ReqSearchQueryType } from "../types/types";
import { courseService } from "../services/course.service";

class CoursesController {
  async getCourses(
    req: Request<{}, {}, {}, ReqSearchQueryType<BaseSort>>,
    res: Response
  ) {
    const query: BaseSort = {
      sortBy: req.query.sortBy,
      order: req.query.order ? +req.query.order : undefined,
      limit: req.query.limit ? +req.query.limit : undefined,
    };

    let courses = await courseService.getCourses(query);

    return res.json(courses);
  }
}

export const coursesController = new CoursesController();
