import {Client} from '@elastic/elasticsearch';

export class SearchFromGroupingTweets {
  constructor(private readonly client: Client) {}

  async execute({
    userId,
    page = 1,
    limit = 20,
  }: {
    userId: string;
    page?: number;
    limit?: number;
  }) {
    return await this.client.search({
      index: 'tweet_groupings',
      size: limit,
      from: (page - 1) * 20,
      query: {
        bool: {
          filter: [
            {
              terms: {
                id_str: [userId],
              },
            },
          ],
        },
      },
      sort: [],
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
