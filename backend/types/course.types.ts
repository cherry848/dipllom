import { Types } from "mongoose";

export type Course = {
  _id: string;
  authorId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  img: string;
  desc: string;
  status: boolean;
  reviews: string[];
  rating: number;
  users: string[];
  duration: number;
  language: string;
  category: string;
  tags: string[];
};

export type CreateCourseData = {
  name: string;
  desc: string;
  category: string;
  duration: number;
  language: string;
  search?: string;
};

export type QueryParams = {
  category?: string;
  language?: string;
  duration?: "short" | "medium" | "long";
  sortBy?: "rating" | "users" | "createdAt";
  order?: "asc" | "desc";
  page?: string;
  limit?: string;
};

export type GetCoursesBody = {
  search?: string;
  category?: string[]; // ["Веб-разработка", "Разработка игр"]
  language?: string[]; // ["Python", "C++"]
  duration?: ("short" | "medium" | "long")[];
  sortBy?: "users" | "rating" | "createdAt";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
};
