export interface IMessage {
  id?: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  updatedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

export interface INewMessage {
  message: string;
}

export interface IMessageResponse {
  data: IMessage[];
}
