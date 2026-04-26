import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axiosOriginal, { AxiosError, type AxiosRequestConfig } from "axios";
import { BACK_URL } from "./constants";

type RefreshResponse = {
  accessToken: string;
  message: string;
};

declare module "axios" {
  interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

export const axios = axiosOriginal.create({
  baseURL: BACK_URL + "/api",
  withCredentials: true,
});

axios.interceptors.request.use((req) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  return req;
});

axios.interceptors.response.use(
  (res) => {
    const accessToken = res.data.accessToken;

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    return res;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true;

      try {
        const {
          data: { accessToken },
        } = await axiosOriginal.post<RefreshResponse>(
          "api/auth/refresh",
          {},
          {
            baseURL: import.meta.env.VITE_BACK_URL,
            withCredentials: true,
          }
        );

        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axios(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const axiosBaseQuery =
  (): BaseQueryFn<{
    url: string;
    method?: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
    headers?: AxiosRequestConfig["headers"];
  }> =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data ?? err.message,
        },
      };
    }
  };
