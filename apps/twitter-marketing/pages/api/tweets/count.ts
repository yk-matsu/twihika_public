import {
  createElasticClinet,
  SearchFromTweetsService,
} from '@twihika/elasticsearch';
import type {NextApiRequest, NextApiResponse} from 'next';
import * as z from 'zod';
import {initUrqlClient} from 'next-urql';
import getenv from 'getenv';
import {MasterQueriesDocument, MasterQueriesQuery} from '@twihika/hasura';
import {dedupExchange, cacheExchange, fetchExchange} from 'urql';
import {toMap} from '@twihika/share';

export type ApiTweetCountResponse = typeof handler extends (
  ...args: any[]
) => infer Res
  ? Res extends Promise<infer P>
    ? P extends void
      ? never
      : P
    : never
  : never;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const query = z
      .object({
        queryIds: z.string().or(z.string().array().optional()),
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
    const queryIds = !query.data.queryIds
      ? []
      : typeof query.data.queryIds == 'string'
      ? [query.data.queryIds]
      : query.data.queryIds;

    const querySercie = new SearchFromTweetsService(createElasticClinet());

    const countResult = await querySercie.execute({
      createdAtFilter: {gte: query.data.createdAtGte},
      queryIds: [],
      page: query.data.page ? Number(query.data.page) : 1,
      limit: query.data.limit ? Number(query.data.limit) : 50,
    });

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

    const queryCounts = countResult.aggregations?.group_by_query_id
      .buckets! as {key: string; doc_count: number}[];
    const queryCountsMap = toMap('key', queryCounts);
    const queryCount = data?.master_batch_search_queries.map(item => {
      return queryCountsMap.has(String(item.query_id))
        ? {
            ...item,
            ...{
              count: queryCountsMap.get(String(item.query_id))?.doc_count,
              selected: queryIds.includes(String(item.query_id)),
            },
          }
        : {...item, count: 0};
    });

    const categoryCounts = countResult.aggregations?.group_by_query_category_id
      .buckets as {key: string; doc_count: number}[];
    const categoryCountsMap = toMap('key', categoryCounts);
    const categoryCount = data?.master_batch_search_query_categories.map(
      item => {
        return categoryCountsMap.has(String(item.query_category_id))
          ? {
              ...item,
              ...{
                count: categoryCountsMap.get(String(item.query_category_id))
                  ?.doc_count,
                selected: false,
              },
            }
          : {...item, count: 0};
      }
    );
    const body = {queryCount: queryCount!, categoryCount: categoryCount!};

    res.status(200).json(body);
    return body;
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
