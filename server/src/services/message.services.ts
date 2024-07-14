import { UploadedFile } from "express-fileupload";

import { getReceiverSocketId, io } from "../app";
import { admin } from "../configs/firebase";
import { ApiError } from "../errors/api.error";
import { messageRepository } from "../repositories/message.repository";
import { IConversation } from "../types/conversation.types";
import { IMessage } from "../types/message.types";
import { EFileTypes, firebaseStorageService } from "./firebaseStorage.service";

class MessageService {
  public async sendMessage(
    senderId: string,
    receiverId: string,
    message?: string,
    files?: UploadedFile[] | UploadedFile,
  ): Promise<IMessage> {
    try {
      const conversationExists = await this.isConversationExist(
        senderId,
        receiverId,
      );

      let conversation: IConversation;

      if (conversationExists) {
        conversation = await messageRepository.findConversation(
          senderId,
          receiverId,
        );
      } else {
        conversation = await this.createNewConversation(senderId, receiverId);
      }

      const fileUrls = await this.createUrlFileForMessage(senderId, files);

      const newMessage: IMessage = {
        senderId,
        receiverId,
        createdAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now(),
      };

      if (message) {
        newMessage.message = message;
      }

      if (fileUrls.length > 0) {
        newMessage.files = fileUrls;
      }
      await messageRepository.addMessageToConversation(
        conversation.id,
        newMessage,
      );

      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      return newMessage;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getMessages(
    userToChatId: string,
    receiverId: string,
  ): Promise<IMessage[]> {
    try {
      const conversation = await messageRepository.findConversation(
        userToChatId,
        receiverId,
      );

      if (!conversation) {
        return [];
      }

      const messages = await messageRepository.findMessages(conversation.id);
      messages.sort((a, b) => a.createdAt.toMillis() - b.createdAt.toMillis());

      return messages;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async isConversationExist(
    senderId: string,
    receiverId: string,
  ): Promise<boolean> {
    const conversation = await messageRepository.findConversation(
      senderId,
      receiverId,
    );
    return !!conversation;
  }

  public async createNewConversation(
    senderId: string,
    receiverId: string,
  ): Promise<IConversation> {
    try {
      return await messageRepository.createConversation({
        participants: [senderId, receiverId],
        messages: [],
        createdAt: admin.firestore.Timestamp.now(),
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async createUrlFileForMessage(
    senderId: string,
    files?: UploadedFile[] | UploadedFile,
  ): Promise<string[]> {
    let fileUrls: string[] = [];
    if (!files) {
      return fileUrls;
    }
    const fileArray = Array.isArray(files) ? files : [files];
    fileUrls = await Promise.all(
      fileArray.map((file) =>
        firebaseStorageService.uploadFile(file, EFileTypes.Message, senderId),
      ),
    );

    return fileUrls;
  }
}

export const messageService = new MessageService();
