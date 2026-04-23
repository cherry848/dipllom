import { useAppSelector } from "../../../../../hooks/reduxHooks";
import { useGetCoursesByAuthorQuery } from "../../../../../redux/api";
import s from "../CoursesList/CoursesList.module.css";
import { MyCourseCard } from "./MyCourseCard/MyCourseCard";

export const CoursesList = () => {
  const { _id, name } = useAppSelector((state) => state.user);

  const { data } = useGetCoursesByAuthorQuery(_id);

  return (
    <div className={s.container}>
      {data?.map((course) => {
        return (
          <MyCourseCard
            key={course._id}
            title={course.name}
            author={name}
            status={course.status}
          />
        );
      })}
    </div>
  );
};
