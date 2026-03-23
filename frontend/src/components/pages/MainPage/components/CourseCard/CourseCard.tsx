import s from "./CourseCard.module.css";
import cn from "classnames";

type CourseCardProps = {
  name: string;
  img: string;
  desc: string;
  rating: number;
  tags: string[];
};

const IconStar = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.20897 0.165836C5.22723 0.117125 5.25991 0.0751467 5.30267 0.0455125C5.34542 0.0158783 5.3962 0 5.44822 0C5.50024 0 5.55102 0.0158783 5.59377 0.0455125C5.63653 0.0751467 5.66921 0.117125 5.68747 0.165836L6.98247 3.83734H10.64C10.6921 3.83755 10.743 3.85369 10.7857 3.88361C10.8285 3.91353 10.8611 3.95579 10.8791 4.00473C10.8972 4.05368 10.8998 4.10698 10.8868 4.15748C10.8737 4.20799 10.8455 4.2533 10.806 4.28734L7.74997 6.82084L9.02897 10.6633C9.04595 10.7148 9.04615 10.7703 9.02955 10.8219C9.01294 10.8735 8.98039 10.9185 8.93658 10.9504C8.89277 10.9824 8.83996 10.9995 8.78576 10.9995C8.73155 10.9995 8.67876 10.9823 8.63497 10.9503L5.44747 8.61184L2.25847 10.9498C2.21472 10.9815 2.16204 10.9985 2.10802 10.9984C2.05399 10.9983 2.0014 10.981 1.95779 10.9492C1.91418 10.9173 1.8818 10.8724 1.8653 10.8209C1.8488 10.7695 1.84904 10.7141 1.86597 10.6628L3.14547 6.82034L0.0889695 4.28684C0.0494332 4.2528 0.0212408 4.20749 0.00816767 4.15698C-0.00490549 4.10648 -0.00223531 4.05318 0.0158207 4.00423C0.0338766 3.95529 0.0664564 3.91303 0.109197 3.88311C0.151938 3.85319 0.202799 3.83705 0.25497 3.83684H3.91297L5.20897 0.165836Z"
      stroke="#334155"
    />
  </svg>
);

export const CourseCard = ({
  name,
  img,
  desc,
  rating,
  tags,
}: CourseCardProps) => {
  return (
    <div className={s.container}>
      <div className={s.left}>
        <div className={s.name}>{name}</div>
        <div className={s.desc}>{desc}</div>

        <div className={s.rating}>
          <span>{rating}</span>
          <div className={s.stars}>
            {Array.from({ length: 5 }).map((_, idx) => {
              const isFilled = idx + 1 <= Math.floor(rating);

              return (
                <div key={idx} className={cn(s.star, isFilled && s.filled)}>
                  <IconStar />
                </div>
              );
            })}
          </div>
        </div>

        <div className={s.tags}>
          {tags.map((tag, idx) => {
            const isLast = idx === tags.length - 1;

            return (
              <div className={s.tag} key={idx}>
                #{tag}
                {!isLast && ","}
              </div>
            );
          })}
        </div>
      </div>

      <div className={s.img}>
        <img src={img} />
      </div>
    </div>
  );
};
