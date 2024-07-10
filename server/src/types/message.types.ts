import { admin } from "../configs/firebase";

export interface IMessage {
  id?: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
}
