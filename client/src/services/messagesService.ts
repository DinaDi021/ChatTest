import { urls } from "../constants";
import { IMessageData, IMessageResponse } from "../interfaces/messageInterface";
import { apiService, IRes } from "./apiServices";

const messagesService = {
  getMessagesById: (receiverId: string): IRes<IMessageResponse> =>
    apiService.get(urls.messages.byId(receiverId)),
  sendMessageById: (
    receiverId: string,
    formData: FormData,
  ): IRes<IMessageData> =>
    apiService.post(urls.messages.send(receiverId), formData),
  updateMessage: (
    conversationId: string,
    messageId: string,
    formData: FormData,
  ): IRes<IMessageData> =>
    apiService.patch(urls.messages.action(conversationId, messageId), formData),
  deleteMessage: (conversationId: string, messageId: string): IRes<void> =>
    apiService.delete(urls.messages.action(conversationId, messageId)),
};

export { messagesService };
