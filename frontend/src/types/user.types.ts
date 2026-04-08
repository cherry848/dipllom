import type { Course } from "./course.types";
import type { ResBase } from "./types";

export type User = {
  _id: string;
  email: string;
  password: string;
  name: string;
  avatar: string | null;
  coursesProgress: [{ course: Course; progress: number }];
  createdAt: string;
  updatedAt: string;
};

export type UserUpdateReq = {
  id: string;
  data: Partial<{ name: string; password: string; avatar: FormData | null }>;
};

export type VerifyPasswordReq = { id: string } & Pick<User, "password">;

export type VerifyPasswordRes = { message: string };

export type UserUpdateRes = ResBase<{ user: User }>;
