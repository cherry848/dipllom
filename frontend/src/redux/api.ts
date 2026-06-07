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
import type { BaseSort } from "../types/types";
import type {
  Course,
  GetCatalogCoursesReq,
  GetCourseRes,
  GetCatalogCoursesRes,
  GetCoursesWalkthroughRes,
  GetCoursesWalkthroughReq,
  CompleteLessonRes,
  CompleteLessonReq,
} from "../types/course.types";
import type { Module } from "../components/pages/CourseWalkthrough/components/CourseWalkthroughMenu/types/CourseWalkthroughMenu.types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User", "Course"],
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

    // User
    update: build.mutation<
      UserUpdateRes,
      { id: string; data: FormData | { name?: string; password?: string } }
    >({
      query: ({ id, data }) => ({
        url: `/me/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "User", id: result.user._id }] : ["User"],
    }),

    verifyPassword: build.mutation<VerifyPasswordRes, VerifyPasswordReq>({
      query: ({ id, password }) => ({
        url: `me/${id}/verify-password`,
        method: "POST",
        data: { password },
      }),
    }),

    // Courses
    getCourses: build.query<Course[], BaseSort>({
      query: (params) => ({ url: "courses", params }),
    }),

    getCourseById: build.query<GetCourseRes, string>({
      query: (id) => ({ url: `/course/${id}` }),
    }),

    getCoursesByAuthor: build.query<Course[], string>({
      query: (id) => ({ url: `/me/${id}/courses` }),
    }),

    getCatalogCourses: build.query<GetCatalogCoursesRes, GetCatalogCoursesReq>({
      query: (data) => ({ url: "/courses", method: "POST", data }),
      providesTags: (result) =>
        result
          ? result.data.map((course) => ({
              type: "Course",
              id: course._id,
            }))
          : ["Course"],
    }),
    getModules: build.query<Module[], void>({
      query: () => ({ url: "/modules", method: "GET" }),
    }),
    getCourseWalkthrough: build.query<
      GetCoursesWalkthroughRes,
      GetCoursesWalkthroughReq
    >({
      query: ({ courseId, userId }) => ({
        url: `/course/${courseId}/${userId}/walkthrough`,
        method: "GET",
      }),
    }),
    completeLesson: build.mutation<CompleteLessonRes, CompleteLessonReq>({
      query: ({ courseId, userId, stepId }) => ({
        url: `/course/${courseId}/${userId}/${stepId}/progress`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useAuthorizeQuery,
  useLoginMutation,
  useRegisterMutation,
  useUpdateMutation,
  useVerifyPasswordMutation,
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetCoursesByAuthorQuery,
  useLazyGetCatalogCoursesQuery,
  useGetModulesQuery,
  useGetCourseWalkthroughQuery,
  useCompleteLessonMutation,
} = api;
