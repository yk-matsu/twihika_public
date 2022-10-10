import {
  createElasticClinet,
  SearchFromTweetsByUserIdService,
  SearchFromTweetsService,
} from '@twihika/elasticsearch';
import type {NextApiRequest, NextApiResponse} from 'next';
import * as z from 'zod';
import {initUrqlClient} from 'next-urql';
import getenv from 'getenv';
import {MasterQueriesDocument, MasterQueriesQuery } from '@twihika/hasura';
import {dedupExchange, cacheExchange, fetchExchange} from 'urql';
import {toMap} from '@twihika/share';
import {prisma} from '@twihika/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const query = z
      .object({
        tweet_user_id: z.string().or(z.string().array().optional()),
        createdAtGte: z
          .string()
          .optional()
          .transform(item => item || 'now-1y'),
        page: z.string().optional(),
        limit: z.string().optional(),
      })
      .safeParse(req.query);
    if (!query.success) {
      return res.status(400).send({
        ...query.error,
      });
    }
    const client = initUrqlClient(
      {
        url: getenv('HASURA_GRAPHQL_ENDPOINT') + '/v1/graphql',
        fetchOptions: {
          // headers: {
          //   Authorization: `Bearer ${raw}`,
          // },
        },
        exchanges: [dedupExchange, cacheExchange, fetchExchange],
      },
      false
    )!;
    const {data} = await client
    .query<MasterQueriesQuery>(MasterQueriesDocument)
    .toPromise();
    const tweet_user_id = !query.data.tweet_user_id
    ? []
    : typeof query.data.tweet_user_id == 'string'
    ? [query.data.tweet_user_id]
    : query.data.tweet_user_id;

    const querySercie = new SearchFromTweetsByUserIdService(createElasticClinet());

    console.log(tweet_user_id)
    const result = await querySercie.execute({
      createdAtFilter: {gte: query.data.createdAtGte},
      tweetUserIds: tweet_user_id,
      page: query.data.page ? Number(query.data.page) : 1,
      limit: query.data.limit ? Number(query.data.limit) : 50,
    });

    console.log(result)

    res.status(200).json({
      result,
      expertUsers: data?.master_batch_search_users
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
