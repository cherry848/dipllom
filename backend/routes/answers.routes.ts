import { Router } from "express";
import { answerController } from "../controllers/answer.controller";

const router = Router();

router.get("/course/:courseId/answers", answerController.getCourseAnswers);

router.post("/answer/create-or-update", answerController.createOrUpdateAnswer);

router.delete("/answer/:answerId", answerController.deleteAnswer);

export default router;
