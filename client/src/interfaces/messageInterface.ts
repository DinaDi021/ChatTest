export interface IMessage {
  id?: string;
  senderId: string;
  receiverId: string;
  message?: string;
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
  message?: string;
  files?: FileList | File[];
}

export interface IMessageResponse {
  data: IMessage[];
}
