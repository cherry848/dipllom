import { Schema, Types, model } from "mongoose";
import {
  Course,
  COURSE_MODULE_STEPS,
  CourseModule,
  CourseModuleStep,
  CourseModuleStepTestContent,
} from "../types/course.types";

const CourseModuleStepTestContentSchema =
  new Schema<CourseModuleStepTestContent>({
    multiple: Boolean,
    question: { type: String, required: true },
    variants: {
      type: [Types.ObjectId],
      default: [],
      required: true,
      ref: "TestAnswer",
    },
  });

const CourseModuleStepContentSchema = new Schema<CourseModuleStep>({
  stepName: { type: String, required: true },
  stepType: {
    type: String,
    enum: Object.values(COURSE_MODULE_STEPS),
    required: true,
  },
  content: {
    type: {
      theory: { type: String, default: "" },
      test: {
        type: [CourseModuleStepTestContentSchema],
        default: [],
      },
    },
    required: true,
    default: {},
    _id: false,
  },
});

const CourseModuleSchema = new Schema<CourseModule>({
  moduleName: { type: String, required: true },
  steps: [CourseModuleStepContentSchema],
});

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
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    modules: [CourseModuleSchema],
    img: { type: String },
    desc: { type: String, required: true },
    rating: { type: Number, default: 1 },
    tags: { type: [String], required: true },
    status: { type: Boolean, default: false },
    category: { type: String, required: true },
    duration: { type: Number, default: 0 },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

export default model<Course>("Course", CourseSchema);
