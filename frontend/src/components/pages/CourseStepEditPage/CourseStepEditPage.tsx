import { useParams } from "react-router";
import s from "./CourseStepEdit.module.css";
import { useGetCourseByIdQuery } from "../../../redux/api";
import { Container } from "../../shared/Container/Container";
import { COURSE_MODULE_STEP_TYPE_LABELS } from "../../../types/course.types";
import { Button } from "../../shared/Button/Button";
import SimpleEditor from "./components/TextEditor/TextEditor";

export const CourseStepEditPage = () => {
  const { courseId, moduleId, stepId } = useParams();

  const {
    data: { course } = {},
    isError,
    isLoading,
  } = useGetCourseByIdQuery(courseId ?? "");

  if (isLoading) return "Загрузка";

  const stepData = course?.modules
    ?.find((module) => module._id === moduleId)
    ?.steps.find((step) => step._id === stepId);

  if (isError || !stepData) return "Ошибка";

  return (
    <Container className={s.container}>
      <div className={s.header}>
        <div className={s.type}>
          {COURSE_MODULE_STEP_TYPE_LABELS[stepData.stepType]}
        </div>
      </div>

      <div className={s.content}>
        <SimpleEditor />

        <Button className={s.btn}>Сохранить</Button>
      </div>
    </Container>
  );
};
