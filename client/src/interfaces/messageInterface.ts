export interface IMessage {
  id?: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: number;
  updatedAt: number;
}

export interface INewMessage {
  message: string;
}

export interface IMessageResponse {
  data: IMessage[];
}
