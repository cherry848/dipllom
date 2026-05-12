export type Question = {
  id: string;
  question: string;
  multiple: boolean;
  answers: {
    id: string;
    text: string;
    correct: boolean;
  }[];
};

export type Step = {
  id: string;
  title: string;
  type: "theory" | "test";
  content?: string;
  questions?: Question[];
};

export type Module = {
  id: string;
  title: string;
  steps: Step[];
};
