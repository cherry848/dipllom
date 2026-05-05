import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  show: boolean;
  type: "Войти" | "Зарегистрироваться";
  email: string;
  password: string;
};

const MODAL_INITIAL_STATE: ModalState = {
  show: false,
  type: "Зарегистрироваться",
  email: "",
  password: "",
};

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
      state.type = state.type === "Войти" ? "Зарегистрироваться" : "Войти";
    },
  },
});

export const { setData, toggle, changeType } = modalSlice.actions;
