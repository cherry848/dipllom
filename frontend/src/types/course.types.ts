import type { ReviewWithAuthor } from "./review.types";
import type { User } from "./user.types";

export type Course = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  img: string;
  desc: string;
  status: boolean;
  rating: number;
  tags: string[];
  reviews: string[];
  progress?: number;
};

export type GetCourseRes = {
  course: Course;
  author: User;
  reviews: ReviewWithAuthor[];
};
