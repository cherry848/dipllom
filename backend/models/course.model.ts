import { Schema, model } from "mongoose";
import { Course } from "../types/course.types";

const AnswerSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },

    correct: {
      type: Boolean,
      required: true,
    },
  },
  { _id: true },
);

const QuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },

    multiple: {
      type: Boolean,
      default: false,
    },

    answers: {
      type: [AnswerSchema],
      default: [],
    },
  },
  { _id: true },
);

const StepSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["lesson", "test"],
      required: true,
    },

    content: {
      type: String,
      default: "",
    },

    questions: {
      type: [QuestionSchema],
      default: [],
    },
  },
  { _id: true },
);

const ModuleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    steps: {
      type: [StepSchema],
      default: [],
    },
  },
  { _id: true },
);

const CourseSchema = new Schema<Course>(
  {
    name: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User" },
    img: { type: String, required: true },
    desc: { type: String, required: true },
    rating: { type: Number, required: true, default: 1 },
    tags: { type: [String], required: true },
    status: { type: Boolean, default: false },
    category: { type: String, required: true },
    duration: { type: Number, required: true, default: 0 },
    language: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true },
);

export default model<Course>("Course", CourseSchema);
