import type { ResBase } from "./types";
import type { User } from "./user.types";

export type AuthResBase<T> = T & ResBase<{ accessToken: string }>;

export type AuthAuthorizeRes = AuthResBase<{ user: User }>;

export type AuthLoginReq = {
  email: string;
  password: string;
};
