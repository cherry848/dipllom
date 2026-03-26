import { Router } from "express";
import { coursesController } from "../controllers/courses.controller";

const router = Router();

router.get("/courses", coursesController.getCourses);
router.get("/course/:id", coursesController.getCourse);

export default router;
