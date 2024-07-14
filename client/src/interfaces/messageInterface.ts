export interface IMessage {
  id?: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  messageText?: string;
  files?: string[];
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  updatedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

export interface IMessageData {
  data: IMessage;
}

export interface INewMessage {
  messageText?: string;
  files?: FileList | File[];
}

export interface IMessageResponse {
  data: IMessage[];
}
