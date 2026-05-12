import { useState } from "react";
import { useGetModulesQuery } from "../../../redux/api";
import { Container } from "../../shared/Container/Container";
import { CourseWalkthroughContent } from "./components/CourseWalkthroughMenu/CourseWalkthroughContent/CourseWalkthroughContent";
import { CourseWalkthroughMenu } from "./components/CourseWalkthroughMenu/CourseWalkthroughMenu";
import s from "./CourseWalkthrough.module.css";

export const CourseWalkthrough = () => {
  const [checkedStep, setCheckedStep] = useState(0);
  const [passedSteps, setPassedSteps] = useState<Record<string, boolean>>({});
  const { data } = useGetModulesQuery();

  if (!data) return null;

  const toggleStep = (id: number) => {
    setCheckedStep(id);
  };

  const selectedStep = data
    .flatMap((module) => module.steps)
    .find((step) => +step.id === checkedStep);

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
