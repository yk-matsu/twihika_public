import type {NextApiRequest, NextApiResponse} from 'next';
import {csrf} from '@twihika/share';
import {prisma} from '@twihika/prisma';
import {
  DeleteFromTweetsService,
  createElasticClinet,
  SearchFromGroupingTweets,
} from '@twihika/elasticsearch';
import * as z from 'zod';
import cuid from 'cuid';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // await csrf(req, res);
  if (req.method != 'DELETE') return res.status(400);
  const {id} = req.query;
  const query = z.string().safeParse(id);
  if (!query.success) {
    return res.status(400).send({
      ...query.error,
    });
  }
  try {
    const tweetIds = await new SearchFromGroupingTweets(createElasticClinet())
      .execute({
        userId: query.data,
      })
      .then(res => {
        console.log(res)
        //@ts-ignore
        return res.hits.hits[0]._source!.tweet_ids;
      });
    await prisma.$transaction([
      prisma.twitterBotUser.create({
        data: {
          id: query.data,
        },
      }),
      prisma.outbox.create({
        data: {
          aggregateId: query.data,
          aggregateType: 'TweetUser',
          eventType: 'deleteUser',
          id: cuid(),
          payload: {
            userId: query.data,
            tweetIds,
          },
          updatedAt: new Date(),
        },
      }),
    ]);

    await new DeleteFromTweetsService(createElasticClinet()).execute({
      tweetIds: tweetIds,
    });
  } catch (error) {
    console.log(error)
    throw error
  }
  return res.status(200).send(true);
}
