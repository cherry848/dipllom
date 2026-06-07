import { model, Schema, Types } from "mongoose";
import {
  AnswersProgress,
  Progress,
  ProgressByStepId,
} from "../types/progress.types";

const ProgressAnswersSchema = new Schema<AnswersProgress>({
  questionId: { type: String, required: true },
  answerId: { type: String, required: true },
});

const ProgressByStepIdSchema = new Schema<ProgressByStepId>({
  completed: { type: Boolean, required: true, default: false },
  stepId: { type: String, required: true },
  answers: { type: [ProgressAnswersSchema], required: true, default: [] },
});

const ProgressSchema = new Schema<Progress>({
  courseId: {
    type: Types.ObjectId,
    required: true,
    ref: "Course",
  },
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
  },
  progress: {
    type: Number,
    default: 0,
  },
  progressByStepId: {
    type: [ProgressByStepIdSchema],
    required: true,
    default: [],
  },
});

export default model<Progress>("Progress", ProgressSchema);
