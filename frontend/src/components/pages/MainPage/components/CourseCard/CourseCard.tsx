import { Rating } from "./components/Rating/Rating";
import { Tags } from "./components/Tags/Tags";
import s from "./CourseCard.module.css";

type CourseCardProps = {
  name: string;
  img: string;
  desc: string;
  rating: number;
  tags: string[];
};

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

        <Rating rating={rating} />
        <Tags tags={tags} />
      </div>

      <div className={s.img}>
        <img src={img} />
      </div>
    </div>
  );
};
