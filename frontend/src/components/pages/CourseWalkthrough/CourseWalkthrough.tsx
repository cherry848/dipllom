import { useState } from "react";
import {
  useGetModulesQuery,
  useLessonCompleteMutation,
} from "../../../redux/api";
import { Container } from "../../shared/Container/Container";
import { CourseWalkthroughContent } from "./components/CourseWalkthroughMenu/CourseWalkthroughContent/CourseWalkthroughContent";
import { CourseWalkthroughMenu } from "./components/CourseWalkthroughMenu/CourseWalkthroughMenu";
import s from "./CourseWalkthrough.module.css";
import { useAppSelector } from "../../../hooks/reduxHooks";

export const CourseWalkthrough = () => {
  const [checkedStep, setCheckedStep] = useState(0);
  const [passedSteps, setPassedSteps] = useState<Record<string, boolean>>({});
  const { data } = useGetModulesQuery();
  const [complete] = useLessonCompleteMutation();
  const {_id} = useAppSelector((state) => state.user);
  const userId = _id;
  const courseId = "69bb14d3fb495a8b3cb030a6";

  if (!data) return null;

  const toggleStep = (id: number) => {
    setCheckedStep(id);
    if (selectedStep?.type === "theory") {
      complete({userId, courseId, });
    }
  };

  const selectedStep = data
    .flatMap((module) => module.steps)
    .find((step) => +step.id === checkedStep);

  const passStep = () => {};

  return (
    <Container className={s.container}>
      <CourseWalkthroughMenu
        passedSteps={passedSteps}
        checkedStep={checkedStep}
        toggleStep={toggleStep}
        name="газ"
        modules={data}
      />
      <CourseWalkthroughContent
        questions={selectedStep?.questions}
        description={selectedStep?.content}
        title={selectedStep?.title}
      />
    </Container>
  );
};
