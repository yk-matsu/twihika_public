import {Client} from '@elastic/elasticsearch';

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

    return await this.client.search({
      index: 'tweets',
      size: limit,
      from: (page - 1) * limit,
      query: condition,
      sort: [],
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
