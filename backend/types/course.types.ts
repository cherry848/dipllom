import { Types } from "mongoose";

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

export type CourseModuleStepTheoryContent = string;

export type CourseModuleStepTestContent = {
  _id: string;
  question: string;
  multiple?: boolean;
  variants: Types.ObjectId[];
};

export type CourseModuleStepContent = {
  [COURSE_MODULE_STEPS.Theory]?: CourseModuleStepTheoryContent;
  [COURSE_MODULE_STEPS.Test]?: CourseModuleStepTestContent[];
};

export type CourseModuleStep = {
  _id: Types.ObjectId;
  stepName: string;
  stepType: CourseModuleStepsUnion;
  content: CourseModuleStepContent;
};

export type CourseModule = {
  _id: Types.ObjectId;
  moduleName: string;
  steps: CourseModuleStep[];
};

export type Course = {
  _id: string;
  authorId: Types.ObjectId;
  modules: CourseModule[];
  createdAt: Date;
  updatedAt: Date;
  name: string;
  img?: string;
  desc: string;
  status: boolean;
  reviews: string[];
  rating: number;
  users: string[];
  duration: number;
  category: string;
  tags: string[];
};

export type CreateCourseControllerBodyData = {
  name: string;
  desc: string;
  category: string;
  tags: string[];
};

export type UpdateCourseControllerParamsData = {
  id: string;
};

export type UpdateCourseControllerBodyData = {
  name: string;
  desc: string;
  category: string;
  tags: string[];
  status: boolean;
};

export type CreateCourseServiceData = {
  authorId: string;
  name: string;
  desc: string;
  category: string;
  tags: string[];
};

export type UpdateCourseServiceData = {
  courseId: string;
  name?: string;
  desc?: string;
  category?: string;
  tags?: string[];
  status?: boolean;
};

export type CreateOrUpdateModuleControllerBodyData = {
  moduleId?: string;
  moduleName: string;
};

export type CreateOrUpdateModuleServiceData = {
  courseId: string;
  moduleId?: string;
  moduleName: string;
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
  category?: string[];
  duration?: ("short" | "medium" | "long")[];
  sortBy?: "users" | "rating" | "createdAt";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export type CreateOrUpdateModuleStepControllerParamsData = {
  courseId: string;
  moduleId: string;
};

type CreateOrUpdateModuleStepContentTest = Omit<
  CourseModuleStepTestContent,
  "_id" | "variants"
> & {
  variants: { variant: string; isCorrect?: boolean }[];
};

export type CreateOrUpdateModuleStepContentController = {
  [COURSE_MODULE_STEPS.Theory]?: string;
  [COURSE_MODULE_STEPS.Test]?: CreateOrUpdateModuleStepContentTest[];
};

export type CreateOrUpdateModuleStepControllerData = {
  stepId?: string;
  stepName: string;
  stepType: CourseModuleStepsUnion;
  content?: CreateOrUpdateModuleStepContentController;
};

export type CreateOrUpdateModuleStepServiceData = {
  courseId: string;
  moduleId: string;
  stepId?: string;
  stepName: string;
  stepType: CourseModuleStepsUnion;
};

export type DeleteModuleControllerParamsData = {
  courseId: string;
  moduleId: string;
};

export type DeleteModuleStepControllerParamsData = {
  courseId: string;
  moduleId: string;
  stepId: string;
};

export type DeleteModuleStepServiceData = {
  courseId: string;
  moduleId: string;
  stepId: string;
};

export type UpdateStepContentService = {
  courseId: string;
  moduleId: string;
  stepId: string;
  content: CreateOrUpdateModuleStepContentController;
};
