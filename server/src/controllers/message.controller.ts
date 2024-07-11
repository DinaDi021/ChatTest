import { NextFunction, Request, Response } from "express";

import { messageService } from "../services/message.services";
import { ITokenPayload } from "../types/token.types";

class MessageController {
  public async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { message } = req.body;
      console.log(message);
      const { id: receiverId } = req.params;
      const senderId = (req.res.locals.jwtPayload as ITokenPayload).userId;
      const newMessage = await messageService.sendMessage(
        senderId,
        receiverId,
        message,
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
}

export const messageController = new MessageController();
