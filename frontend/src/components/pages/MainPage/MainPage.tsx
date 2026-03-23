import { useGetCoursesQuery } from "../../../redux/api";
import { Container } from "../../shared/Container/Container";
import { CoursesSlider } from "./components/CoursesSlider/CoursesSlider";
import { TopSearch } from "./components/TopSearch/TopSearch";
import s from "./MainPage.module.css";

export const MainPage = () => {
  const { data: popularCourses } = useGetCoursesQuery({
    sortBy: "reviews",
    limit: 10,
    order: -1,
  });

  const { data: newCourses } = useGetCoursesQuery({
    sortBy: "createdAt",
    limit: 10,
    order: -1,
  });

  return (
    <Container className={s.container}>
      <TopSearch />

      <div className={s.list}>
        <CoursesSlider
          title="Популярные курсы"
          courses={popularCourses ?? []}
        />

        <CoursesSlider title="Новые курсы" courses={newCourses ?? []} />
      </div>
    </Container>
  );
};
