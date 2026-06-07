import { model, Schema, Types } from "mongoose";
import { TestAnswer } from "../types/testAnswer.types";

const TestAnswerSchema = new Schema<TestAnswer>({
  answer: { type: String, required: true },
  correct: { type: Boolean, required: true },
  questionId: { type: String, required: true },
});

export default model("TestAnswer", TestAnswerSchema);
