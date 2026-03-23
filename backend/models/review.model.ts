import { Schema, model } from "mongoose";
import { Review } from "../types/review.types";

const ReviewSchema = new Schema<Review>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: Number,
    comment: String,
  },
  { timestamps: true }
);

export default model<Review>("Review", ReviewSchema);
