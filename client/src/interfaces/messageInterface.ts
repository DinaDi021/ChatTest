export interface IMessage {
  id?: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: number;
  updatedAt: number;
}
