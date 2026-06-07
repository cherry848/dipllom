import { useState } from "react";
import s from "./ModuleStep.module.css";
import { Input } from "../../../../../../shared/Input/Input";
import {
  COURSE_MODULE_STEP_TYPE_LABELS,
  type CourseModuleStepsUnion,
} from "../../../../../../../types/course.types";
import cn from "classnames";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../hooks/reduxHooks";
import {
  NEW_STEP_ID,
  updateCourseModuleSlice,
} from "../../../../../../../redux/slices/updateCourseModule.slice";
import {
  useCreateOrUpdateCourseModuleStepMutation,
  useDeleteCourseModuleStepMutation,
} from "../../../../../../../redux/api";
import { Link } from "react-router";

type Props = {
  courseId: string;
  moduleId: string;
  stepId: string;
  moduleCounter: number;
  moduleNameIsValid: boolean;
};

export const ModuleStep = ({
  courseId,
  moduleId,
  stepId,
  moduleCounter,
  moduleNameIsValid,
}: Props) => {
  const [isEdit, setIsEdit] = useState(stepId === NEW_STEP_ID);
  const [selectIsActive, setSelectIsActive] = useState(false);

  const [createOrUpdateStep] = useCreateOrUpdateCourseModuleStepMutation();
  const [deleteStep] = useDeleteCourseModuleStepMutation();

  const dispatch = useAppDispatch();

  const stepData = useAppSelector((state) =>
    updateCourseModuleSlice.selectors.getStepDataById(state, moduleId, stepId)
  );

  if (!stepData) throw new Error("Шаг не найден");

  const { step, stepCounter } = stepData;

  const typeString = COURSE_MODULE_STEP_TYPE_LABELS[step.stepType];

  const availableStepsEntries = Object.entries(
    COURSE_MODULE_STEP_TYPE_LABELS
  ).filter(([type]) => type !== step.stepType);

  const isNewStep = step._id === NEW_STEP_ID;

  const stepNameIsValid = step.stepName.trim() !== "";

  const saveIsValid = stepNameIsValid && !!step.stepType && moduleNameIsValid;

  const handleSave = () => {
    createOrUpdateStep({
      courseId,
      moduleId,
      stepName: step.stepName,
      stepType: step.stepType,
      stepId: isNewStep ? undefined : step._id,
    });
    setIsEdit(false);
  };

  const handleDelete = () => {
    deleteStep({ courseId, moduleId, stepId: step._id });
  };

  return (
    <div className={cn(s.container, !isEdit && s.underline)}>
      <div className={s.name_container}>
        {isEdit ? (
          <Input
            classNames={{ inputWrapper: s.input_wrapper }}
            placeholder="Название шага"
            value={step.stepName}
            onChange={(stepName) =>
              dispatch(
                updateCourseModuleSlice.actions.setStepById({
                  moduleId,
                  stepId,
                  stepName,
                  stepType: step.stepType,
                })
              )
            }
            error={!stepNameIsValid}
          />
        ) : (
          <Link className={s.name} to={`${moduleId}/steps/${stepId}/edit`}>
            <span>{`${moduleCounter}.${stepCounter}`}</span>
            <span>{step.stepName}</span>
          </Link>
        )}
      </div>

      <div className={s.type_container}>
        {isEdit ? (
          <div className={cn(s.select, selectIsActive && s.active)}>
            <div
              className={s.type}
              onClick={() => setSelectIsActive(!selectIsActive)}
            >
              <span>{typeString}</span>
              <img src="/expand-arrow.svg" />
            </div>

            <div className={s.select_content}>
              {availableStepsEntries.map(([stepType, stepTypeString], idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      dispatch(
                        updateCourseModuleSlice.actions.setStepById({
                          moduleId,
                          stepId,
                          stepName: step.stepName,
                          stepType: stepType as CourseModuleStepsUnion,
                        })
                      );
                      setSelectIsActive(false);
                    }}
                  >
                    {stepTypeString}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className={s.type}>{typeString}</div>
        )}
      </div>

      <div className={s.actions_container}>
        {isEdit ? (
          <span onClick={handleSave} className={!saveIsValid ? s.error : ""}>
            Сохранить
          </span>
        ) : (
          <>
            <span onClick={() => setIsEdit(true)}>Редактировать</span>
            <span onClick={handleDelete}>Удалить</span>
          </>
        )}
      </div>
    </div>
  );
};
