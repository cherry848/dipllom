import c from "classnames";
import { Button } from "../../../../../shared/Button/Button";
import { Checkbox } from "../../../../../shared/Checkbox/Checkbox";
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
      {questions &&
        questions.map((el) => {
          return (
            <div className={s.questions}>
              <h1 className={s.questionsTitle}>{el.question}</h1>
              {el.answers.map((answer) => {
                return (
                  <div className={s.answersGroup}>
                    <Checkbox />
                    <span className={s.text}>{answer.text}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      {description ? (
        <Button className={s.button}>Следующий урок</Button>
      ) : (
        <Button className={c(s.button, s.check)}>Проверить</Button>
      )}
    </div>
  );
};
