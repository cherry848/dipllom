import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import s from "./TheoryContent.module.css";
import { useGetCourseByIdQuery } from "../../../../../redux/api";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { useParams } from "react-router";
import { updateCourseModuleStepContentSlice } from "../../../../../redux/slices/updateCourseModuleStepContent.slice";
import {
  COURSE_MODULE_STEPS,
  type CourseModuleStep,
} from "../../../../../types/course.types";

type Props = {
  stepData: CourseModuleStep;
};

export const TheoryContent = ({ stepData }: Props) => {
  const { courseId, stepId } = useParams();

  const { isError, isLoading } = useGetCourseByIdQuery({
    courseId: courseId ?? "",
  });

  const dispatch = useAppDispatch();

  if (isLoading) return "Загрузка";

  if (isError || !stepData) return "Ошибка";

  const handleValueChange = (value: string) => {
    dispatch(
      updateCourseModuleStepContentSlice.actions.setStepContentTheory({
        stepId: stepId ?? "",
        content: value,
      })
    );
  };

  return (
    <div className={s.container}>
      <ReactQuill
        className={s.editor}
        theme="snow"
        value={stepData.content?.[COURSE_MODULE_STEPS.Theory] ?? ""}
        onChange={handleValueChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "list",
          "bullet",
          "link",
          "image",
        ]}
        placeholder="Начните писать..."
      />
    </div>
  );
};
