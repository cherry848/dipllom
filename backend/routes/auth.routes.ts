import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authCheckMiddleware } from "../middlewares/authCheck.middleware";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/authorize", authController.authorize);
router.post("/refresh", authController.refresh);

// пример роута с проверкой авторизации
router.get("/test", authCheckMiddleware, (req, res, next) => {
  try {
    return res.json("Авторизация есть");
  } catch (error) {
    next(error);
  }
});

export default router;
