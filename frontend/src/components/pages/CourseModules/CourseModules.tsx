import { useParams } from "react-router";
import s from "./CourseModules.module.css";
import { useGetCourseByIdQuery } from "../../../redux/api";
import { Container } from "../../shared/Container/Container";
import { Button } from "../../shared/Button/Button";
import { CourseModule } from "./components/CourseModule/CourseModule";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  NEW_MODULE_ID,
  updateCourseModuleSlice,
} from "../../../redux/slices/updateCourseModule.slice";

export const CourseModules = () => {
  const { id: courseId } = useParams();

  const dispatch = useAppDispatch();

  const {
    data: { course } = {},
    isLoading,
    isError,
  } = useGetCourseByIdQuery(courseId ?? "");

  const { modules } = useAppSelector((state) => state.updateCourseModule);

  const hasNewModule = modules.some((module) => module._id === NEW_MODULE_ID);

  const existingModules = course?.modules?.filter(
    (module) => module._id !== NEW_MODULE_ID
  );

  return (
    <Container className={s.container}>
      {isLoading ? (
        "Загрузка"
      ) : isError || !course ? (
        "Ошибка"
      ) : (
        <div className={s.content}>
          <div className={s.title}>Содержание курса</div>
          <div className={s.desc}>{course.desc}</div>

          <div className={s.modules}>
            {course.modules?.length || hasNewModule ? (
              <>
                {existingModules?.map((module) => (
                  <CourseModule
                    key={module._id}
                    courseId={course._id}
                    moduleId={module._id}
                  />
                ))}

                {hasNewModule && (
                  <CourseModule
                    moduleId={NEW_MODULE_ID}
                    courseId={course._id}
                  />
                )}
              </>
            ) : (
              <div className={s.empty_modules}>Пока что модулей нет</div>
            )}
          </div>

          <Button
            className={s.button}
            disable={hasNewModule}
            onClick={() =>
              dispatch(updateCourseModuleSlice.actions.addNewModule())
            }
          >
            + Новый модуль
          </Button>
        </div>
      )}
    </Container>
  );
};
