import { urls } from "../constants";
import {
  IMessageData,
  IMessageResponse,
  INewMessage,
} from "../interfaces/messageInterface";
import { apiService, IRes } from "./apiServices";

const messagesService = {
  getMessagesById: (receiverId: string): IRes<IMessageResponse> =>
    apiService.get(urls.messages.byId(receiverId)),
  sendMessageById: (
    receiverId: string,
    message: INewMessage,
  ): IRes<IMessageData> =>
    apiService.post(urls.messages.send(receiverId), message),
};

export { messagesService };
