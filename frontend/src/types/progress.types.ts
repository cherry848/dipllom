export type AnswersProgress = { questionId: string; answerId: string };

export type ProgressByStepId = {
  completed: boolean;
  answers: AnswersProgress[];
  stepId: string;
};

export type Progress = {
  courseId: string;
  userId: string;
  progress: number;
  progressByStepId: ProgressByStepId[];
};
