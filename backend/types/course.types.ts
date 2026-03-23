import { Review } from "./review.types";

export type Course = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  img: string;
  desc: string;
  reviews: Review[];
  rating: number;
  tags: string[];
};
