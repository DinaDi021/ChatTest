import { IMessage } from "./messageInterface";

export interface IConversation {
  id?: string;
  participants: IParticipants;
  messages: IMessage[];
  createdAt: number;
  updatedAt?: number;
}

export interface IParticipants {
  senderId: string;
  receiverId: string;
}
