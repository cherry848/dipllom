import { Container } from "../../shared/Container/Container";
import {
  useCreateCourseMutation,
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
  useUploadCourseImageMutation,
} from "../../../redux/api";
import { useNavigate, useParams } from "react-router";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  CourseActionForm,
  type CourseData,
} from "./components/CourseActionForm/CourseActionForm";
import s from "./CourseAction.module.css";

export const CourseAction = () => {
  const { id: courseId } = useParams();

  const {
    data: { course: originalCourse } = {},
    isLoading: originalCourseIsLoading,
  } = useGetCourseByIdQuery(courseId ? { courseId } : skipToken);

  const isCreate = !courseId;

  const [createCourse] = useCreateCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const [uploadCourseImage] = useUploadCourseImageMutation();

  const navigate = useNavigate();

  const mappedOriginalCourse: CourseData | undefined = originalCourse
    ? {
        category: originalCourse.category,
        desc: originalCourse.desc,
        img: originalCourse.img,
        name: originalCourse.name,
        status: originalCourse.status,
        tags: originalCourse.tags,
      }
    : undefined;

  const handleCourseSubmit = async (courseData: CourseData) => {
    try {
      const { course } = isCreate
        ? await createCourse(courseData).unwrap()
        : await updateCourse({ courseId, ...courseData }).unwrap();

      if (courseData.file) {
        await uploadCourseImage({
          courseId: course._id,
          img: courseData.file,
        }).unwrap();
      }

      // navigate(`/course/${course._id}`);
    } catch {
      alert("Ошибка");
    }
  };

  return (
    <Container className={s.container}>
      {originalCourseIsLoading ? (
        "Загрузка"
      ) : (
        <>
          <div className={s.title}>
            {isCreate ? "Создание курса" : "Редактирование курса"}
          </div>

          <CourseActionForm
            key={originalCourse?._id}
            isCreate={isCreate}
            originalCourse={mappedOriginalCourse}
            handleSubmit={handleCourseSubmit}
          />
        </>
      )}
    </Container>
  );
};
