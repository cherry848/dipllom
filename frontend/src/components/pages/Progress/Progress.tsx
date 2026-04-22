import { useAppSelector } from "../../../hooks/reduxHooks";
import { List } from "../../List/List";
import { Container } from "../../shared/Container/Container";
import s from "../Progress/Progress.module.css";
import { Courses } from "./components/Courses/Courses";
import { ProgressWrapper } from "./components/ProgressWrapper/ProgressWrapper";

export const Progress = () => {
  const data = useAppSelector((state) => state.user);

  console.log(data);

  const courses = data.coursesProgress.map((el) => {
    return {
      ...el.course,
      progress: el.progress,
    };
  });

  const inProgressCourses = courses.filter(({ progress }) => progress < 100);

  const finishedCourses = courses.filter(({ progress }) => progress === 100);

  return (
    <Container className={s.container}>
      <Courses />
      <div className={s.coursesProgressInfo}>
        <ProgressWrapper title="В процессе" courses={inProgressCourses} />
        <ProgressWrapper title="Завершенные" courses={finishedCourses} />
      </div>
    </Container>
  );
};
