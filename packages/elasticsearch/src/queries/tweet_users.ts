import {Client} from '@elastic/elasticsearch';

export class SearchFromTweetFreeTextQueryService {
  constructor(private readonly client: Client) {}

  async execute(queryFreeText: string, page = 1, limit = 20) {
    return await this.client.search({
      index: 'tweet_users',
      size: limit,
      from: (page - 1) * 20,
      query: {
        match_all: {}
      },
      sort: [],
    });
  }
}
