import { urls } from "../constants";
import {
  IMessage,
  IMessageResponse,
  INewMessage,
} from "../interfaces/messageInterface";
import { apiService, IRes } from "./apiServices";

const messagesService = {
  getMessagesById: (receiverId: string): IRes<IMessageResponse> =>
    apiService.get(urls.messages.byId(receiverId)),
  sendMessageById: (receiverId: string, message: INewMessage): IRes<IMessage> =>
    apiService.post(urls.messages.send(receiverId), message),
};

export { messagesService };
