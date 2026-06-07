import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { updateCourseModuleStepContentSlice } from "../../../../../redux/slices/updateCourseModuleStepContent.slice";
import {
  COURSE_MODULE_STEPS,
  type CourseModuleStep,
} from "../../../../../types/course.types";
import { Question } from "./components/Question/Question";
import s from "./TestContent.module.css";

type HandleQuestionChangeArgs = {
  questionId: string;
  question: string;
  isMultiple: boolean;
};

type HandleVariantChangeArgs = {
  questionId: string;
  variantId: string;
  text: string;
  correct: boolean;
};

type Props = {
  step: CourseModuleStep;
};

export const TestContent = ({ step }: Props) => {
  const dispatch = useAppDispatch();

  const handleAddQuestion = () => {
    dispatch(
      updateCourseModuleStepContentSlice.actions.addQuestion({
        stepId: step._id,
      })
    );
  };

  const handleAddVariant = (questionId: string) => {
    dispatch(
      updateCourseModuleStepContentSlice.actions.addVariant({
        stepId: step._id,
        questionId,
      })
    );
  };

  const handleDeleteVariant = (questionId: string, variantId: string) => {
    dispatch(
      updateCourseModuleStepContentSlice.actions.deleteVariant({
        stepId: step._id,
        questionId,
        variantId,
      })
    );
  };

  const handleQuestionDelete = (questionId: string) => {
    dispatch(
      updateCourseModuleStepContentSlice.actions.deleteQuestion({
        stepId: step._id,
        questionId,
      })
    );
  };

  const handleQuestionChange = ({
    questionId,
    question,
    isMultiple,
  }: HandleQuestionChangeArgs) => {
    dispatch(
      updateCourseModuleStepContentSlice.actions.setStepContentTest({
        stepId: step._id,
        questionId,
        question,
        isMultiple,
      })
    );
  };

  const handleVariantChange = ({
    questionId,
    variantId,
    text,
    correct,
  }: HandleVariantChangeArgs) => {
    dispatch(
      updateCourseModuleStepContentSlice.actions.setAnswer({
        questionId,
        answerId: variantId,
        correct,
        text,
      })
    );
  };

  return (
    <div className={s.container}>
      <div className={s.list}>
        {step.content[COURSE_MODULE_STEPS.Test]?.map((question, idx) => (
          <Question
            key={question._id}
            counter={idx + 1}
            question={question.question}
            variants={question.variants}
            isMultiple={question.multiple}
            onAddVariant={() => handleAddVariant(question._id)}
            onDeleteVariant={(variantId) =>
              handleDeleteVariant(question._id, variantId)
            }
            onDeleteQuestion={() => handleQuestionDelete(question._id)}
            onQuestionChange={(args) =>
              handleQuestionChange({ ...args, questionId: question._id })
            }
            onVariantChange={({ variantId, correct, variant }) =>
              handleVariantChange({
                questionId: question._id,
                variantId,
                text: variant,
                correct,
              })
            }
          />
        ))}
      </div>

      <div className={s.add_question} onClick={handleAddQuestion}>
        Добавить вопрос +
      </div>
    </div>
  );
};
