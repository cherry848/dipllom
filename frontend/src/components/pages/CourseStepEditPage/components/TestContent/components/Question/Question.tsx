import { useState } from "react";

import s from "./Question.module.css";
import { Input } from "../../../../../../shared/Input/Input";
import cn from "classnames";
import { useAppSelector } from "../../../../../../../hooks/reduxHooks";

type OnQuestionChangeArgs = {
  question: string;
  isMultiple: boolean;
};

type OnVariantChangeArgs = {
  variantId: string;
  variant: string;
  correct: boolean;
};

type Props = {
  counter: number;
  question: string;
  isMultiple?: boolean;
  variants: string[];
  onQuestionChange: (args: OnQuestionChangeArgs) => void;
  onVariantChange: (args: OnVariantChangeArgs) => void;
  onAddVariant: () => void;
  onDeleteVariant: (variantId: string) => void;
  onDeleteQuestion: () => void;
};

type SelectOptionType = (typeof SELECT_OPTIONS)[keyof typeof SELECT_OPTIONS];

type SelectData = {
  show: boolean;
};

const SELECT_OPTIONS = {
  SINGLE: "single",
  MULTIPLE: "multiple",
} as const;

const SELECT_LABEL: Record<SelectOptionType, string> = {
  [SELECT_OPTIONS.SINGLE]: "Один из списка",
  [SELECT_OPTIONS.MULTIPLE]: "Несколько из списка",
};

export const Question = ({
  question,
  variants,
  isMultiple,
  counter,
  onQuestionChange,
  onAddVariant,
  onDeleteVariant,
  onVariantChange,
  onDeleteQuestion,
}: Props) => {
  const [selectData, setSelectData] = useState<SelectData>({
    show: false,
  });

  const { answerById } = useAppSelector(
    (state) => state.updateCourseModuleStep
  );

  const answers = variants
    .map((id) => answerById[id])
    .filter((answer) => answer !== undefined);

  const selectedValue = isMultiple
    ? SELECT_OPTIONS.MULTIPLE
    : SELECT_OPTIONS.SINGLE;

  const dropdownList = Object.values(SELECT_OPTIONS).filter(
    (value) => value !== selectedValue
  );

  const handleSelectValueChange = (value: SelectOptionType) => {
    setSelectData({ show: false });
    onQuestionChange({
      isMultiple: value === SELECT_OPTIONS.MULTIPLE,
      question,
    });
  };

  const handleChangeCorrectIds = (variantId: string) => {
    const answer = answers.find((answer) => answer._id === variantId);

    onVariantChange({
      variantId,
      variant: answer?.answer ?? "",
      correct: !answer?.correct,
    });
  };

  return (
    <div className={s.container}>
      <div className={s.top}>
        <div className={s.question}>
          <div className={s.counter}>{counter + "."}</div>
          <Input
            value={question}
            classNames={{ inputWrapper: s.inputWrapper }}
            placeholder="Вопрос"
            onChange={(question) =>
              onQuestionChange({
                question,
                isMultiple: selectedValue === SELECT_OPTIONS.MULTIPLE,
              })
            }
          />
        </div>

        <div className={cn(s.select, selectData.show && s.show)}>
          <div
            className={s.select_content}
            onClick={() => setSelectData({ show: !selectData.show })}
          >
            <span>{SELECT_LABEL[selectedValue]}</span>
            <img src="/expand-arrow.svg" />
          </div>

          <div className={s.select_dropdown}>
            {dropdownList.map((value) => (
              <div
                key={value}
                className={s.select_dropdown__value}
                onClick={() => handleSelectValueChange(value)}
              >
                {SELECT_LABEL[value]}
              </div>
            ))}
          </div>
        </div>

        <img
          className={s.delete}
          src="/close-button.svg"
          onClick={onDeleteQuestion}
        />
      </div>

      <div className={s.variants}>
        {answers.map((answer) => (
          <div key={answer?._id} className={s.variant}>
            <div
              className={cn(s.box, answer?.correct && s.selected)}
              onClick={() => {
                if (answer) handleChangeCorrectIds(answer._id);
              }}
            />
            <Input
              value={answer?.answer ?? ""}
              classNames={{
                container: s.input_container,
                inputWrapper: s.input_wrapper,
              }}
              placeholder="Вариант"
              onChange={(value) => {
                if (answer)
                  onVariantChange({
                    variantId: answer._id,
                    variant: value,
                    correct: answer.correct,
                  });
              }}
            />
            <img
              className={s.delete}
              src="/close-button.svg"
              onClick={() => {
                if (answer) onDeleteVariant(answer._id);
              }}
            />
          </div>
        ))}
      </div>

      <div className={s.add_variant} onClick={onAddVariant}>
        Добавить вариант +
      </div>
    </div>
  );
};
