import { Router } from "express";
import { coursesController } from "../controllers/courses.controller";
import { courseController } from "../controllers/course.controller";
import { upload } from "../middlewares/upload.middleware";
import { authCheckMiddleware } from "../middlewares/authCheck.middleware";

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

router.patch("/course/:id", courseController.updateCourse);

router.post("/course", authCheckMiddleware, courseController.create);

router.post(
  "/course/:id/upload-image",
  authCheckMiddleware,
  upload.single("image"),
  courseController.uploadImage,
);

router.post(
  "/course/:id/module",
  authCheckMiddleware,
  courseController.createOrUpdateModule,
);

router.delete(
  "/course/:courseId/module/:moduleId",
  authCheckMiddleware,
  courseController.deleteModule,
);

router.post(
  "/course/:courseId/module/:moduleId/step/create-or-update",
  authCheckMiddleware,
  courseController.createOrUpdateModuleStep,
);

router.delete(
  "/course/:courseId/module/:moduleId/step/:stepId",
  authCheckMiddleware,
  courseController.deleteModuleStep,
);

export default router;
