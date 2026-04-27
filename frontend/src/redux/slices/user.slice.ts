import { createSlice, isAction, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user.types";

import { api } from "../api";

type UserState = User & {
  isAuth: boolean;
  isLoading: boolean;
};

type ModalState = {
  show: boolean;
  type: "login" | "register";
  email: string;
  password: string;
};

const USER_INITIAL_STATE: UserState = {
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

const MODAL_INITIAL_STATE: ModalState = {
  show: false,
  type: "register",
  email: "",
  password: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: USER_INITIAL_STATE,
  reducers: {},
  extraReducers(build) {
    build.addMatcher(
      api.endpoints.authorize.matchFulfilled,
      (_, { payload }) => {
        return { ...payload.user, isAuth: true, isLoading: false };
      },
    );
    build.addMatcher(api.endpoints.authorize.matchRejected, () => {
      return { ...USER_INITIAL_STATE, isLoading: false };
    });
  },
});

export const modalSlice = createSlice({
  name: "modal",
  initialState: MODAL_INITIAL_STATE,
  reducers: {
    setData: (state, action: PayloadAction<ModalState>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    toggle: (state) => {
      state.show = state.show === true ? false : true;
    },
    changeType: (state) => {
      state.type = state.type === "login" ? "register" : "login";
    },
  },
});

export const { setData, toggle, changeType } = modalSlice.actions;

// const [modal, setModal] = useState({ show: false, type: "login" });
//  const [data, setData] = useState({ email: "", password: "" });
