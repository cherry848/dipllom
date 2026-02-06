import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authCheckMiddleware } from "../middlewares/authCheck.middleware";
import { upload } from "../middlewares/upload.middleware";
import { userController } from "../controllers/user.controller";
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

// пример роута с проверкой авторизации
router.get("/test", authCheckMiddleware, (req, res, next) => {
  try {
    return res.json("Авторизация есть");
  } catch (error) {
    next(error);
  }
});

export default router;
