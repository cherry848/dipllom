import { Router } from "express";
import { coursesController } from "../controllers/courses.controller";

const router = Router();

router.get("/courses", coursesController.getCourses);

export default router;
