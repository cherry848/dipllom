import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types/user.types";

import { api } from "../api";

type UserState = User & {
  isAuth: boolean;
  isLoading: boolean;
};

const INITIAL_STATE: UserState = {
  _id: "",
  isAuth: false,
  isLoading: true,
  createdAt: "",
  updatedAt: "",
  email: "",
  name: "",
  password: "",
  avatar: null,
  activeCourseIds: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers(build) {
    build.addMatcher(
      api.endpoints.authorize.matchFulfilled,
      (_, { payload }) => {
        return { ...payload.user, isAuth: true, isLoading: false };
      }
    );
    build.addMatcher(api.endpoints.authorize.matchRejected, () => {
      return { ...INITIAL_STATE, isLoading: false };
    });
  },
});
