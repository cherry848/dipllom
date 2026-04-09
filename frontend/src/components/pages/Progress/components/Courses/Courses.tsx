import s from "../Courses/Courses.module.css";
import { CoursesList } from "../CoursesList/CoursesList";

export const Courses = () => {
  return (
    <div className={s.container}>
      <div className={s.title}>Мои курсы</div>
      <CoursesList />
      <span className={s.create}>Создать курс +</span>
    </div>
  );
};
