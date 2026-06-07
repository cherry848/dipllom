import { Router } from "express";
import { coursesController } from "../controllers/courses.controller";
import { courseController } from "../controllers/course.controller";

const router = Router();

router.get("/courses", coursesController.getCourses);
router.get("/course/:id", coursesController.getCourse);
router.get("/modules", courseController.getModules);
router.get(
  "/course/:courseId/:userId/walkthrough",
  courseController.getCourseWalkthrough,
);
router.post(
  "/course/:courseId/:userId/:stepId/progress",
  courseController.completeLesson,
);

export default router;
