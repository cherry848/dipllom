import courseModel from "../models/course.model";
import reviewModel from "../models/review.model";
import { Course } from "../types/course.types";
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

  async getPopular(): Promise<Course[]> {
    const popularCourses = await reviewModel.aggregate([
      {
        $group: {
          _id: "$courseId",
          avgRating: { $avg: "$rating" },
          reviewCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "_id",
          as: "courseInfo",
        },
      },
      {
        $unwind: "$courseInfo",
      },
      {
        $addFields: {
          // Формула взвешенного рейтинга (Bayesian average)
          weightedRating: {
            $divide: [
              {
                $add: [
                  { $multiply: ["$avgRating", "$reviewCount"] },
                  3.5 * 10, // средний рейтинг * минимальное количество отзывов
                ],
              },
              { $add: ["$reviewCount", 10] },
            ],
          },
        },
      },
      {
        $sort: { weightedRating: -1, reviewCount: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: "$courseInfo._id",
          name: "$courseInfo.name",
          img: "$courseInfo.img",
          desc: "$courseInfo.desc",
          avgRating: 1,
          reviewCount: 1,
          weightedRating: 1,
        },
      },
    ]);

    return popularCourses;
  }
}

export const courseService = new CourseService();
