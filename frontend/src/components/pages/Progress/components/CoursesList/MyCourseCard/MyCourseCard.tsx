import c from "classnames";
import s from "../MyCourseCard/MyCourseCard.module.css";

type MyCourseCardProps = {
  title: string;
  author: string;
  status: boolean;
};

export const MyCourseCard = ({ author, status, title }: MyCourseCardProps) => {
  return (
    <div className={s.container}>
      <img className={s.img} src="" alt="" />
      <div className={s.info}>
        <h1 className={s.title}>{title}</h1>
        <div className={s.authorBar}>
          <span className={s.author}>{author}</span>
          <span className={s.edit}>
            Редактировать
            <img className={s.editImg} src="/edit--course.svg" alt="" />
          </span>
        </div>
        <span
          className={c(s.status, {
            [s.published]: status,
            [s.unpublished]: !status,
          })}
        >
          {status ? "Опубликовано" : "Не опубликовано"}
        </span>
      </div>
    </div>
  );
};
