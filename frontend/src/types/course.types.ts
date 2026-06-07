import type { Progress } from "./progress.types";
import type { ReviewWithAuthor } from "./review.types";
import type { Pagination, ResBase } from "./types";
import type { User } from "./user.types";

export const COURSE_MODULE_STEPS = {
  Theory: "theory",
  Test: "test",
} as const;

export type CourseModuleStepsUnion =
  (typeof COURSE_MODULE_STEPS)[keyof typeof COURSE_MODULE_STEPS];

export const COURSE_MODULE_STEP_TYPE_LABELS: Record<
  CourseModuleStepsUnion,
  string
> = {
  [COURSE_MODULE_STEPS.Test]: "Тест",
  [COURSE_MODULE_STEPS.Theory]: "Теория",
};

export type CourseModuleStepTestContent = {
  _id: string;
  question: string;
  multiple?: boolean;
  variants: string[];
};

export type CourseModuleStepContent = {
  [COURSE_MODULE_STEPS.Theory]: string;
  [COURSE_MODULE_STEPS.Test]: CourseModuleStepTestContent[];
};

export type CourseModuleStep = {
  _id: string;
  stepName: string;
  stepType: CourseModuleStepsUnion;
  content: CourseModuleStepContent;
};

export type CourseModule = {
  _id: string;
  moduleName: string;
  steps: CourseModuleStep[];
};

export type Course = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  modules?: CourseModule[];
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

export type GetCourseReq = {
  courseId: string;
  fetchAnswers?: boolean;
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
export type CreateCourseReq = {
  name: string;
  desc: string;
  category: string;
};

export type CreateCourseRes = ResBase<{ course: Course }>;

export type UpdateCourseReq = {
  courseId: string;
  name?: string;
  desc?: string;
  category?: string;
  status?: boolean;
};

export type UpdateCourseRes = ResBase<{ course: Course }>;

export type UploadCourseImageRes = ResBase<{ course: Course }>;

export type UploadCourseImageReq = {
  courseId: string;
  img: File;
};

export type CreateOrUpdateCourseModuleReq = {
  courseId: string;
  moduleId?: string;
  moduleName: string;
};

export type CreateOrUpdateCourseModuleRes = ResBase<{ course: Course }>;

export type DeleteCourseModuleReq = {
  courseId: string;
  moduleId: string;
};

export type DeleteCourseModuleRes = {
  course: Course;
};

export type CreateOrUpdateStepContent = {
  [COURSE_MODULE_STEPS.Theory]?: string;
  [COURSE_MODULE_STEPS.Test]?: Omit<CourseModuleStepTestContent, "_id">[];
};

export type CreateOrUpdateCourseModuleStepReq = {
  courseId: string;
  moduleId: string;
  stepId?: string;
  stepName: string;
  stepType: CourseModuleStepsUnion;
  content?: CreateOrUpdateStepContent;
};

export type CreateOrUpdateCourseModuleStepRes = {
  course: Course;
};

export type DeleteCourseModuleStepRes = {
  course: Course;
};

export type DeleteCourseModuleStepReq = {
  courseId: string;
  moduleId: string;
  stepId: string;
};
