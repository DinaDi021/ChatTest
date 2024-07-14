import { admin } from "../configs/firebase";
import { IMessage } from "./message.types";

export interface IConversation {
  id?: string;
  participants: string[];
  messages: IMessage[];
  createdAt: admin.firestore.Timestamp;
  updatedAt?: admin.firestore.Timestamp;
}
