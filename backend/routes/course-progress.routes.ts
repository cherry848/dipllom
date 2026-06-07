import { Router } from "express";
import controller from "../controllers/courseProgress.controller";

const router = Router();

router.post("/course-progress/lesson/complete", controller.completeLesson);

router.post("/course-progress/test/submit", controller.submitTest);

export default router;
