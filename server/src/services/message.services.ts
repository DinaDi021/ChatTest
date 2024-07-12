import { getReceiverSocketId, io } from "../app";
import { admin } from "../configs/firebase";
import { ApiError } from "../errors/api.error";
import { messageRepository } from "../repositories/message.repository";
import { IConversation } from "../types/conversation.types";
import { IMessage } from "../types/message.types";

class MessageService {
  public async sendMessage(
    senderId: string,
    receiverId: string,
    message: string,
  ): Promise<IMessage> {
    try {
      let conversation = await messageRepository.findConversation(
        senderId,
        receiverId,
      );
      if (!conversation) {
        const conversationData: IConversation = {
          participants: [senderId, receiverId],
          messages: [],
          createdAt: admin.firestore.Timestamp.now(),
        };

        conversation =
          await messageRepository.createConversation(conversationData);
      }

      const newMessage: IMessage = {
        senderId,
        receiverId,
        message,
        createdAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now(),
      };

      const conversationId = conversation.id;
      await messageRepository.addMessageToConversation(
        conversationId,
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
}

export const messageService = new MessageService();
