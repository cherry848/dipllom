import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../utils/axios";
import type { User } from "../types/user.types";
import type { AuthAuthorizeRes, AuthLoginReq } from "../types/auth.types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    // Auth
    authorize: build.query<AuthAuthorizeRes, void>({
      query: () => ({ url: "/auth/authorize", method: "POST" }),
    }),

    login: build.mutation<User, AuthLoginReq>({
      query: (data) => ({ url: "/auth/login", method: "POST", data }),
    }),
  }),
});

export const { useAuthorizeQuery, useLoginMutation } = api;
