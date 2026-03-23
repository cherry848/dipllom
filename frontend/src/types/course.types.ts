export type Course = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  img: string;
  desc: string;
  rating: number;
  tags: string[];
  reviews: string[];
};
