import {
  TWEETS_INDEX,
  TWEET_GROUPING_INDEX,
  TWEET_USERS_INDEX,
} from '../../shared/constants';
import {
  createAxiosElasticClinet,
} from '../../infrastructure/elasticsearch_client';
import { sendErrorHandlerSNS } from '../../infrastructure/send_sns';
import { Client } from '@elastic/elasticsearch';
import { NEW_ELASTIC_TWITTER_USER_CREATED } from '../../types/event';
// 2 1で取得したデータのs3urlを取得
// 3 s3urlをgetする
// 4 elasticにとうろく
export const handleCreateWebReadModelElastic = async (
  elasticClient: Client,
  payload?: NEW_ELASTIC_TWITTER_USER_CREATED,
) => {

  try {
    const count = await elasticClient.count({
      index: TWEET_USERS_INDEX,
      query: {
        match_all: {},
      },
    });
    let users: any[] = [];
    if (payload?.userId) {
      users = await elasticClient
        .search({
          index: TWEET_USERS_INDEX,
          size: 10000,
          from: 0,
          fields: ['id_str'],
          query: {
            match: {
              id_str: {
                query: payload.userId,
              },
            },
          },
          // @ts-ignore
          sort: [{ created_at: 'desc' }],
        })
        .then((res) => {
          return res!.hits.hits.map((item) => item._source);
        });
      for (const user of users) {
        const tweets: any[] = await elasticClient
          .search({
            index: TWEETS_INDEX,
            size: 10000,
            from: 0,
            query: {
              match: {
                user_id_str: {
                  query: user.id_str,
                },
              },
            },
            // @ts-ignore
            sort: [{ created_at: 'desc' }],
          })
          .then((resTweets) =>
            resTweets!.hits.hits.map((item) => item._source),
          );
        const tweetIds = tweets.map((item) => item.id_str);
        user.tweets = tweets;
        user.tweet_ids = tweetIds;
        user['pickup'] = tweets[0];
        user['others'] = tweets.filter((_, index) => index != 0);
        user['full_text'] = tweets[0]['full_text'];
        try {
          // @ts-ignore
          const axiosElasticClient = createAxiosElasticClinet();
          const test = await axiosElasticClient.put(
            // @ts-ignore
            `/${TWEET_GROUPING_INDEX}/_doc/${user.id_str}`,
            user,
          );
        } catch (error) {
          await sendErrorHandlerSNS(
            'CreateWebReadModelElastic',
            error,
            '再実行: sls invoke --function CreateWebReadModelElastic',
          );
        }
      }
    } else if (count.count > 10000) {
      for (let index = 0; index < Math.round(count.count / 10000); index++) {
        users = await elasticClient
          .search({
            index: TWEET_USERS_INDEX,
            size: 10000,
            from: index * 10000,
            fields: ['id_str'],
            query: {
              bool: {
                filter: [],
              },
            },
            //@ts-ignore
            sort: [{ created_at: 'desc' }],
          })
          .then((res) => {
            return res!.hits.hits.map((item) => item._source);
          });
        for (const user of users) {
          const tweets: any[] = await elasticClient
            .search({
              index: TWEETS_INDEX,
              size: 10000,
              from: 0,
              query: {
                match: {
                  user_id_str: {
                    query: user.id_str,
                  },
                },
              },
              // @ts-ignore
              sort: [{ created_at: 'desc' }],
            })
            .then((resTweets) =>
              resTweets!.hits.hits.map((item) => item._source),
            );
          const tweetIds = tweets.map((item) => item.id_str);
          user['pickup'] = tweets[0];
          user['others'] = tweets.filter((_, index) => index != 0);
          // user.tweets = tweets;
          user.tweet_ids = tweetIds;
          user['full_text'] = tweets[0]['full_text'];
          try {
            // @ts-ignore
            const axiosElasticClient = createAxiosElasticClinet();
            const test = await axiosElasticClient.put(
              // @ts-ignore
              `/${TWEET_GROUPING_INDEX}/_doc/${user.id_str}`,
              user,
            );
          } catch (error) {
            await sendErrorHandlerSNS(
              'CreateWebReadModelElastic',
              error,
              '再実行: sls invoke --function CreateWebReadModelElastic',
            );
          }
        }
      }
    } else {
      users = await elasticClient
        .search({
          index: TWEET_USERS_INDEX,
          size: 10000,
          from: 0,
          fields: ['id_str'],
          query: {
            bool: {
              filter: [],
            },
          },
          //@ts-ignore
          sort: [{ created_at: 'desc' }],
        })
        .then((res) => {
          return res!.hits.hits.map((item) => item._source);
        });
      for (const user of users) {
        const tweets: any[] = await elasticClient
          .search({
            index: TWEETS_INDEX,
            size: 10000,
            from: 0,
            query: {
              match: {
                user_id_str: {
                  query: user.id_str,
                },
              },
            },
            // @ts-ignore
            sort: [{ created_at: 'desc' }],
          })
          .then((resTweets) =>
            resTweets!.hits.hits.map((item) => item._source),
          );
        const tweetIds = tweets.map((item) => item.id_str);
        user.tweets = tweets;
        user.tweet_ids = tweetIds;
        user['pickup'] = tweets[0];
        user['others'] = tweets.filter((_, index) => index != 0);
        user['full_text'] = tweets[0]['full_text'];
        try {
          // @ts-ignore
          const axiosElasticClient = createAxiosElasticClinet();
          const test = await axiosElasticClient.put(
            // @ts-ignore
            `/${TWEET_GROUPING_INDEX}/_doc/${user.id_str}`,
            user,
          );
        } catch (error) {
          console.log(error)
        }
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
