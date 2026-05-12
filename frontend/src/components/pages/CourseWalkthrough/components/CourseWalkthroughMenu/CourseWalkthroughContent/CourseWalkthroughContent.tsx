import { Button } from "../../../../../shared/Button/Button";
import s from "./CourseWalkthroughContent.module.css";
import type { Question } from "./types/CourseWalkthroughContent.types";

type CourseWalkthroughContentProps = {
  title?: string;
  description?: string;
  questions?: Question[];
};

export const CourseWalkthroughContent = ({
  title,
  description,
  questions,
}: CourseWalkthroughContentProps) => {
  return (
    <div className={s.content}>
        <h1 className={s.title}>{title}</h1>
        {description && <p className={s.description}>{description}</p>}
        {questions && questions.map((el) => {
          return <div className={s.questions}>
            <h1>{el.question}</h1>
            {el.answers.map((answer) => {
              return <div>
                <span>Checkbox</span>
                <span>{answer.text}</span>
              </div>
            })}
            </div>
        })}
        <Button className={s.button}>Следующий урок</Button>
    </div>
  );
};
