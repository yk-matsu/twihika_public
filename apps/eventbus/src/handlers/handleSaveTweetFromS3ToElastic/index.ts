import { TWEET_USERS_INDEX } from '../../shared/constants';
import { sendErrorHandlerSNS } from '../../infrastructure/send_sns';
import { TweeetLiteType } from '../../shared/tweet_output_validator';
import { isTest } from '../../shared/environment';
import * as AWS from 'aws-sdk';
import Ajv, { JSONSchemaType } from 'ajv';
import type { Client } from 'pg';
import { validateAsTweet } from '../../shared/tweet_output_validator';
import { AxiosInstance } from 'axios';
import * as format from 'pg-format';
import { TWEETS_INDEX } from '../../shared/constants';
import { PubSub } from '@google-cloud/pubsub';
//1 データの取得
/* select * from master_batch_search_queries as m left join batch_twitter_sea
 rch_queries_divided_into_30 as d on m.query_id = d.query_id where m.query_ids
*/

// 2 1で取得したデータのs3urlを取得
// 3 s3urlをgetする
// 4 elasticにとうろく

interface TweetMetaFromPostgres {
  s3_key: string;
  s3_bucket: string;
  query_id: number;
  query_category_id: number | null;
}

export const validateTweetMetaFromPostgres = (data) => {
  const ajv = new Ajv();

  const constraints: JSONSchemaType<TweetMetaFromPostgres[]> = {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      properties: {
        s3_bucket: { type: 'string' },
        s3_key: { type: 'string' },
        query_id: { type: 'number' },
        query_category_id: { type: 'number', nullable: true}
      },
      required: ['s3_bucket', 's3_key', 'query_id', 'query_category_id'],
    },
  };

  const validate = ajv.compile(constraints);
  if (validate(data)) {
    return data;
  } else {
    console.log(validate.errors);
    throw new Error(validate.errors!.map((err) => err.message).join('\n'));
  }
};

const mockfetchChunckedTweets3Location = async (client: Client) => {
  return validateTweetMetaFromPostgres([]);
};
const fetchChunckedTweets3Location = async (client: Client) => {
  return validateTweetMetaFromPostgres(
    // ここは、devide_into_30の方から引っ張る
    await client
      .query(
        `
  SELECT
    d.s3_key,
    d.s3_bucket,
    m.query_id,
    m.query_category_id
  FROM
    master_batch_search_queries AS m
    INNER JOIN batch_twitter_search_queries_divided_into_30 AS d ON m.query_id = d.query_id
  WHERE
    d.is_uploaded_to_elastic = false
  AND m.is_not_sync_elastic = false
  AND m.is_published_all = true
  ORDER BY
    m.created_at ASC;
  `,
      )
      .then((res) => res.rows),
  );
};

const fetchTweetsFromS3 = async (
  s3: AWS.S3,
  masterQuery: TweetMetaFromPostgres,
) => {
  return validateAsTweet(
    JSON.parse(
      await s3
        .getObject({ Bucket: masterQuery.s3_bucket, Key: masterQuery.s3_key })
        .promise()
        .then((res) => res.Body!.toString('utf-8')),
    ),
  );
};
const mockfetchTweetsFromS3 = async (
  s3: AWS.S3,
  masterQuery: TweetMetaFromPostgres,
) => {
  return validateAsTweet([]);
};

interface ExtendedTweetLiteType extends TweeetLiteType {
  user: {
    id_str: string;
    screen_name: string;
    name: string;
    query_id: number[];
    query_category_id: number[]
  };
}

const addQueryIdToUser = (
  tweet: TweeetLiteType,
  queryIds: number[],
  queryCategoryIds: number[]
): ExtendedTweetLiteType => {
  const clone: ExtendedTweetLiteType = {
    ...tweet,
    user: {
      ...tweet.user,
      query_id: queryIds,
      query_category_id: queryCategoryIds
    },
  };
  return clone;
};

export const handleSaveTweetFromS3ToElastic = async (
  client: Client,
  s3: AWS.S3,
  axiosElsaticClient: AxiosInstance,
) => {
  try {
    await client.connect();
    const tweetsS3LocationMetas = isTest()
      ? await mockfetchChunckedTweets3Location(client)
      : await fetchChunckedTweets3Location(client);

    const failedToPutTweetIds: string[] = [];
    for (const masterQuery of tweetsS3LocationMetas) {
      const tweets = isTest()
        ? await mockfetchTweetsFromS3(s3, masterQuery)
        : await fetchTweetsFromS3(s3, masterQuery);
      let registeredCount = 0;
      try {
        for (const tweet of tweets) {
          // @ts-ignore
          if (!tweet.full_text || tweet.retweeted_status || !tweet.created_at) continue;
          tweet['user_id_str'] = tweet.user.id_str;
          tweet['query_id'] = [masterQuery.query_id];
          tweet['query_category_id'] = masterQuery.query_category_id ? [masterQuery.query_category_id] : [];

          const resTweet = await axiosElsaticClient.put(
            `/${TWEETS_INDEX}/_doc/${tweet.id_str}`,
            tweet,
          );
          if (resTweet.status == 201) {
            const pubsub = new PubSub({});
            const topic = pubsub.topic(process.env.DEVELOPMENT_MODE  + "."+  'twihika.application.eventbus');

            await topic.publishMessage({
              json: {
                pattern: 'nestjs',
                type: 'NEW_ELASTIC_TWITTER_TWEET_CREATED',
                payload: {
                  resourceId: tweet.user.id_str,
                  userId: tweet.user.id_str,
                  ...masterQuery,
                },
              },
            });
          }

          // TODO: 必要であればここでdatabaseからどのqueryに属するか取得する
          const extendedTweet = addQueryIdToUser(tweet, [masterQuery.query_id], masterQuery.query_category_id ? [masterQuery.query_category_id] : []);
          const res = await axiosElsaticClient.put(
            `/${TWEET_USERS_INDEX}/_doc/${extendedTweet.user.id_str}`,
            extendedTweet.user,
          );
          if (res.status == 201) {
            const pubsub = new PubSub({});
            const topic = pubsub.topic(process.env.DEVELOPMENT_MODE  + "."+ 'twihika.application.eventbus');

            await topic.publishMessage({
              json: {
                pattern: 'nestjs',
                type: 'NEW_ELASTIC_TWITTER_USER_CREATED',
                payload: {
                  resourceId: extendedTweet.user.id_str,
                  userId: extendedTweet.user.id_str,
                  ...masterQuery,
                },
              },
            });
          }

          registeredCount++;
        }
      } catch (error) {
        console.log(error);
        continue;
      }
      if (!(registeredCount > 0)) continue;
      await client.query(
        format(
          `
       UPDATE batch_twitter_search_queries_divided_into_30 SET is_uploaded_to_elastic = TRUE
       WHERE s3_bucket = %L
       AND s3_key IN (%L)
      `,
          masterQuery.s3_bucket,
          masterQuery.s3_key,
        ),
      );
    }

    if (failedToPutTweetIds.length > 0) {
      await sendErrorHandlerSNS(
        'SaveTweetFromS3ToElastic',
        new Error('failed put tweet to elastic'),
        failedToPutTweetIds.join(','),
      );
    }

    // 登録が終わったここで、grouping舌情報を再度登録する
  } catch (error) {
    console.log(error)
    // retryを避ける
  } finally {
    await client.end();
  }
  return;
};
