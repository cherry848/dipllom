import { Input } from "../../../../shared/Input/Input";
import s from "./CourseModule.module.css";
import { ModuleStep } from "./components/ModuleStep/ModuleStep";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import {
  NEW_MODULE_ID,
  NEW_STEP_ID,
  updateCourseModuleSlice,
} from "../../../../../redux/slices/updateCourseModule.slice";
import {
  useCreateOrUpdateCourseModuleMutation,
  useDeleteCourseModuleMutation,
} from "../../../../../redux/api";
import { COURSE_MODULE_STEPS } from "../../../../../types/course.types";

type Props = {
  moduleId: string;
  courseId: string;
};

export const CourseModule = ({ moduleId, courseId }: Props) => {
  const [createOrUpdateModule] = useCreateOrUpdateCourseModuleMutation();
  const [deleteModule] = useDeleteCourseModuleMutation();

  const dispatch = useAppDispatch();

  const moduleData = useAppSelector((state) =>
    updateCourseModuleSlice.selectors.getModuleDataById(state, moduleId)
  );

  if (!moduleData) throw new Error("Модуль не найден");

  const { module, moduleCounter } = moduleData;

  const moduleNameIsValid = module.moduleName.trim() !== "";

  const hasNewStep = module.steps.some((step) => step._id === NEW_STEP_ID);

  const isNewModule = moduleId === NEW_MODULE_ID;

  const handleSave = () => {
    createOrUpdateModule({
      courseId,
      moduleName: module.moduleName,
      moduleId: isNewModule ? undefined : moduleId,
    });
  };

  const handleDelete = () => {
    if (isNewModule) {
      dispatch(updateCourseModuleSlice.actions.deleteModuleById(moduleId));
      return;
    }

    deleteModule({ courseId, moduleId });
  };

  const handleNewStep = () => {
    const newStepCounter = module.steps.length + 1;

    dispatch(
      updateCourseModuleSlice.actions.setStepById({
        moduleId,
        stepId: NEW_STEP_ID,
        stepName: `Шаг ${newStepCounter}`,
        stepType: COURSE_MODULE_STEPS.Theory,
      })
    );
  };

  return (
    <div className={s.container}>
      <div className={s.title}>Модуль</div>

      <div className={s.name_container}>
        <div className={s.counter}>{moduleCounter}</div>

        <Input
          classNames={{
            container: s.input_container,
            inputWrapper: s.input_wrapper,
          }}
          placeholder="Название модуля"
          value={module.moduleName}
          onChange={(moduleName) =>
            dispatch(
              updateCourseModuleSlice.actions.setModuleById({
                moduleId,
                moduleName,
              })
            )
          }
          error={!moduleNameIsValid}
        />

        <div className={s.actions}>
          <span
            className={!moduleNameIsValid ? s.error : ""}
            onClick={handleSave}
          >
            Сохранить
          </span>

          <span onClick={handleDelete}>Удалить</span>
        </div>
      </div>

      <div className={s.steps}>
        {module.steps.map((step) => (
          <ModuleStep
            key={step._id}
            courseId={courseId}
            stepId={step._id}
            moduleCounter={moduleCounter}
            moduleId={moduleId}
            moduleNameIsValid={moduleNameIsValid}
          />
        ))}
      </div>

      {!hasNewStep && (
        <div className={s.add_step} onClick={handleNewStep}>
          Добавить шаг
        </div>
      )}
    </div>
  );
};
