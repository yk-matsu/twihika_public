import { isTest } from '../../shared/environment';
import {
  TweeetLiteType,
  validateAsTweet,
} from '../../shared/tweet_output_validator';
import * as AWS from 'aws-sdk';
import * as getenv from 'getenv';
import { createBearerTokenAccessClientForV1 } from '../../infrastructure/twitter_client';
import { ulid } from 'ulid';
import { sendErrorHandlerSNS } from '../../infrastructure/send_sns';
import {
  fetchRegisterdWatchingQuery,
  fetchSpecifiedTweetFromSinceId,
  fetchUndividedTweetMetaAscEndId,
  mockfetchRegisterdWatchingQuery,
  mockFetchSpecifiedTweetFromSinceId,
  mockFetchUndividedTweetMetaAscEndId,
  mocksaveChunkedTweetToS3AndDb,
  mocksaveCrawledTweetToS3AndDatabase,
  mockSaveMediaToS3AndDatabase,
  mockupdateIsDiveded,
  saveChunkedTweetToS3AndDb,
  saveCrawledTweetToS3AndDatabase,
  saveMediaToS3AndDatabase,
  updateIsDiveded,
} from './repository';
import { Client } from 'pg';
import { PubSub } from '@google-cloud/pubsub';
import { sendToLine } from '../../infrastructure/line';

AWS.config.update({
  region: getenv('REGION'),
});

const threshold = 3000;

