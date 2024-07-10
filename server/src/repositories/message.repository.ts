import { db } from "../configs/firebase";
import { IConversation } from "../types/conversation.types";
import { IMessage } from "../types/message.types";

class MessageRepository {
  public async findConversation(
    senderId: string,
    receiverId: string,
  ): Promise<IConversation | null> {
    const conversationsRef = db.collection("conversations");

    const querySnapshot1 = await conversationsRef
      .where("participants", "array-contains", senderId)
      .get();
    let conversation = null;
    querySnapshot1.forEach((doc) => {
      const participants = doc.data().participants;
      if (participants.includes(receiverId)) {
        conversation = doc.data();
      }
    });
    return conversation;
  }

  public async createConversation(dto: IConversation): Promise<IConversation> {
    const docRef = await db.collection("conversations").add(dto);
    dto.id = docRef.id;
    await docRef.update({ id: docRef.id });
    return dto;
  }

  public async addMessageToConversation(
    conversationId: string,
    message: IMessage,
  ): Promise<void> {
    const messagesRef = db
      .collection("conversations")
      .doc(conversationId)
      .collection("messages");
    const messageId = messagesRef.doc().id;
    await messagesRef.doc(messageId).set({
      ...message,
      id: messageId,
    });
  }

  public async findMessages(conversationId: string): Promise<IMessage[]> {
    const messagesRef = db
      .collection("conversations")
      .doc(conversationId)
      .collection("messages");
    const messagesSnapshot = await messagesRef.get();
    const messages: IMessage[] = messagesSnapshot.docs.map(
      (doc) => doc.data() as IMessage,
    );
    return messages;
  }
}

export const messageRepository = new MessageRepository();
