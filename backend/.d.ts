import * as express from "express";
import { User } from "./types/user.types";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
