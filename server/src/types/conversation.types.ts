import { admin } from "../configs/firebase";

export interface IConversation {
  id?: string;
  participants: string[];
  messages: string[];
  createdAt: admin.firestore.Timestamp;
  updatedAt?: admin.firestore.Timestamp;
}
