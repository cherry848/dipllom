import { Link } from "react-router";
import { Rating } from "../../../MainPage/components/CourseCard/components/Rating/Rating";
import s from "./Review.module.css";

type ReviewProps = {
  rating: number;
  text: string;
  authorName: string;
  authorId: string;
};

export const Review = ({ rating, authorId, authorName, text }: ReviewProps) => {
  return (
    <div className={s.container}>
      <Rating
        rating={rating}
        hideValue
        classNames={{ starsContainer: s.rating_stars }}
      />
      <div className={s.text}>{text}</div>
      <Link className={s.author_link} to={`/profile/${authorId}`}>
        {authorName}
      </Link>
    </div>
  );
};
