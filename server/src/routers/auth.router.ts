import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.registerUser),
  userMiddleware.isEmailUniq,
  authController.register,
);
router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  authController.login,
);

router.get("/me", authMiddleware.checkAccessToken, authController.getMe);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

router.post("/logout", authMiddleware.checkAccessToken, authController.logout);

router.put("/activate/:actionToken", authController.activate);

router.post(
  "/forgot",
  commonMiddleware.isBodyValid(UserValidator.forgotPassword),
  authController.forgotPassword,
);

router.put(
  "/forgot/:actionToken",
  commonMiddleware.isBodyValid(UserValidator.setForgotPassword),
  authController.setForgotPassword,
);

router.post(
  "/change",
  commonMiddleware.isBodyValid(UserValidator.changePassword),
  authMiddleware.checkAccessToken,
  authController.changePassword,
);

export const authRouter = router;
