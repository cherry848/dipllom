import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";
import {
  COURSE_MODULE_STEPS,
  type CourseModuleStep,
  type CourseModuleStepTestContent,
} from "../../types/course.types";
import type { TestAnswer } from "../../types/testAnswer.types";

type AddQuestionPayload = {
  stepId: string;
};

type SetStepContentTheoryPayload = {
  stepId: string;
  content: string;
};

type SetStepContentTestPayload = {
  stepId: string;
  questionId: string;
  question?: string;
  isMultiple?: boolean;
};

type AddVariantPayload = {
  stepId: string;
  questionId: string;
};

type DeleteVariantPayload = {
  stepId: string;
  questionId: string;
  variantId: string;
};

type SetAnswerPayload = {
  answerId: string;
  questionId: string;
  text?: string;
  correct?: boolean;
};

type DeleteQuestionPayload = {
  stepId: string;
  questionId: string;
};

type InitialState = {
  stepById: Partial<Record<string, CourseModuleStep>>;
  answerById: Partial<Record<string, TestAnswer>>;
};

const initialState: InitialState = {
  stepById: {},
  answerById: {},
};

export const updateCourseModuleStepContentSlice = createSlice({
  name: "updateCourseModuleStepContent",
  initialState,
  reducers: {
    addQuestion(state, { payload }: PayloadAction<AddQuestionPayload>) {
      const { stepId } = payload;

      const step = state.stepById[stepId];
      if (!step) return;

      step.content[COURSE_MODULE_STEPS.Test].push({
        _id: `temp-${Date.now()}`,
        question: "",
        variants: [],
      });
    },

    setStepContentTheory(
      state,
      { payload }: PayloadAction<SetStepContentTheoryPayload>
    ) {
      const { stepId, content } = payload;

      const step = state.stepById[stepId];

      if (!step) return;

      step.content[COURSE_MODULE_STEPS.Theory] = content;
    },

    setStepContentTest(
      state,
      { payload }: PayloadAction<SetStepContentTestPayload>
    ) {
      const { stepId, questionId, isMultiple, question } = payload;

      const step = state.stepById[stepId];

      if (!step) return;

      const content = step.content[COURSE_MODULE_STEPS.Test]?.find(
        (content) => content._id === questionId
      );

      if (!content) return;

      if (question !== undefined) content.question = question;
      if (isMultiple !== undefined) {
        content.multiple = isMultiple;

        if (!isMultiple) {
          let hasCorrectAnswer = false;

          for (const answerId of content.variants) {
            const answer = state.answerById[answerId];
            if (!answer?.correct) continue;

            if (!hasCorrectAnswer) {
              hasCorrectAnswer = true;
            } else {
              answer.correct = false;
            }
          }
        }
      }
    },

    addVariant(state, { payload }: PayloadAction<AddVariantPayload>) {
      const { stepId, questionId } = payload;

      const step = state.stepById[stepId];

      if (!step) return;

      const question = step.content[COURSE_MODULE_STEPS.Test]?.find(
        (question) => question._id === questionId
      );

      if (!question) return;

      const newAnswer: TestAnswer = {
        _id: `temp-${Date.now()}`,
        answer: "",
        correct: question.variants.length === 0,
        questionId: question._id,
      };

      state.answerById[newAnswer._id] = newAnswer;

      question.variants.push(newAnswer._id);
    },

    deleteVariant(state, { payload }: PayloadAction<DeleteVariantPayload>) {
      const { stepId, questionId, variantId } = payload;

      const step = state.stepById[stepId];

      if (!step) return;

      const question = step.content[COURSE_MODULE_STEPS.Test]?.find(
        (question) => question._id === questionId
      );

      if (!question) return;

      const variantIdx = question.variants.findIndex((id) => id === variantId);

      if (variantIdx === -1) return;

      question.variants.splice(variantIdx, 1);
    },

    setAnswer(state, { payload }: PayloadAction<SetAnswerPayload>) {
      const { answerId, questionId, correct, text } = payload;

      let question: CourseModuleStepTestContent | undefined;

      for (const step of Object.values(state.stepById)) {
        for (const questionData of step?.content[COURSE_MODULE_STEPS.Test] ??
          []) {
          if (questionData._id === questionId) question = questionData;
        }
      }

      if (!question) {
        state.answerById[answerId] = {
          _id: answerId,
          answer: text ?? "",
          correct: !!correct,
          questionId: questionId,
        };
        return;
      }

      const answer = state.answerById[answerId];

      if (!answer) {
        state.answerById[answerId] = {
          _id: answerId,
          answer: text ?? "",
          correct: !!correct,
          questionId,
        };
        return;
      }

      if (text !== undefined) answer.answer = text;

      if (correct !== undefined) {
        if (correct && !question.multiple) {
          for (const answerId of question.variants) {
            const answer = state.answerById[answerId];
            if (answer) answer.correct = false;
          }
        }

        answer.correct = correct;
      }
    },

    deleteQuestion(state, { payload }: PayloadAction<DeleteQuestionPayload>) {
      const { stepId, questionId } = payload;

      const step = state.stepById[stepId];

      if (!step) return;

      const questions = step.content[COURSE_MODULE_STEPS.Test];

      if (!questions) return;

      const questionIdx = questions.findIndex(
        (question) => question._id === questionId
      );

      if (questionIdx !== -1) {
        questions.splice(questionIdx, 1);
      }
    },
  },

  extraReducers(builder) {
    builder.addMatcher(
      api.endpoints.getCourseById.matchFulfilled,
      (state, { payload: { course } }) => {
        course.modules?.forEach(({ steps }) =>
          steps.forEach((step) => {
            state.stepById[step._id] = step;
          })
        );
      }
    );
  },
});
