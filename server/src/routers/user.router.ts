import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { commonMiddleware } from "../middlewares/common.middleware";
import { fileMiddleware } from "../middlewares/files.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, userController.getAll);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  userMiddleware.getByIdOrThrow,
  userController.getById,
);

router.patch(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  userController.updateUser,
);

router.delete(
  "/:userId",
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid("userId"),
  userController.deleteUser,
);

router.post(
  "/:userId/avatar",
  authMiddleware.checkAccessToken,
  fileMiddleware.isAvatarValid,
  userController.uploadAvatar,
);

router.delete(
  "/:userId/avatar",
  authMiddleware.checkAccessToken,
  fileMiddleware.isAvatarExist,
  userController.deleteAvatar,
);

export const userRouter = router;
