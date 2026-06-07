import { createApi } from "@reduxjs/toolkit/query/react";
import { axios, axiosBaseQuery } from "../utils/axios";
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
import type { BaseSort, ResBase } from "../types/types";
import type {
  Course,
  GetCatalogCoursesReq,
  GetCourseRes,
  GetCatalogCoursesRes,
  GetCoursesWalkthroughRes,
  GetCoursesWalkthroughReq,
  CompleteLessonRes,
  CompleteLessonReq,
  CreateCourseReq,
  CreateCourseRes,
  UploadCourseImageRes,
  UploadCourseImageReq,
  UpdateCourseRes,
  UpdateCourseReq,
  CreateOrUpdateCourseModuleRes,
  CreateOrUpdateCourseModuleReq,
  DeleteCourseModuleRes,
  DeleteCourseModuleReq,
  CreateOrUpdateCourseModuleStepRes,
  CreateOrUpdateCourseModuleStepReq,
  DeleteCourseModuleStepReq,
  DeleteCourseModuleStepRes,
  GetCourseReq,
} from "../types/course.types";
import type { Module } from "../components/pages/CourseWalkthrough/components/CourseWalkthroughMenu/types/CourseWalkthroughMenu.types";
import type {
  CreateOrUpdateAnswerReq,
  CreateOrUpdateAnswerRes,
  TestAnswer,
} from "../types/testAnswer.types";
import { updateCourseModuleStepContentSlice } from "./slices/updateCourseModuleStepContent.slice";

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User", "Course", "Answer"],
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
      query: (data) => ({ url: "auth/register", method: "POST", data }),
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
        url: `/me/${id}/verify-password`,
        method: "POST",
        data: { password },
      }),
    }),

    // Courses
    getCourses: build.query<Course[], BaseSort>({
      query: (params) => ({ url: "/courses", params }),
    }),

    getCourseById: build.query<GetCourseRes, GetCourseReq>({
      query: ({ courseId }) => ({ url: `/course/${courseId}` }),
      providesTags: (result) =>
        result ? [{ type: "Course", id: result.course._id }] : ["Course"],
      onQueryStarted: async (data, { dispatch }) => {
        const { fetchAnswers, courseId } = data;
        if (!fetchAnswers) return;

        const { answers }: { answers: TestAnswer[] } = (
          await axios.get(`/course/${courseId}/answers`)
        ).data;

        answers.forEach((answer) => {
          dispatch(
            updateCourseModuleStepContentSlice.actions.setAnswer({
              answerId: answer._id,
              questionId: answer.questionId,
              correct: answer.correct,
              text: answer.answer,
            }),
          );
        });
      },
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

    createCourse: build.mutation<CreateCourseRes, CreateCourseReq>({
      query: (data) => ({ url: "/course", method: "POST", data }),
      invalidatesTags: (result) =>
        result ? [{ type: "Course", id: result.course._id }] : ["Course"],
    }),

    updateCourse: build.mutation<UpdateCourseRes, UpdateCourseReq>({
      query: (data) => ({
        url: `/course/${data.courseId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Course", id: result.course._id }] : ["Course"],
    }),

    uploadCourseImage: build.mutation<
      UploadCourseImageRes,
      UploadCourseImageReq
    >({
      query: (data) => {
        const formData = new FormData();
        formData.append("image", data.img);
        return {
          url: `/course/${data.courseId}/upload-image`,
          method: "POST",
          data: formData,
        };
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Course", id: result.course._id }] : ["Course"],
    }),

    createOrUpdateCourseModule: build.mutation<
      CreateOrUpdateCourseModuleRes,
      CreateOrUpdateCourseModuleReq
    >({
      query: ({ courseId, ...data }) => ({
        url: `/course/${courseId}/module`,
        method: "POST",
        data,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Course", id: result.course._id }] : ["Course"],
    }),

    deleteCourseModule: build.mutation<
      ResBase<DeleteCourseModuleRes>,
      DeleteCourseModuleReq
    >({
      query: ({ courseId, moduleId }) => ({
        url: `/course/${courseId}/module/${moduleId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Course", id: result.course._id }] : ["Course"],
    }),

    createOrUpdateCourseModuleStep: build.mutation<
      ResBase<CreateOrUpdateCourseModuleStepRes>,
      CreateOrUpdateCourseModuleStepReq
    >({
      query: ({ courseId, moduleId, ...data }) => ({
        url: `/course/${courseId}/module/${moduleId}/step/create-or-update`,
        method: "POST",
        data,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Course", id: result.course._id }] : ["Course"],
    }),

    deleteCourseModuleStep: build.mutation<
      ResBase<DeleteCourseModuleStepRes>,
      DeleteCourseModuleStepReq
    >({
      query: ({ courseId, moduleId, stepId }) => ({
        url: `/course/${courseId}/module/${moduleId}/step/${stepId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Course", id: result.course._id }] : ["Course"],
    }),

    // Answer

    createOrUpdateAnswer: build.mutation<
      ResBase<CreateOrUpdateAnswerRes>,
      CreateOrUpdateAnswerReq
    >({
      query: (data) => ({
        url: "/answer/create-or-update",
        method: "POST",
        data,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: "Answer", id: result.answer._id }] : ["Answer"],
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
  useCreateCourseMutation,
  useUploadCourseImageMutation,
  useUpdateCourseMutation,
  useCreateOrUpdateCourseModuleMutation,
  useDeleteCourseModuleMutation,
  useCreateOrUpdateCourseModuleStepMutation,
  useDeleteCourseModuleStepMutation,
  useCreateOrUpdateAnswerMutation,
} = api;
