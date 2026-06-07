import { Types } from "mongoose";

export type TestAnswer = {
  _id: Types.ObjectId;
  questionId: string;
  answer: string;
  correct: boolean;
};

export type AnswersGetCourseAnswersParams = {
  courseId: string;
};

export type AnswersGetCourseAnswerService = {
  courseId: string;
};

export type TestAnswerCreateOrUpdateAnswerData = {
  answerId?: string;
  testId: string;
  answer: string;
  correct: boolean;
};

export type TestAnswerCreateOrUpdateReq = {
  answer: TestAnswerCreateOrUpdateAnswerData;
};

export type TestAnswerCreateOrUpdateService =
  TestAnswerCreateOrUpdateAnswerData;

export type DeleteAnswerParams = {
  answerId: string;
};
