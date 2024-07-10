import { Router } from "express";

import { messageController } from "../controllers/message.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";

const router = Router();

router.get(
  "/:id",
  authMiddleware.checkAccessToken,
  messageController.getMessage,
);
router.post(
  "/send/:id",
  authMiddleware.checkAccessToken,
  messageController.sendMessage,
);

export const messageRouter = router;
