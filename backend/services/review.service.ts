import reviewModel from "../models/review.model";
import { CreateReviewData, Review } from "../types/review.types";

class ReviewService {
  async save(courseId: string, { userId, rating, comment }: CreateReviewData) {
    const review = new reviewModel({ courseId, userId, rating, comment });

    await review.save();

    return review;
  }

  async getAll(courseId: string) {
    const reviews = await reviewModel.find({ courseId });

    return reviews;
  }
}

export const reviewService = new ReviewService();
