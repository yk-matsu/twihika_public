import {
  Injectable,
  Inject,
  Logger,
} from '@nestjs/common';
import {
  Firestore,
} from '@google-cloud/firestore';
import { FirestoreDatabaseProvider } from 'src/firestore/firestore.providers';
import {
  ConversationAggregate,
  ConversationEntity,
  MessageEntity,
  _Conversation,
  _Message,
} from '@twihika/prisma';
import * as cuid from 'cuid';
import { ConversationRepository } from './conversatoin.repository';

export class CreateConversationDto {
  conversation: _Conversation;
  messages: _Message[];
}

@Injectable()
export class RawReadingsService {
  private logger: Logger = new Logger(RawReadingsService.name);

  constructor(
    @Inject(FirestoreDatabaseProvider)
    private db: Firestore,
    private readonly repository: ConversationRepository,
  ) {}

  async save(dto: CreateConversationDto): Promise<any> {
    const conversation = new ConversationEntity({
      ...ConversationEntity.createEmpty().getData(),
      ...dto.conversation,
    });
    const messages = dto.messages.map(item => (
      new MessageEntity({
        ...{id: cuid()},
        type: "text",
        sender: "8bzokdlHA9YnLCBW7SbiOosW08k1",
        content: "test message",
      })
    ))
    const aggs = new ConversationAggregate(conversation, messages)
    await this.repository.save(aggs)

  }

  async findById({ conversationId }): Promise<any> {
    const collection = await this.db.collection(
      `conversations/${conversationId}/messages`,
    );

    const messages = (await collection.get()).docs.map((item) => {
      return MessageEntity.fromDoc({ id: item.id, ...item.data() });
    });
    const item = await collection.parent!.get();
    const conversation = ConversationEntity.fromDoc({
      id: item.id,
      ...item.data()!,
    });
    const aggs = new ConversationAggregate(conversation, messages);

    return aggs.getData();
  }
}
