import { Course } from "../Course/Course";
import type { Course as CourseType } from "../../../../../types/course.types";
import s from "../Courses/Courses.module.css";
import type { Pagination } from "../../../../../types/types";
import c from "classnames";

interface CoursesProps {
  courses: CourseType[];
  pagination: Pagination;
  isLoading: boolean;
  currentPage: number;
  togglePage: (page: number) => void;
}

export const Courses = ({
  courses,
  pagination,
  isLoading,
  currentPage,
  togglePage,
}: CoursesProps) => {
  if (isLoading) return <div>Loading...</div>;
  const pages = pagination.pages;

  const changePage = (page: number) => {
    const nextPage = currentPage + page;

    if (nextPage < 1 || nextPage > pages) return;

    togglePage(nextPage);
  };

  return (
    <div className={s.courses}>
      <div className={s.coursesWrapper}>
        {courses?.map((course, idx) => {
          return (
            <Course
              avg={course.rating}
              category={course.category}
              desc={course.desc}
              language={course.language}
              title={course.name}
              key={idx}
            />
          );
        })}
      </div>
      <ul className={s.pagination}>
        <li
          onClick={() => changePage(-1)}
          className={c(s.page, {
            [s.invalid]: currentPage === 1,
          })}
        >
          <img className={s.pointer} src="/left--pointer.svg" alt="" />
        </li>
        {Array.from({ length: pages }).map((_, idx) => {
          return (
            <li
              key={idx}
              onClick={() => togglePage(idx + 1)}
              className={c(s.page, {
                [s.current]: currentPage === idx + 1,
              })}
            >
              {idx + 1}
            </li>
          );
        })}
        <li
          onClick={() => changePage(1)}
          className={c(s.page, {
            [s.invalid]: pages === currentPage,
          })}
        >
          <img className={s.pointer} src="/right--pointer.svg" alt="" />
        </li>
      </ul>
    </div>
  );
};
