import { Courses } from "../../../Progress/components/Courses/Courses";
import { ProgressWrapper } from "../../../Progress/components/ProgressWrapper/ProgressWrapper";
import s from "./CoursesContent.module.css";
export const CoursesContent = () => {
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
