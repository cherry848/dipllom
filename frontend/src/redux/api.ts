import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../utils/axios";
import {
  type UserUpdateRes,
  type VerifyPasswordReq,
  type VerifyPasswordRes,
} from "../types/user.types";
import type {
  AuthAuthorizeRes,
  AuthLoginReq,
  AuthLoginRes,
  AuthRegisterRes,
} from "../types/auth.types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User"],
  endpoints: (build) => ({
    // Auth
    authorize: build.query<AuthAuthorizeRes, void>({
      query: () => ({ url: "/auth/authorize", method: "POST" }),
      providesTags: (result) =>
        result ? [{ type: "User", id: result.user._id }] : ["User"],
    }),

    login: build.mutation<AuthLoginRes, AuthLoginReq>({
      query: (data) => ({ url: "/auth/login", method: "POST", data }),
      invalidatesTags: ["User"],
    }),

    register: build.mutation<AuthRegisterRes, AuthLoginReq>({
      query: (data) => ({ url: "/auth/register", method: "POST", data }),
      invalidatesTags: ["User"],
    }),

    update: build.mutation<
      UserUpdateRes,
      { id: string; data: FormData | { name?: string; password?: string } }
    >({
      query: ({ id, data }) => {
        return {
          url: `/me/${id}`,
          method: "PATCH",
          data,
        };
      },
      // invalidatesTags:  ["User"],
      invalidatesTags: (result) =>
        result ? [{ type: "User", id: result.user._id }] : ["User"],
    }),
    verifyPassword: build.mutation<VerifyPasswordRes, VerifyPasswordReq>({
      query: ({ id, password }) => {
        return {
          url: `me/${id}/verify-password`,
          method: "POST",
          data: { password: password },
        };
      },
    }),
  }),
});

export const {
  useAuthorizeQuery,
  useLoginMutation,
  useRegisterMutation,
  useUpdateMutation,
  useVerifyPasswordMutation,
} = api;
