import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { User, UserLoginThunkReq } from "../../types/user.types";
import { axios } from "../../utils/axios";

type UserState = User & {
  isAuth: boolean;
};

const INITIAL_STATE: UserState = {
  _id: "",
  isAuth: false,
  createdAt: "",
  updatedAt: "",
  email: "",
  name: "",
  password: "",
};

export const authorize = createAsyncThunk("user/authorize", async () => {
  const user = await axios.post("/auth/authorize");
  return user.data;
});

export const login = createAsyncThunk(
  "user/login",
  async (data: UserLoginThunkReq) => {
    const user = await axios.post("/auth/login", data);
    return user.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUser(state, action: PayloadAction<Partial<UserState>>) {
      state = { ...state, ...action };
    },
  },
  extraReducers(builder) {
    builder.addCase(authorize.fulfilled, (state, action) => {
      state = {
        ...state,
        ...action.payload,
        auth: { isAuth: true, isLoading: false },
      };
    });

    builder.addCase(authorize.rejected, () => {
      return INITIAL_STATE;
    });
  },
});
