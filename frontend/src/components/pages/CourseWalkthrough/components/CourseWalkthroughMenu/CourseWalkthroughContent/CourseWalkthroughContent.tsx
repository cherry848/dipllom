import c from "classnames";
import { Button } from "../../../../../shared/Button/Button";
import { Checkbox } from "../../../../../shared/Checkbox/Checkbox";
import s from "./CourseWalkthroughContent.module.css";
import type { CourseWalkthroughTestQuestion } from "../../../../../../types/course.types";
import { useState } from "react";

type CourseWalkthroughContentProps = {
  title: string;
  theoryContent?: string;
  testContent?: CourseWalkthroughTestQuestion[];
  type: "theory" | "test";
};

export const CourseWalkthroughContent = ({
  title,
  theoryContent,
  testContent,
  type,
}: CourseWalkthroughContentProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const selectAnswer = (answerId: string) => {
    setSelectedAnswers((prev) => {
      if (prev.includes(answerId)) {
        const answers = prev.filter((id) => id !== answerId);
        return [...answers];
      }
      return [...prev, answerId];
    });
  };
  const findAnswer = (asnwerId: string) => {
    return selectedAnswers.includes(asnwerId);
  };

  console.log(selectedAnswers);
  return (
    <div className={s.content}>
      <h1 className={s.title}>{title}</h1>
      {type === "theory" && theoryContent && (
        <p className={s.description}>{theoryContent}</p>
      )}
      {type === "test" &&
        testContent &&
        testContent.map((el) => {
          return (
            <div className={s.questions}>
              <h1 className={s.questionsTitle}>{el.questionTitle}</h1>
              {el.answers.map((answer) => {
                return (
                  <div className={s.answersGroup}>
                    <Checkbox
                      checked={findAnswer(answer.answerId)}
                      onChange={() => {
                        selectAnswer(answer.answerId);
                      }}
                    />
                    <span className={s.text}>{answer.title}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      {testContent ? (
        <Button className={s.button}>Проверить</Button>
      ) : (
        <Button className={c(s.button, s.check)}>Следующий урок</Button>
      )}
    </div>
  );
};
