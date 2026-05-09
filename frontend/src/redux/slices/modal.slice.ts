import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthType = "Войти" | "Зарегистрироваться";

type ModalError = { email?: string; password?: string; unknownErr?: string };

type ModalState = {
  show: boolean;
  type: AuthType;
  email: string;
  password: string;
  error: ModalError;
};

const MODAL_INITIAL_STATE: ModalState = {
  show: false,
  type: "Зарегистрироваться",
  email: "",
  password: "",
  error: { email: "", password: "", unknownErr: "" },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: MODAL_INITIAL_STATE,
  reducers: {
    setData: (
      state,
      action: PayloadAction<Partial<Pick<ModalState, "email" | "password">>>,
    ) => {
      return { ...state, ...action.payload };
    },
    toggle: (state) => {
      state.show = !state.show;
    },
    changeType: (state, action: PayloadAction<AuthType>) => {
      state.type = action.payload;
    },
    setError: (state, action: PayloadAction<ModalError>) => {
      state.error = action.payload;
    },
    clearModal: () => {
      return MODAL_INITIAL_STATE;
    },
  },
});

export const { setData, toggle, changeType, setError, clearModal } =
  modalSlice.actions;
