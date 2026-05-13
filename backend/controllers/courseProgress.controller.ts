import { Request, Response } from "express";
import courseProgressService from "../services/courseProgress.service";

class CourseProgressController {
  async completeLesson(req: Request, res: Response) {
    try {
      const {
        userId,
        courseId,
        moduleId,
        stepId,
      } = req.body;

      const result =
        await courseProgressService.completeLesson(
          userId,
          courseId,
          moduleId,
          stepId,
        );

      res.json(result);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }

  async submitTest(req: Request, res: Response) {
    try {
      const {
        userId,
        courseId,
        moduleId,
        stepId,
        answers,
      } = req.body;

      const result =
        await courseProgressService.submitTest(
          userId,
          courseId,
          moduleId,
          stepId,
          answers,
        );

      res.json(result);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
}

export default new CourseProgressController();