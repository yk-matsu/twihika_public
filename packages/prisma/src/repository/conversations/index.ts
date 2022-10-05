import {z} from 'zod';
import dayjs from 'dayjs';
import cuid from 'cuid';

/** ユーザー情報スキーマ */
const _ConversationModel = z.object({
  /** ユーザー名 */
  id: z.string(),
  group: z
    .object({
      admins: z.array(z.string()).optional(),
      groupImage: z.string().optional().nullable(),
      groupName: z.string().optional().nullable(),
    })
    .optional(),
  seen: z.object({}),
  theme: z.string(),
  users: z.array(z.string()),
  updatedAt: z
    .object({_seconds: z.number(), _nanoseconds: z.number()})
    .transform(val =>
      dayjs(new Date(val._seconds * 1000 + val._nanoseconds / 1000000))
    )
    .optional(),
});
const _MessageModel = z.object({
  id: z.string(),
  /** ユーザー名 */
  content: z.string(),
  createdAt: z
    .object({_seconds: z.number(), _nanoseconds: z.number()})
    .transform(val =>
      dayjs(new Date(val._seconds * 1000 + val._nanoseconds / 1000000))
    )
    .optional(),
  replyTo: z.string().nullable().optional(),
  sender: z.string(),
  type: z.string(),
  file: z
    .object({
      name: z.string(),
      size: z.number(),
    })
    .optional()
    .nullable(),
  reactions: z.union([z.object({}), z.array(z.any())]).optional(),
});

// partialにしておかないと、createdAtとかupdatedAtが必須になってしまうのでentityの文脈で使うことができない
export type _Conversation = z.infer<typeof _ConversationModel>;
export type _Message = z.infer<typeof _MessageModel>;

export class ConversationEntity {
  private conversation: _Conversation;
  constructor(conversation: _Conversation) {
    this.conversation = _ConversationModel.parse({
      ...conversation,
    });
  }

  public static createEmpty(): ConversationEntity {
    return new this({id: cuid(), seen: {}, theme: '#0D90F3', users: []});
  }

  public static fromDoc(record: any) {
    const conversation = _ConversationModel.parse({
      ...record,
    });
    return new this(conversation);
  }
  public getData(): _Conversation {
    return this.conversation;
  }
}

export class MessageEntity {
  private message: _Message;

  public constructor(message: _Message) {
    this.message = message;
  }
  public static fromDoc(doc: any) {
    const message = _MessageModel.parse({...doc});
    return new this(message);
  }
  public getData(): _Message {
    return this.message;
  }
}

export class ConversationAggregate {
  constructor(
    private readonly conversation: ConversationEntity,
    private readonly messages: MessageEntity[]
  ) {}
  public getData(): {messages: _Message[]; conversation: _Conversation} {
    return {
      messages: this.messages.map(item => item.getData()),
      conversation: this.conversation.getData(),
    };
  }
}
