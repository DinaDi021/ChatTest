export interface IConversation {
  id?: string;
  participants: IParticipants;
  messages: string[];
  createdAt: number;
  updatedAt?: number;
}

export interface IParticipants {
  senderId: string;
  receiverId: string;
}
