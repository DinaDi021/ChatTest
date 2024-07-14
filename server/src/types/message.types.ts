import { admin } from "../configs/firebase";

export interface IMessage {
  id?: string;
  senderId: string;
  receiverId: string;
  message?: string;
  files?: string[];
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
}
