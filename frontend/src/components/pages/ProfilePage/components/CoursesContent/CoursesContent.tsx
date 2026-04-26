import { useAppSelector } from "../../../../../hooks/reduxHooks";
import { Courses } from "../../../Progress/components/Courses/Courses";
import { ProgressWrapper } from "./ProgressWrapper/ProgressWrapper";
import s from "./CoursesContent.module.css";

export const CoursesContent = () => {
  const data = useAppSelector((state) => state.user);

  const courses = data.coursesProgress.map((el) => {
    return {
      ...el.course,
      progress: el.progress,
    };
  });

  const inProgressCourses = courses.filter(({ progress }) => progress < 100);

  const finishedCourses = courses.filter(({ progress }) => progress === 100);
  return (
    <div>
      <Courses />
      <div className={s.coursesProgressInfo}>
        <ProgressWrapper title="В процессе" courses={inProgressCourses} />
        <ProgressWrapper title="Завершенные" courses={finishedCourses} />
      </div>
    </div>
  );
};
