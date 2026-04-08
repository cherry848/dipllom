import { useAuthorizeQuery } from "../../../redux/api";
import { List } from "../../List/List";
import { Container } from "../../shared/Container/Container";
import s from "../Progress/Progress.module.css";
import { ProgressWrapper } from "./components/ProgressWrapper/ProgressWrapper";

export const Progress = () => {
  const { data } = useAuthorizeQuery();

  if (!data) return <>Loading...</>;

  const courses = data.user.coursesProgress.map((el) => {
    return {
      ...el.course,
      progress: el.progress,
    };
  });

  const inProgressCourses = courses.filter(({ progress }) => progress < 100);

  const finishedCourses = courses.filter(({ progress }) => progress === 100);

  return (
    <Container>
      <List current="Курсы" />
      <div className={s.coursesProgressInfo}>
        <ProgressWrapper title="В процессе" courses={inProgressCourses} />
        <ProgressWrapper title="Завершенные" courses={finishedCourses} />
      </div>
    </Container>
  );
};
