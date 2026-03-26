import { IconStar } from "./Icons";
import s from "./Rating.module.css";
import cn from "classnames";

type ClassNames = Partial<{
  container: string;
  value: string;
  starsContainer: string;
}>;

type RatingProps = {
  rating: number;
  classNames?: ClassNames;
  hideValue?: boolean;
};

export const Rating = ({ rating, hideValue, classNames }: RatingProps) => {
  return (
    <div className={cn(s.container, classNames?.container)}>
      {!hideValue && (
        <span className={cn(s.value, classNames?.value)}>{rating}</span>
      )}

      <div className={cn(s.stars, classNames?.starsContainer)}>
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
  );
};
