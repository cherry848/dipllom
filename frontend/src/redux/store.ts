import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user.slice";
import { api } from "./api";
import { updateCourseModuleSlice } from "./slices/updateCourseModule.slice";
import { updateCourseModuleStepContentSlice } from "./slices/updateCourseModuleStepContent.slice";

export const store = configureStore({
  reducer: {
    // slices
    user: userSlice.reducer,
    updateCourseModule: updateCourseModuleSlice.reducer,
    updateCourseModuleStep: updateCourseModuleStepContentSlice.reducer,

    //api
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
