import { Firestore, Timestamp } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';
import { ConversationAggregate, UserAggregate } from '@twihika/prisma';
import { FirestoreDatabaseProvider } from '../firestore/firestore.providers';

@Injectable()
export class ConversationRepository {
  public static providerName = 'messagesRepository';
  constructor(
    @Inject(FirestoreDatabaseProvider)
    private db: Firestore,
  ) {}

  // https://stackoverflow.com/questions/62777674/how-to-create-sub-collections-using-firebase-transactions
  public async save(convAgg: ConversationAggregate) {
    const { conversation, messages } = convAgg.getData();
    const conversationRef = await this.db
      .collection('conversations')
      .doc(conversation.id);
    conversationRef.set({
      ...conversation,
      updatedAt: Timestamp.now(),
      createdAt: Timestamp.now(),
    });
    for (const message of messages) {
      await conversationRef
        .collection('messages')
        .doc(message.id)
        .set({
          ...message,
          updatedAt: Timestamp.now(),
          createdAt: Timestamp.now(),
        });
    }
  }
}
