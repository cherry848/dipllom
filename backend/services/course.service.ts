import courseModel from "../models/course.model";
import { BaseSort } from "../types/types";
import { QueryOptions } from "mongoose";

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
}

export const courseService = new CourseService();
