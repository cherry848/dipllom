import { Star } from "../../../../../icons/Star/Star";
import s from "../Course/Course.module.css";

interface CourseProps {
  title: string;
  desc: string;
  avg: number;
  language: string;
  category: string;
}

export const Course = ({
  avg,
  category,
  desc,
  language,
  title,
}: CourseProps) => {
  return (
    <div className={s.course}>
      <div className={s.courseInfo}>
        <h1 className={s.title}>{title}</h1>
        <p className={s.desc}>{desc}</p>
        <div className={s.rating}>
          <span className={s.avg}>{avg === 0 ? "Нет отзывов" : avg}</span>
          <span className={s.stars}>
            {Array.from({
              length: Math.ceil(avg),
            }).map((_, i, arr) => {
              return (
                <Star
                  partial={i === arr.length - 1 && !Number.isInteger(avg)}
                  key={i}
                />
              );
            })}
          </span>
        </div>
        <div className={s.categories}>
          <span className={s.language}>{language}</span>
          <span className={s.category}>{category}</span>
        </div>
      </div>
      <img className={s.img} src="/preview.png" alt="" />
    </div>
  );
};
