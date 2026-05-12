import { Container } from "../../shared/Container/Container";
import { CourseWalkthroughContent } from "./components/CourseWalkthroughMenu/CourseWalkthroughContent/CourseWalkthroughContent";
import { CourseWalkthroughMenu } from "./components/CourseWalkthroughMenu/CourseWalkthroughMenu";
import s from "./CourseWalkthrough.module.css";

export const CourseWalkthrough = () => {
  return (
    <Container>
      <CourseWalkthroughMenu />
      <CourseWalkthroughContent />
    </Container>
  );
};
