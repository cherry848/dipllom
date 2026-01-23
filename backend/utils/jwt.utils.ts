import type { Request } from "express";
import { Cookies } from "../types/types";

export const getHeaderAccessToken = (req: Request) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ") || authHeader.split(" ").length !== 2)
    return;

  return authHeader.split(" ")[1];
};

export const getCookiesRefreshToken = (req: Request) => {
  const { refreshToken } = req.cookies as Cookies;
  return refreshToken;
};
