import s from "./Tags.module.css";
import cn from "classnames";

type TagsProps = {
  tags: string[] | undefined;
  className?: string;
};

export const Tags = ({ tags, className }: TagsProps) => {
  return (
    <div className={cn(s.container, className)}>
      {tags?.map((tag, idx) => {
        const isLast = idx === tags.length - 1;

        return (
          <div className={s.tag} key={idx}>
            #{tag}
            {!isLast && ","}
          </div>
        );
      })}
    </div>
  );
};
