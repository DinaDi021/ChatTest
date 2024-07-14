import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { messageService } from "../services/message.services";
import { ITokenPayload } from "../types/token.types";

class MessageController {
  public async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { messageText } = req.body;
      const files = req.files.files as UploadedFile[];
      const { id: receiverId } = req.params;
      const senderId = (req.res.locals.jwtPayload as ITokenPayload).userId;
      const newMessage = await messageService.sendMessage(
        senderId,
        receiverId,
        messageText,
        files,
      );
      res.status(201).json({ data: newMessage });
    } catch (e) {
      next(e);
    }
  }

  public async getMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userToChatId } = req.params;
      const senderId = (req.res.locals.jwtPayload as ITokenPayload).userId;
      const allMessages = await messageService.getMessages(
        userToChatId,
        senderId,
      );
      res.status(200).json({ data: allMessages });
    } catch (e) {
      next(e);
    }
  }

  public async updateMessage(req: Request, res: Response, next: NextFunction) {
    try {
      // res.status().json();
    } catch (e) {
      next(e);
    }
  }

  public async deleteMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { senderId, conversationId, receiverId, id } =
        req.res.locals.message;
      const { userId } = req.res.locals.jwtPayload;

      await messageService.deleteMessage(
        conversationId,
        id,
        receiverId,
        senderId,
        userId,
      );
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const messageController = new MessageController();
