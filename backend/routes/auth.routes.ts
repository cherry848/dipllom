import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authCheckMiddleware } from "../middlewares/authCheck.middleware";
import { upload } from "../middlewares/upload.middleware";
import { userController } from "../controllers/user.controller";
import { coursesController } from "../controllers/courses.controller";
import { courseController } from "../controllers/course.controller";
import { reviewController } from "../controllers/review.controller";
const router = Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/authorize", authController.authorize);
router.post("/auth/refresh", authController.refresh);
router.patch(
  "/me/:id",
  authCheckMiddleware,
  upload.single("avatar"),
  userController.update,
);
router.post(
  "/me/:id/verify-password",
  authCheckMiddleware,
  userController.verifyPassword,
);

router.get(
  "/me/:id/courses",
  authCheckMiddleware,
  coursesController.getCoursesByUser,
);
// router.post("/me/:id/course", authCheckMiddleware, courseController.create);

// router.post(
//   "/me/:id/img",
//   authCheckMiddleware,
//   upload.single("avatar"),
//   courseController.uploadImage,
// );

// router.post("/me/:id/review", authCheckMiddleware, reviewController.save);

// router.get("/me/:id/reviews", authCheckMiddleware, reviewController.getAll);

router.post("/courses", courseController.getAll);

// пример роута с проверкой авторизации
router.get("/test", authCheckMiddleware, (req, res, next) => {
  try {
    return res.json("Авторизация есть");
  } catch (error) {
    next(error);
  }
});

export default router;
