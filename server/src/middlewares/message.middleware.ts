import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { messageRepository } from "../repositories/message.repository";

class MessageMiddleware {
  public async getByIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { conversationId, messageId } = req.params;

      const message = await messageRepository.getMessageById(
        conversationId,
        messageId,
      );

      if (!message) {
        throw new ApiError("Message not found", 404);
      }
      req.res.locals.message = message;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const messageMiddleware = new MessageMiddleware();
