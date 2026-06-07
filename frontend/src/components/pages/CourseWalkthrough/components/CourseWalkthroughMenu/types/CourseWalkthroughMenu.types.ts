export type Question = {
  questionTitle: string;
  answers: {
    answerId: string;
    title: string;
  }[];
};

export type Step = {
  stepId: string;
  title: string;
  type: "theory" | "test";
  theoryContent?: string;
  testContent?: Question[];
};

export type Module = {
  moduleId: string;
  title: string;
  steps: Step[];
};
