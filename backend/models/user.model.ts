import mongoose, { Schema, Types } from "mongoose";
import type { User } from "../types/user.types";
import { userService } from "../services/user.service";

// const CourseProgressUserSelectSchema = new Schema({
//   moduleId: { type: String, required: true },
//   stepId: { type: String, required: true },
//   questionId: { type: String, required: false },
//   answerId: {type: String, required: false},
// });

const UserQuestionSchema = new Schema(
  {
    questionId: {
      type: String,
      required: true,
    },

    selectedAnswers: {
      type: [String],
      default: [],
    },

    correct: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const UserStepSchema = new Schema(
  {
    moduleId: {
      type: String,
      required: true,
    },

    stepId: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    passed: {
      type: Boolean,
      default: false,
    },

    questions: {
      type: [UserQuestionSchema],
      default: [],
    },
  },
  { _id: false },
);

const CourseProgressSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    steps: {
      type: [UserStepSchema],
      default: [],
    },
    // userSelect: {
    //   type: [CourseProgressUserSelectSchema],
    //   required: true,
    //   default: [],
    // },
  },
  { _id: false },
);

const User = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true, default: userService.generateName() },
    avatar: { type: String, default: null },
    coursesProgress: {
      type: [CourseProgressSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model<User>("User", User);
