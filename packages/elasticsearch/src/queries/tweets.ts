import type { TweeetLiteType } from '@twihika/types/twitter';
import {Client} from '@elastic/elasticsearch';
import { AggregationsTermsAggregateBase } from '@elastic/elasticsearch/lib/api/types';

export class SearchFromTweetsService {
  constructor(private readonly client: Client) {}

  async execute({
    createdAtFilter,
    queryIds,
    page = 1,
    limit = 50,
  }: {
    createdAtFilter: Partial<{[key in 'gt' | 'lt' | 'gte' | 'lte']: string}>;
    queryIds: string[];
    page: number;
    limit: number;
  }) {
    let condition = {};
    if (Object.entries(createdAtFilter).length > 0 && queryIds.length > 0) {
      condition = {
        bool: {
          filter: [
            {
              range: {
                created_at: {
                  ...createdAtFilter,
                },
              },
            },
            {
              terms: {
                query_id: queryIds,
              },
            },
          ],
        },
      };
    } else if (Object.entries(createdAtFilter).length > 0) {
      condition = {
        bool: {
          filter: [
            {
              range: {
                created_at: {
                  ...createdAtFilter,
                },
              },
            },
          ],
        },
      };
    } else if (queryIds.length > 0) {
      condition = {
        bool: {
          filter: [
            {
              terms: {
                query_id: queryIds,
              },
            },
          ],
        },
      };
    }

    return await this.client.search<TweeetLiteType, {"group_by_query_id": AggregationsTermsAggregateBase<{key: string, doc_count: number}>,"group_by_query_category_id":AggregationsTermsAggregateBase<{key: string, doc_count: number}> }>({
      index: 'tweets',
      size: limit,
      from: (page - 1) * limit,
      query: condition,
      sort: [{"created_at": "desc"}],
      aggs: {
        group_by_query_id: {
          terms: {
            field: 'query_id',
          },
        },
        group_by_query_category_id: {
          terms: {
            field: 'query_category_id',
          },
        },
      },
    });
  }
}
export class SearchFromTweetsByUserIdService {
  constructor(private readonly client: Client) {}

  async execute({
    createdAtFilter,
    tweetUserIds,
    page = 1,
    limit = 50,
  }: {
    createdAtFilter: Partial<{[key in 'gt' | 'lt' | 'gte' | 'lte']: string}>;
    tweetUserIds: string[];
    page: number;
    limit: number;
  }) {
    let condition = {};
    if (Object.entries(createdAtFilter).length > 0 && tweetUserIds.length > 0) {
      condition = {
        bool: {
          filter: [
            {
              range: {
                created_at: {
                  ...createdAtFilter,
                },
              },
            },
            {
              terms: {
                user_id_str: tweetUserIds,
              },
            },
          ],
        },
      };
    } else if (Object.entries(createdAtFilter).length > 0) {
      condition = {
        bool: {
          filter: [
            {
              range: {
                created_at: {
                  ...createdAtFilter,
                },
              },
            },
          ],
        },
      };
    } else if (tweetUserIds.length > 0) {
      condition = {
        bool: {
          filter: [
            {
              terms: {
                user_id_str: tweetUserIds,
              },
            },
          ],
        },
      };
    }

    const res =  await this.client.search<TweeetLiteType, {"group_by_query_id": AggregationsTermsAggregateBase<{key: string, doc_count: number}>}>({
      index: 'tweets',
      size: limit,
      from: (page - 1) * limit,
      query: condition,
      sort: [{"created_at": "desc"}],
      aggs: {
        group_by_query_id: {
          terms: {
            field: 'user_id_str',
          },
        },
      },
    });
    return res
  }
}

// const limit = 20;
// // @ts-ignore
// const result = await client.search({
//   index: 'tweet_groupings',
//   size: limit,
//   from: (page - 1) * 20,
//   query: {
//     bool: {
//       ...queryInnerBool,
//     },
//   },
//   _source: {
//     // @ts-ignore
//     includes: ['pickup.*'],
//   },
//   fields: ['others.full_text'],
//   // @ts-ignore
//   sort: sort,
//   aggs: {
//     type_count: {
//       cardinality: {
//         field: 'id_str',
//       },
//     },
//     ...aggs,
//   },
// });
