import type { User } from "./user.types";

export type Review = {
  _id: string;
  courseId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ReviewWithAuthor = Omit<Review, "userId"> & { author: User };
