import type { ReviewWithAuthor } from "./review.types";
import type { Pagination } from "./types";
import type { User } from "./user.types";

export type Course = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  img: string;
  desc: string;
  rating: number;
  language: string;
  category: string;
  userId: string;
  users: string[];
  tags: string[];
  reviews: string[];
};

export type GetCourseRes = {
  course: Course;
  author: User;
  reviews: ReviewWithAuthor[];
};

export type GetCatalogCoursesRes = {
  data: Course[];
  pagination: Pagination;
};

export type GetCatalogCoursesReq = Partial<{
  search: string;
  category: string[];
  language: string[];
  duration: string[];
  sortBy: string;
  order: string;
  page: number;
  limit: 9;
}>;
