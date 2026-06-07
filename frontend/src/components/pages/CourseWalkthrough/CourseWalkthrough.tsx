import { useAppSelector } from "../../../hooks/reduxHooks";
import {
  useCompleteLessonMutation,
  useGetCourseWalkthroughQuery,
} from "../../../redux/api";
import type { CourseWalkthroughStep } from "../../../types/course.types";
import { Container } from "../../shared/Container/Container";
import { CourseWalkthroughContent } from "./components/CourseWalkthroughMenu/CourseWalkthroughContent/CourseWalkthroughContent";
import { CourseWalkthroughMenu } from "./components/CourseWalkthroughMenu/CourseWalkthroughMenu";
import s from "./CourseWalkthrough.module.css";
import { useParams, useSearchParams } from "react-router";

// export type CompleteLessonReq = {
//   userId: string;
//   courseId: string;
//   stepId: string;
// };

export const CourseWalkthrough = () => {
  const { _id } = useAppSelector((state) => state.user);
  console.log(_id);
  const [searchParams, setSearchParams] = useSearchParams({ step: "" });
  const { id = "" } = useParams();
  const { data, isLoading } = useGetCourseWalkthroughQuery({
    courseId: id,
    userId: _id,
  });
  const [dispatch] = useCompleteLessonMutation();

  if (isLoading) return "Загрузка";
  if (!data) return "Ошибка";

  const progressByStep = data.progress.progressByStepId;
  console.log(data);
  console.log(progressByStep);

  const currentStep =
    Object.fromEntries(searchParams.entries()).step ||
    data.course.modules[0].steps[0].stepId;

  const stepData = (() => {
    let result: CourseWalkthroughStep | undefined;
    data.course.modules.forEach((module) =>
      module.steps.forEach((step) => {
        if (step.stepId === currentStep) {
          result = step;
        }
      }),
    );
    return result;
  })();

  const toggleStep = (step: string) => {
    const currentStep = data.course.modules
      .flatMap((m) => m.steps)
      .find((s) => s.stepId === step);
    if (!currentStep) return null;

    setSearchParams({ step });

    if (currentStep?.type === "theory") {
      dispatch({
        stepId: currentStep?.stepId,
        userId: _id,
        courseId: id,
      });
    }
  };

  if (!stepData) return "Ошибка";

  return (
    <Container className={s.container}>
      <CourseWalkthroughMenu
        currentStep={currentStep}
        toggleStep={toggleStep}
        modules={data.course.modules}
        name={data.course.title}
        progressByStep={progressByStep}
      />
      <CourseWalkthroughContent
        theoryContent={stepData.theoryContent}
        testContent={stepData.testContent}
        type={stepData.type}
        title={stepData.title}
      />
    </Container>
  );
};
