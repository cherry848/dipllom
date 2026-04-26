import { Types } from "mongoose";

export type User = {
  _id: string;
  email: string;
  password: string;
  name: string;
  avatar: string | null;
  coursesProgress: {
    courseId: Types.ObjectId;
    progress: number;
  }[];
  activeCourseIds: string[];
  createdAt: Date;
  updatedAt: Date;
};
