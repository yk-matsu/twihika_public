import { EmittedMessage } from '@algoan/pubsub';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  ConversationAggregate,
  ConversationEntity,
  MessageEntity,
  ProviderEntity,
  UserAggregate,
  UserEntity,
} from '@twihika/prisma';
import {
  DeleteFromTweetsService,
  createElasticClinet,
} from '@twihika/elasticsearch';
import { UserRecord } from '@twihika/auth';
import { UserRepository } from './user.repository';
import { FirebaseClient } from './client.firebase';
import { pubsub } from './client.pubsub';
import { ConversationRepository } from './conversations/conversatoin.repository';
import * as cuid from 'cuid';

@Controller()
export class UserHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly conversationRepository: ConversationRepository,
    private readonly firebaseApp: FirebaseClient,
  ) {}

  @EventPattern(
    process.env.DEVELOPMENT_MODE + '.' + 'twihika.application.user.signup',
  )
  public async handleSinUp(
    @Payload() data: EmittedMessage<UserRecord>,
  ): Promise<void> {
    console.log(data);
    const userRecord = data.payload as UserRecord;
    const firebaseRaw = userRecord.tenantId
      ? await this.firebaseApp
          .getAuth()
          .tenantManager()
          .authForTenant(userRecord.tenantId)
          .getUser(userRecord.uid)
      : await this.firebaseApp.getAuth().getUser(userRecord.uid);

    const user = new UserAggregate(UserEntity.fromFirebase(firebaseRaw), [
      ProviderEntity.fromFirebase(firebaseRaw.providerData[0], firebaseRaw.uid),
    ]);
    this.userRepository.save(user);

    pubsub.publish('userSignUp', {
      userSignUp: {
        id: userRecord.uid,
      },
    });

    return;
  }

  @EventPattern(
    process.env.DEVELOPMENT_MODE + '.' + 'twihika.application.user.delete',
  )
  public async handleDelete(
    @Payload() data: EmittedMessage<UserRecord>,
  ): Promise<void> {
    console.log(data);
    const userRecord = data.payload as UserRecord;

    this.userRepository.delete(userRecord.uid);

    pubsub.publish('userDelete', {
      userDelete: { id: userRecord.uid },
    });

    return;
  }

  @EventPattern(process.env.DEVELOPMENT_MODE + '.' + 'twihika.prisma.Outbox')
  public async handleOutbox(
    @Payload() data: EmittedMessage<any>,
  ): Promise<void> {
    console.log(data.payload);
    const outboxPayload = JSON.parse(data.payload.payload.after.payload);

    if (data.payload.payload.after.aggregateType == 'TweetDrilledRequested') {
      const conversation = new ConversationEntity({
        ...ConversationEntity.createEmpty().getData(),
        ...{ id: data.payload.payload.after.aggregateId },
        ...{ users: [outboxPayload.firebaseUserId] },
      });
      const messages = new MessageEntity({
        ...{ id: outboxPayload.id },
        type: 'tweet',
        sender: outboxPayload.firebaseUserId,
        content: JSON.stringify(outboxPayload),
      });
      const agg = new ConversationAggregate(conversation, [messages]);
      await this.conversationRepository.save(agg);
    } else if (data.payload.payload.after.eventType == 'TweetDeleted') {
      // TODO: ここでs3などの削除処理
    }
    return;
  }

  @EventPattern(
    'https://sqs.ap-northeast-1.amazonaws.com/649194519350/evebus-twihi-1-notification-queue.fifo',
  )
  public async handleMessage(message: any): Promise<any> {
    return '';
  }
}
