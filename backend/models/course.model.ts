import { Schema, model } from "mongoose";
import { Course } from "../types/course.types";

const CourseSchema = new Schema<Course>(
  {
    name: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "Users" },
    img: { type: String, required: true },
    desc: { type: String, required: true },
    rating: { type: Number, required: true, default: 1 },
    tags: { type: [String], required: true },
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
