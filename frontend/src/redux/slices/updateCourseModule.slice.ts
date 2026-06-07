import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  type CourseModule,
  type CourseModuleStepsUnion,
} from "../../types/course.types";
import { api } from "../api";

type State = {
  modules: CourseModule[];
};

type SetModuleByIdReducerPayload = {
  moduleId: string;
  moduleName: string;
};

type SetStepByIdReducerPayload = {
  moduleId: string;
  stepId: string;
  stepName: string;
  stepType: CourseModuleStepsUnion;
};

const initialState: State = {
  modules: [],
};

export const NEW_MODULE_ID = "newModuleId";
export const NEW_STEP_ID = "newStepId";

const getStepDataById = (state: State, moduleId: string, stepId: string) => {
  const currentModule = state.modules.find((module) => module._id === moduleId);
  const stepIdx =
    currentModule?.steps.findIndex((step) => step._id === stepId) ?? -1;

  return stepIdx === -1 || !currentModule
    ? undefined
    : {
        step: currentModule.steps[stepIdx],
        stepCounter: stepIdx + 1,
      };
};

const getModuleDataById = (state: State, moduleId: string) => {
  const idx = state.modules.findIndex((module) => module._id === moduleId);

  return idx === -1
    ? undefined
    : {
        module: state.modules[idx],
        moduleIdx: idx,
        moduleCounter: idx + 1,
      };
};

export const updateCourseModuleSlice = createSlice({
  name: "updateCourseModule",
  initialState,
  reducers: {
    addNewModule(state) {
      const modulesCount = state.modules.length;

      state.modules.push({
        _id: NEW_MODULE_ID,
        moduleName: `Модуль ${modulesCount + 1}`,
        steps: [],
      });
    },

    deleteModuleById(state, { payload: moduleId }: PayloadAction<string>) {
      const { moduleIdx = -1 } = getModuleDataById(state, moduleId) ?? {};

      if (moduleIdx !== -1) {
        state.modules.splice(moduleIdx, 1);
      }
    },

    setModuleById(
      state,
      { payload }: PayloadAction<SetModuleByIdReducerPayload>
    ) {
      const { module } = getModuleDataById(state, payload.moduleId) ?? {};

      if (module) {
        module.moduleName = payload.moduleName;
      }
    },

    setStepById(state, { payload }: PayloadAction<SetStepByIdReducerPayload>) {
      const { step } =
        getStepDataById(state, payload.moduleId, payload.stepId) ?? {};

      if (step) {
        step.stepName = payload.stepName;
        step.stepType = payload.stepType;
        return;
      }

      const { module } = getModuleDataById(state, payload.moduleId) ?? {};

      module?.steps.push({
        _id: payload.stepId,
        stepName: payload.stepName,
        stepType: payload.stepType,
      });
    },
  },

  extraReducers(builder) {
    builder.addMatcher(
      api.endpoints.getCourseById.matchFulfilled,
      (state, action) => {
        const {
          payload: {
            course: { modules },
          },
        } = action;

        if (modules) {
          state.modules = modules;
        }
      }
    );
  },

  selectors: {
    getModuleDataById(state, moduleId: string) {
      return getModuleDataById(state, moduleId);
    },

    getStepDataById(state, moduleId: string, stepId: string) {
      return getStepDataById(state, moduleId, stepId);
    },
  },
});
