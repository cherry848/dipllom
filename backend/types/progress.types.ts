import { Types } from "mongoose";

export type AnswersProgress = { questionId: string; answerId: string };

export type ProgressByStepId = {
  completed: boolean;
  answers: AnswersProgress[];
  stepId: string;
};

export type Progress = {
  courseId: Types.ObjectId;
  userId: Types.ObjectId;
  progress: number;
  progressByStepId: ProgressByStepId[];
};