export const handleSaveRegisteredTwitterQuery = async (
  client: Client,
  s3: AWS.S3,
  sns: AWS.SNS,
) => {
  const notify: string[] = [];

  try {
    await client.connect();
    // ここは、devide_into_30の方から引っ張る

    const sinceIdAndQueries = isTest()
      ? await mockfetchRegisterdWatchingQuery(client)
      : await fetchRegisterdWatchingQuery(client);
    notify.push('fetchRegisterdWatchingQuery');
    console.log("fetchRegisterdWatchingQuery")

    for (const masterQuery of sinceIdAndQueries) {
      const axiosTwiterClient = createBearerTokenAccessClientForV1();
      const ids = await client.query("select id from public.tweet_bot_user").then((res)=>{return res.rows.map((item => item.id))});

      const tweets = isTest()
        ? await mockFetchSpecifiedTweetFromSinceId(
            axiosTwiterClient,
            masterQuery,
          )
        : await fetchSpecifiedTweetFromSinceId(axiosTwiterClient, masterQuery, ids);
      notify.push('fetchSpecifiedTweetFromSinceId');

      if (!Array.isArray(tweets) || tweets.length == 0) {
        continue;
      }

      const end_id = tweets[0].id_str;
      const begin_id = tweets[tweets.length - 1].id_str;
      const count = tweets.length;

      isTest()
        ? await mockSaveMediaToS3AndDatabase(
            client,
            s3,
            tweets,
            masterQuery['query_id'],
          )
        : await saveMediaToS3AndDatabase(
            client,
            s3,
            tweets,
            masterQuery['query_id'],
          );
      notify.push('saveMediaToS3AndDatabase');
      // ***LINEに通知させたいものだけを個別に処理する

      const tweetIds = tweets
        .map((item) => {
          return item.id_str;
        })
        .filter((item) => !!item);
      const userIds = tweets
        .map((item) => {
          return item.user.id_str;
        })
        .filter((item) => !!item);
      const registeredTweetMeta = isTest()
        ? await mocksaveCrawledTweetToS3AndDatabase(
            client,
            s3,
            tweets,
            masterQuery['query_id'],
            begin_id,
            end_id,
            count,
            tweetIds,
            userIds,
          )
        : await saveCrawledTweetToS3AndDatabase(
            client,
            s3,
            tweets,
            masterQuery['query_id'],
            begin_id,
            end_id,
            count,
            tweetIds,
            userIds,
          );
      const pubsub = new PubSub({});
      const topic = pubsub.topic(
        process.env.DEVELOPMENT_MODE + '.' + 'twihika.application.eventbus',
      );

      await topic.publishMessage({
        json: {
          pattern: 'nestjs',
          type: 'REGISTERED_batch_twitter_search_queries',
          resourceId: ulid(Date.now()),
          payload: registeredTweetMeta,
        },
      });
      notify.push('saveCrawledTweetToS3AndDatabase');

      /////////////////////////////////////////////////////
      // ここから30件ずつにする調整をしていく
      /////////////////////////////////////////////////////

      const originalMeta = isTest()
        ? await mockFetchUndividedTweetMetaAscEndId(client, masterQuery)
        : await fetchUndividedTweetMetaAscEndId(client, masterQuery);
      notify.push('fetchUndividedTweetMetaAscEndId');
      let fromS3TweetsDescTweets: TweeetLiteType[] = [];
      // 古いものからloopにかける
      let dividedInto30ProcessedLastIds: string[] = [];
      // ここでしきい値より少ないものを削除する
      await client.query(
        `
        delete from batch_twitter_search_queries_divided_into_30 where count < $1 and query_id = $2
      `,
        [threshold, masterQuery.query_id],
      );
      for (let index = 0; index < originalMeta.length; index++) {
        const res = await s3
          .getObject({
            Bucket: originalMeta[index].s3_bucket,
            Key: originalMeta[index].s3_key,
          })
          .promise();
        // 古いものを後ろに先頭に来るほど新しい
        let s3Tweets = validateAsTweet(JSON.parse(res.Body!.toString('utf-8')));
        if (!Array.isArray(s3Tweets)) {
          continue;
        }
        fromS3TweetsDescTweets = [...s3Tweets, ...fromS3TweetsDescTweets];
        dividedInto30ProcessedLastIds.push(originalMeta[index].end_id);

        // 30を超えていたデータを作る更新
        while (fromS3TweetsDescTweets.length > threshold) {
          // 後ろから30件が古いデータ
          // console.log('大きいいから小さい')
          const newerTweetId = fromS3TweetsDescTweets[0].id_str;
          const olderTweetId =
            fromS3TweetsDescTweets[fromS3TweetsDescTweets.length - 1].id_str;
          const count = fromS3TweetsDescTweets.length;
          const [] = fromS3TweetsDescTweets;
          const tweetIds = fromS3TweetsDescTweets
            .map((item) => {
              return item.id_str;
            })
            .filter((item) => !!item);
          const userIds = fromS3TweetsDescTweets
            .map((item) => {
              return item.user.id_str;
            })
            .filter((item) => !!item);

          isTest()
            ? await mocksaveChunkedTweetToS3AndDb(
                client,
                s3,
                fromS3TweetsDescTweets,
                masterQuery['query_id'],
                olderTweetId,
                newerTweetId,
                count,
                tweetIds,
                userIds,
              )
            : await saveChunkedTweetToS3AndDb(
                client,
                s3,
                fromS3TweetsDescTweets,
                masterQuery['query_id'],
                olderTweetId,
                newerTweetId,
                count,
                tweetIds,
                userIds,
              );
          // 処理済みのデータはリセット
          fromS3TweetsDescTweets = [];
          notify.push('saveChunkedTweetToS3AndDb');
          isTest()
            ? await mockupdateIsDiveded(
                client,
                dividedInto30ProcessedLastIds,
                masterQuery['query_id'],
              )
            : await updateIsDiveded(
                client,
                dividedInto30ProcessedLastIds,
                masterQuery['query_id'],
              );
          notify.push('updateIsDiveded');
          // 処理済みをリセット
          dividedInto30ProcessedLastIds = [];
        }
        // 最後のデータを取得してかつwhileを抜けているので30未満
        if (originalMeta.length - 1 == index) {
          const newerTweetId = fromS3TweetsDescTweets[0].id_str;
          const olderTweetId =
            fromS3TweetsDescTweets[fromS3TweetsDescTweets.length - 1].id_str;
          const tweetIds = fromS3TweetsDescTweets
            .map((item) => {
              return item.id_str;
            })
            .filter((item) => !!item);
          const userIds = fromS3TweetsDescTweets
            .map((item) => {
              return item.user.id_str;
            })
            .filter((item) => !!item);
          await saveChunkedTweetToS3AndDb(
            client,
            s3,
            fromS3TweetsDescTweets,
            masterQuery['query_id'],
            olderTweetId,
            newerTweetId,
            fromS3TweetsDescTweets.length,
            tweetIds,
            userIds,
          );
        }
      }
      console.log(await client.query(
        'insert into batch_search_queries_processing_state (query_id) values($1)',
        [masterQuery.query_id],
      ));
    }
    await client.query('DELETE FROM batch_search_queries_processing_state')
    await client.end();
  } catch (error) {
    console.log(error)
    throw error;
  } finally {
    await client.end();
  }
  console.log(notify.join(','));
  return;
};
