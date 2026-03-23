import { Types } from "mongoose";

export type Review = {
  _id: string;
  courseId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
};
