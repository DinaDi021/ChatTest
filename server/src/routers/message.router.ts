import { Router } from "express";

import { messageController } from "../controllers/message.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";
import { fileMiddleware } from "../middlewares/files.middleware";

const router = Router();

router.get(
  "/:id",
  authMiddleware.checkAccessToken,
  messageController.getMessage,
);
router.post(
  "/send/:id",
  authMiddleware.checkAccessToken,
  fileMiddleware.isFileValid,
  messageController.sendMessage,
);

export const messageRouter = router;
