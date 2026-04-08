import { Button } from "../../../../shared/Button/Button";
import { Rating } from "./components/Rating/Rating";
import { Tags } from "./components/Tags/Tags";
import s from "./CourseCard.module.css";

type CourseCardProps = {
  name: string;
  img: string;
  desc: string;
  rating: number;
  tags: string[];
  progress?: number;
};

export const CourseCard = ({
  name,
  img,
  desc,
  rating,
  tags,
  progress,
}: CourseCardProps) => {
  return (
    <>
      <div className={s.container}>
        <div className={s.courseInfo}>
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
        {progress && (
          <div className={s.progress}>
            <div
              className={s.progressFill}
              style={{ width: `${progress}%`, background: "blue" }}
            ></div>
          </div>
        )}
        {progress === 100 && <Button className={s.button}>Сертификат</Button>}
      </div>
    </>
  );
};
