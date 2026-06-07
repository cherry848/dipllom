import type { Progress } from "./progress.types";
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
  status: boolean;
  rating: number;
  language: string;
  category: string;
  userId: string;
  users: string[];
  tags: string[];
  reviews: string[];
};

export type CourseProgress = {
  _id: string;
  name: string;
  img: string;
  desc: string;
  rating: number;
  progress: number;
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

export type GetCoursesWalkthroughReq = {
  courseId: string;
  userId: string;
};

export type CourseWalkthroughAnswer = {
  title: string;
  answerId: string;
};

export type CourseWalkthroughTestQuestion = {
  questionTitle: string;
  answers: CourseWalkthroughAnswer[];
};

export type CourseWalkthroughStep = {
  stepId: string;
  title: string;
  type: "theory";
  theoryContent?: string;
  testContent?: CourseWalkthroughTestQuestion[];
};

export type WalkthroughModule = {
  title: string;
  moduleId: string;
  steps: CourseWalkthroughStep[];
};

export type CourseWalkthroughData = {
  title: string;
  modules: WalkthroughModule[];
};

export type GetCoursesWalkthroughRes = {
  progress: Progress;
  course: CourseWalkthroughData;
};

export type CompleteLessonReq = {
  userId: string;
  courseId: string;
  stepId: string;
};

export type CompleteLessonRes = {
  s: string;
};
