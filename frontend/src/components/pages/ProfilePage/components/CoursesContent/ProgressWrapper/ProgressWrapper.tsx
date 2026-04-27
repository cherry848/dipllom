import s from "../ProgressWrapper/ProgressWrapper.module.css";
import type { CourseProgress } from "../../../../../../types/course.types";
import { CourseCard } from "../../../../MainPage/components/CourseCard/CourseCard";

type ProgressWrapperProps = {
  courses: CourseProgress[];
  title: string;
};

export const ProgressWrapper = ({ courses, title }: ProgressWrapperProps) => {
  return (
    <div className={s.wrapper}>
      <div className={s.title}>{title}</div>
      <div className={s.courses}>
        {courses.map((data) => (
          <CourseCard key={data._id} {...data} />
        ))}
      </div>
    </div>
  );
};
