export type TestAnswer = {
  _id: string;
  answer: string;
  questionId: string;
  correct: boolean;
};

export type CreateOrUpdateAnswerRes = {
  answer: TestAnswer;
};

export type CreateOrUpdateAnswerReq = {
  answer: Omit<TestAnswer, "_id"> & { answerId?: string };
};
