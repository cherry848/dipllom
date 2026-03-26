import { Link, useParams } from "react-router";
import { useGetCourseByIdQuery } from "../../../redux/api";
import { Container } from "../../shared/Container/Container";
import { Rating } from "../MainPage/components/CourseCard/components/Rating/Rating";
import { Tags } from "../MainPage/components/CourseCard/components/Tags/Tags";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { Button } from "../../shared/Button/Button";
import s from "./CourseInfoPage.module.css";
import cn from "classnames";
import { Review } from "./components/Review/Review";

export const CourseInfoPage = () => {
  const { id } = useParams();

  const { data: { course, author, reviews } = {}, isLoading } =
    useGetCourseByIdQuery(id ?? "");

  const activeCourseIds = useAppSelector(({ user }) => user.activeCourseIds);

  const isActiveCourse = activeCourseIds.includes(course?._id ?? "");

  if (isLoading) return <div>Загрузка</div>;

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Container className={s.wrapper}>
          <div className={s.name}>{course?.name}</div>

          <div className={s.desc}>{course?.desc}</div>

          <Rating
            rating={course?.rating ?? 0}
            classNames={{
              container: s.rating_container,
              value: s.rating_value,
              starsContainer: s.rating_stars,
            }}
          />
          <Tags tags={course?.tags ?? []} className={s.tags} />

          {!isActiveCourse ? (
            <Button className={s.btn}>Продолжить</Button>
          ) : (
            <Button className={cn(s.btn, s.start_btn)}>Начать</Button>
          )}
        </Container>
      </div>

      <Container className={s.wrapper}>
        <Link className={s.author} to={`/profile/${author?._id ?? ""}`}>
          <div className={s.title}>Преподаватель курса</div>
          <div className={s.info}>
            <img
              src={
                author?.avatar ??
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSioX88afXOaaIcnSn5uh7kfEYRewMTdO0-6Q&s"
              }
            />
            <div className={s.name}>{author?.name}</div>
          </div>
        </Link>

        <div className={s.modules}>
          <div className={s.title}>Структура курса</div>
          Пока нет
        </div>

        {!!reviews?.length && (
          <div className={s.reviews}>
            <div className={s.title}>Отзывы пользователей</div>
            <div className={s.list}>
              {reviews.map((data) => (
                <Review
                  authorId={data.author._id}
                  authorName={data.author.name}
                  rating={data.rating}
                  text={data.comment}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
