import { Button } from "../../../../shared/Button/Button";
import { Rating } from "./components/Rating/Rating";
import { Tags } from "./components/Tags/Tags";
import s from "./CourseCard.module.css";
import LinesEllipsis from "react-lines-ellipsis";

type CourseCardProps = {
  name: string;
  img: string;
  desc: string;
  rating: number;
  tags?: string[];
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
    <div className={s.container}>
      <div className={s.top}>
        <div className={s.info}>
          <div className={s.name}>{name}</div>
          <LinesEllipsis
            text={desc}
            className={s.desc}
            maxLine="3"
            trimRight
            ellipsis="..."
            basedOn="letters"
          />
        </div>
        <div className={s.img}>
          <img src={img ?? "/avatar--rofl.avif"} />
        </div>
      </div>
      <div className={s.bottom}>
        <Rating rating={rating} />
        <Tags tags={tags} />
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
    </div>
  );
};
