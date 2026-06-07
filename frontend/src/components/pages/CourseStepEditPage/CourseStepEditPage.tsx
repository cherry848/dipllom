import { Link, useParams } from "react-router";
import s from "./CourseStepEdit.module.css";
import {
  useCreateOrUpdateAnswerMutation,
  useCreateOrUpdateCourseModuleStepMutation,
  useGetCourseByIdQuery,
} from "../../../redux/api";
import { Container } from "../../shared/Container/Container";
import {
  COURSE_MODULE_STEP_TYPE_LABELS,
  COURSE_MODULE_STEPS,
  type CreateOrUpdateStepContent,
} from "../../../types/course.types";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { TheoryContent } from "./components/TheoryContent/TheoryContent";
import { TestContent } from "./components/TestContent/TestContent";
import { Button } from "../../shared/Button/Button";
import type { TestAnswer } from "../../../types/testAnswer.types";

export const CourseStepEditPage = () => {
  const [createOrUpdateStep] = useCreateOrUpdateCourseModuleStepMutation();
  const [createOrUpdateAnswer] = useCreateOrUpdateAnswerMutation();

  const { courseId, moduleId, stepId } = useParams();

  const { stepById, answerById } = useAppSelector(
    (state) => state.updateCourseModuleStep
  );

  const stepData = stepById[stepId ?? ""];

  const { isError, isLoading } = useGetCourseByIdQuery({
    courseId: courseId ?? "",
    fetchAnswers: true,
  });

  if (isLoading) return "Загрузка";

  if (isError || !stepData) return "Ошибка";

  const handleSave = async () => {
    const answerByOldId: Partial<Record<string, TestAnswer>> = {};

    for (const question of stepData.content[COURSE_MODULE_STEPS.Test]) {
      for (const id of question.variants) {
        const variantData = answerById[id];

        if (variantData) {
          const result = await createOrUpdateAnswer({
            answer: {
              questionId: question._id,
              answer: variantData.answer,
              correct: variantData.correct,
              answerId: variantData._id.startsWith("temp")
                ? undefined
                : variantData._id,
            },
          }).unwrap();

          answerByOldId[variantData._id] = result.answer;
        }
      }
    }

    const testWithAnswers: CreateOrUpdateStepContent[typeof COURSE_MODULE_STEPS.Test] =
      stepData.content[COURSE_MODULE_STEPS.Test]?.map((question) => {
        const variants = question.variants
          .map((id) => answerByOldId[id]?._id ?? id)
          .filter((v): v is string => !!v);

        return {
          question: question.question,
          multiple: question.multiple,
          variants,
        };
      }) ?? [];

    await createOrUpdateStep({
      courseId: courseId ?? "",
      moduleId: moduleId ?? "",
      stepId: stepId ?? "",
      stepName: stepData.stepName,
      stepType: stepData.stepType,
      content: {
        theory: stepData.content?.[COURSE_MODULE_STEPS.Theory],
        test: testWithAnswers,
      },
    }).unwrap();
  };

  return (
    <Container className={s.container}>
      <div className={s.header}>
        <Link to={`/course/${courseId}/modules`} className={s.back}>
          <img src="/left--pointer.svg" />
          <span>Назад</span>
        </Link>

        <div className={s.type}>
          {COURSE_MODULE_STEP_TYPE_LABELS[stepData.stepType]}
        </div>
      </div>

      {stepData.stepType === COURSE_MODULE_STEPS.Theory ? (
        <TheoryContent stepData={stepData} />
      ) : (
        <TestContent step={stepData} />
      )}

      <Button className={s.btn} onClick={handleSave}>
        Сохранить
      </Button>
    </Container>
  );
};
