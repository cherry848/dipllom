import { Schema, model } from "mongoose";
import { Course } from "../types/course.types";

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

// const Course = new Schema<Course>(
//   {
//     name: { type: String, required: true },
//     img: { type: String, required: false },
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     desc: { type: String, required: true },
//     duration: { type: Number, required: true, default: 0 },
//     rating: { type: Number, required: false, default: 0 },
//     category: { type: String, required: true },
//     language: { type: String, required: true },
//     users: [{ type: Schema.Types.ObjectId, ref: "User" }],
//     reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
//   },
//   { timestamps: true },
// );

export default model<Course>("Course", CourseSchema);
