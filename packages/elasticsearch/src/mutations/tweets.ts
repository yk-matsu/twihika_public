import {Client} from '@elastic/elasticsearch';

export class DeleteFromTweetsService {
  constructor(private readonly client: Client) {}

  async execute({tweetIds}: {tweetIds: string[]}) {
    return await this.client.bulk({
      operations: tweetIds.map(tweetId => {
        return {
          delete: {
            _index: 'tweets',
            _id: tweetId,
          },
        };
      }),
    });
  }
}
