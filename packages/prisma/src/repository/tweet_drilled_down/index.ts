import { PrismaClient } from '@prisma/client';
import cuid from 'cuid';
import {z} from 'zod';

export const _TweetV2Model = z.object({
  id: z.string(),
  text: z.string(),
  author: z.object({
    username: z.string(),
    profile_image_url: z.string(),
    name: z.string(),
    verified: z.boolean(),
  }),
  media: z.array(z.object({})).optional(),
  polls: z.any().optional(),
  created_at: z.string(),
  public_metrics: z.object({}),
  referenced_tweets: z.null(),
  video: z.object({}).optional(),
});

// partialにしておかないと、createdAtとかupdatedAtが必須になってしまうのでentityの文脈で使うことができない
export type _TweetV2 = z.infer<typeof _TweetV2Model>;

export class TweetV2Entity {
  private tweetv2: _TweetV2;
  constructor(tweetv2: _TweetV2) {
    _TweetV2Model.parse({
      ...tweetv2,
    });
    // TODO: parseしたものを突っ込むとmediaとかobjectで定義したものの値が入らない
    this.tweetv2 = tweetv2
  }

  public getData(): _TweetV2 {
    return this.tweetv2;
  }
}

export class TweetDrilledDownAggregate {
  constructor(private readonly tweetV2: TweetV2Entity, private readonly senderId: string) {}
  public getData(): {tweetV2: _TweetV2, senderId: string} {
    return {
      tweetV2: this.tweetV2.getData(),
      senderId: this.senderId
    };
  }
}

export class TweetDrilledDownRepository {
  public static providerName = 'messagesRepository';
  constructor(private prisma: PrismaClient) {}

  public async save(tweetAgg: TweetDrilledDownAggregate) {
    const { tweetV2, senderId } = tweetAgg.getData();
    await this.prisma?.$transaction([
      this.prisma.firebaseUserTweetDrilledDown.create({
        data: {
          firebaseUserId: senderId,
          tweetId: tweetV2.id
        }
      }),
      this.prisma.outbox.create({
        data: {
          id: cuid(),
          payload: {...tweetV2, firebaseUserId: senderId},
          eventType: "TwitterDrilled",
          aggregateType: "TweetDrilledRequested",
          aggregateId: `${tweetV2.id}:${senderId}`
        }
      })
    ])
  }
}

