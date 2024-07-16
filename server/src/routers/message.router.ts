import { Router } from "express";

import { messageController } from "../controllers/message.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { commonMiddleware } from "../middlewares/common.middleware";
import { emailMiddleware } from "../middlewares/email.middlwares";
import { fileMiddleware } from "../middlewares/files.middleware";
import { messageMiddleware } from "../middlewares/message.middleware";
import { MessageValidator } from "../validators/message.validator";

const router = Router();

router.get(
  "/:id",
  authMiddleware.checkAccessToken,
  messageController.getMessage,
);

router.post(
  "/send/:id",
  authMiddleware.checkAccessToken,
  emailMiddleware.isEmailVerify,
  fileMiddleware.isFileValid,
  commonMiddleware.isBodyValid(MessageValidator.create),
  messageController.sendMessage,
);

router.patch(
  "/:conversationId/:messageId",
  authMiddleware.checkAccessToken,
  messageMiddleware.getByIdOrThrow,
  fileMiddleware.isFileValid,
  commonMiddleware.isBodyValid(MessageValidator.create),
  messageController.updateMessage,
);

router.delete(
  "/:conversationId/:messageId",
  authMiddleware.checkAccessToken,
  messageMiddleware.getByIdOrThrow,
  messageController.deleteMessage,
);

export const messageRouter = router;
