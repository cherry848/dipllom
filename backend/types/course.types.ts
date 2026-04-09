import { Types } from "mongoose";
import { Review } from "./review.types";

export type Course = {
  _id: string;
  authorId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  img: string;
  desc: string;
  status: boolean;
  reviews: Review[];
  rating: number;
  tags: string[];
};
