import { sendErrorHandlerSNS } from '../../infrastructure/send_sns';
import * as AWS  from "aws-sdk";
import type { Client } from "pg";
import { isTest } from "../../shared/environment";
import { validateTwitterIntegrateed } from "../../types/eventValidator";
import { Event } from "../../types/event";
import { fetchAccessTokenAndSinceId, fetchTimeLineTweetSinceLast, fetchTweetFromS3, fetchUndividedTweetTimeline, mockFetchAccessTokenAndSinceId, mockFetchTimeLineTweetSinceLast, mockFetchTwetFromS3, mockFetchUndividedTweetTimeline, mockSaveChunkedTweetToS3AndDb, mockSaveCrawledTweetToS3AndDatabase, mockUpdateIsDiveded, saveChunkedTweetToS3AndDb, saveCrawledTweetToS3AndDatabase, saveMediaToS3AndDatabase, updateIsDiveded } from "./repository";
import { TweeetLiteType } from "../../shared/tweet_output_validator";
const threshold = 1000;
export const handleSaveTwitterTimeLineToS3 = async (
  client: Client,
  s3: AWS.S3,
  event: Event
) => {
  const notify: string[] = [];

  let userId: string | undefined;
  // eventが自身で作ったものの場合に想定しないものはエラーにする
  if (event?.type == "TWITTER_INTEGRATED") {
    const payload = event.payload;
    const validated = validateTwitterIntegrateed(payload);
    userId = validated.userId;
  }

  try {
    const accessTokenAndSinceIds = isTest()
      ? mockFetchAccessTokenAndSinceId(client, userId)
      : await fetchAccessTokenAndSinceId(client, userId);

    notify.push("accessTokenAndSinceIds");

    for (const userWithBatchMeta of accessTokenAndSinceIds) {
      let query: { since_id?: string } = userWithBatchMeta.since_id
        ? { since_id: userWithBatchMeta.since_id }
        : {};

      const tweets = isTest()
        ? await mockFetchTimeLineTweetSinceLast(userWithBatchMeta, query)
        : await fetchTimeLineTweetSinceLast(userWithBatchMeta, query);

      notify.push("callTwitterApiWithUserAccessToken");

      if (!tweets || tweets.length == 0) {
        continue;
      }

      const end_id = tweets[0].id_str;
      const begin_id = tweets[tweets.length - 1].id_str;
      const count = tweets.length;

      await saveMediaToS3AndDatabase(client, s3, tweets, userWithBatchMeta);
      notify.push("saveMediaToS3AndDatabase");
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

      isTest()
        ? await mockSaveCrawledTweetToS3AndDatabase(
            client,
            s3,
            tweets,
            userWithBatchMeta,
            begin_id,
            end_id,
            count,
            tweetIds,
            userIds
          )
        : await saveCrawledTweetToS3AndDatabase(
            client,
            s3,
            tweets,
            userWithBatchMeta,
            begin_id,
            end_id,
            count,
            tweetIds,
            userIds
          );
      notify.push("saveCrawledTweetToS3AndDatabase");

      /////////////////////////////////////////////////////
      // ここから30件ずつにする調整をしていく
      /////////////////////////////////////////////////////

      const originalMeta = isTest()
        ? await mockFetchUndividedTweetTimeline(client, userWithBatchMeta)
        : await fetchUndividedTweetTimeline(client, userWithBatchMeta);

      notify.push("validateOriginalTweetMetaFromPostgres");

      let fromS3TweetsDescTweets: TweeetLiteType[] = [];
      let dividedInto30ProcessedLastIds: string[] = [];
      // ここでしきい値より少ないものを削除する
      client.query(
        `
        delete from batch_twitter_hometimeline_divided_into_30 where count < $1 and user_id = $2
      `,
        [threshold, userWithBatchMeta.user_id]
      );

      for (let index = 0; index < originalMeta.length; index++) {
        await s3
          .getObject({
            Bucket: originalMeta[index].s3_bucket,
            Key: originalMeta[index].s3_key,
          })
          .promise();

        let s3Tweets = isTest()
          ? await mockFetchTwetFromS3(s3, originalMeta[index])
          : await fetchTweetFromS3(s3, originalMeta[index]);

        if (!Array.isArray(s3Tweets)) {
          continue;
        }

        fromS3TweetsDescTweets = [...s3Tweets, ...fromS3TweetsDescTweets];
        dividedInto30ProcessedLastIds.push(originalMeta[index].end_id);

        // 30を超えていたデータを作る更新
        while (fromS3TweetsDescTweets.length > threshold) {
          // 後ろから30県が古いデータ
          const newerTweetId = fromS3TweetsDescTweets[0].id_str;
          const olderTweetId =
            fromS3TweetsDescTweets[fromS3TweetsDescTweets.length - 1].id_str;
          const count = fromS3TweetsDescTweets.length;
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
            ? await mockSaveChunkedTweetToS3AndDb(
                client,
                s3,
                fromS3TweetsDescTweets,
                userWithBatchMeta,
                olderTweetId,
                newerTweetId,
                count,
                tweetIds,
                userIds
              )
            : await saveChunkedTweetToS3AndDb(
                client,
                s3,
                fromS3TweetsDescTweets,
                userWithBatchMeta,
                olderTweetId,
                newerTweetId,
                count,
                tweetIds,
                userIds
              );
          fromS3TweetsDescTweets = [];
          notify.push("saveChunkedTweetToS3AndDb");
          isTest()
            ? await mockUpdateIsDiveded(
                client,
                dividedInto30ProcessedLastIds,
                userWithBatchMeta.provider_account_id
              )
            : await updateIsDiveded(
                client,
                dividedInto30ProcessedLastIds,
                userWithBatchMeta.provider_account_id
              );
          notify.push("updateIsDiveded");
          // 処理済みをリセット
          dividedInto30ProcessedLastIds = [];
        }
        // 最後のデータを取得してかつwhileを抜けているので30未満
        if (fromS3TweetsDescTweets.length > 0 && originalMeta.length - 1 == index) {
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
            userWithBatchMeta,
            olderTweetId,
            newerTweetId,
            fromS3TweetsDescTweets.length,
            tweetIds,
            userIds
          );
        }
      }
    }
  } catch (err) {
    console.log(err)
    console.log(notify.join(","));
    throw err;
  }
};
