import * as format from "pg-format";
import * as AWS  from "aws-sdk";
import { Client } from "pg";
import {
  TweeetLiteType,
  validateAsTweet,
} from "../../shared/tweet_output_validator";
import {
  AccessToken,
  OriginalTweetMetaFromPostgres,
  validateAccessToken,
  validateOriginalTweetMetaFromPostgres,
} from "./output_validator";
import { imageFetch } from "../../shared/image_fetch";
import * as path from "path";
import { callTwitterApiWithUserAccessToken } from "../../infrastructure/twitter_client";

export const saveCrawledTweetToS3AndDatabase = async (
  client: Client,
  s3: AWS.S3,
  tweets: TweeetLiteType[],
  accountWithSinceId: AccessToken,
  beginId: string,
  endId: string,
  count: number,
  tweetIds: string[],
  userIds: string[]
) => {
  await s3
    .putObject({
      ContentType: "application/json",
      Bucket: "save.twi-hka.com",
      Key: `${accountWithSinceId["user_id"]}/${accountWithSinceId["provider_account_id"]}/${beginId}/${endId}`,
      Body: JSON.stringify(tweets),
    })
    .promise();

  await client.query(
    `
    INSERT INTO public.batch_twitter_hometimeline (
      user_id,
      provider_account_id,
      begin_id,
      end_id,
      count,
      s3_url,
      s3_bucket,
      s3_region,
      s3_key,
      tweet_ids,
      user_ids)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    ON CONFLICT (user_id, end_id, begin_id)
      DO UPDATE SET
        user_id = excluded.user_id,
        provider_account_id = excluded.provider_account_id,
        begin_id = excluded.begin_id,
        end_id = excluded.end_id,
        count = excluded.count,
        s3_url = excluded.s3_url,
        s3_bucket = excluded.s3_bucket,
        s3_region = excluded.s3_region,
        s3_key = excluded.s3_key,
        tweet_ids = excluded.tweet_ids,
        user_ids = excluded.user_ids
    `,
    [
      accountWithSinceId["user_id"],
      accountWithSinceId["provider_account_id"],
      beginId,
      endId,
      count,
      `https://s3.ap-northeast-1.amazonaws.com/save.twi-hka.com/${accountWithSinceId["user_id"]}/${accountWithSinceId["provider_account_id"]}/${beginId}/${endId}`,
      "save.twi-hka.com",
      "ap-northeast-1",
      `${accountWithSinceId["user_id"]}/${accountWithSinceId["provider_account_id"]}/${beginId}/${endId}`,
      JSON.stringify(tweetIds),
      JSON.stringify(userIds),
    ]
  );
};
export const mockSaveCrawledTweetToS3AndDatabase = async (
  client: Client,
  s3: AWS.S3,
  tweets: TweeetLiteType[],
  accountWithSinceId: AccessToken,
  beginId: string,
  endId: string,
  count: number,
  tweetIds: string[],
  userIds: string[]
) => {};

export const mockUpdateIsDiveded = async (
  client: Client,
  unDividedOldestEndIds: string[],
  providerAccountId: string
) => {};
export const updateIsDiveded = async (
  client: Client,
  unDividedOldestEndIds: string[],
  providerAccountId: string
) => {
  await client.query(
    format(
      `
      UPDATE
        public.batch_twitter_hometimeline
      SET
        is_devided_into_30 = TRUE
      WHERE
        end_id IN (%L)
      AND provider_account_id = %L`,
      unDividedOldestEndIds,
      providerAccountId
    )
  );
};

export const saveMediaToS3AndDatabase = async (
  client: Client,
  s3: AWS.S3,
  tweets: TweeetLiteType[],
  accountWithSinceId: AccessToken
) => {
  const toBulkInsertPhotos: any[] = [];
  const toBulkInsertVideos: any[] = [];

  for (const tweet of tweets) {
    if (
      tweet.extended_entities &&
      tweet.extended_entities.media &&
      tweet.extended_entities.media.length > 0
    ) {
      for (const media of tweet.extended_entities.media) {
        if (media.type == "video") {
          // 動画の場合はmediaが一つになる
          const thumbNailbody = await imageFetch(media.media_url_https);
          const thumbNailUrl = new URL(media.media_url_https!);
          const extension = path.extname(thumbNailUrl.pathname).split(".")[1];
          await s3
            .putObject({
              Body: thumbNailbody,
              Key: `${accountWithSinceId["user_id"]}/${accountWithSinceId["provider_account_id"]}${thumbNailUrl.pathname}`,
              ContentType: ["jpg", "jpeg"].includes(extension)
                ? "image/jpeg"
                : ["png"].includes(extension)
                ? "image/png"
                : `image/${extension}`,
              Bucket: "save.twi-hka.com",
            })
            .promise();

          const video = media.video_info!;
          for (const variant of video.variants) {
            const body = await imageFetch(variant.url);
            const url = new URL(variant.url);
            await s3
              .putObject({
                Body: body,
                Key: `${accountWithSinceId["user_id"]}/${accountWithSinceId["provider_account_id"]}/${url.pathname}`,
                ContentType: variant["content_type"],
                Bucket: "save.twi-hka.com",
              })
              .promise();

            toBulkInsertVideos.push([
              accountWithSinceId["user_id"],
              accountWithSinceId["provider_account_id"],
              variant["content_type"],
              variant.bitrate || 0,
              variant.url,
              `https://s3.ap-northeast-1.amazonaws.com/save.twi-hka.com/${accountWithSinceId["user_id"]}/${accountWithSinceId["provider_account_id"]}/${url.pathname}`,
              tweet.id_str,
              tweet.user.id_str,
              tweet.user.name,
              tweet.user.screen_name,
              "save.twi-hka.com",
              "ap-northeast-1",
              `${accountWithSinceId["user_id"]}/${accountWithSinceId["provider_account_id"]}${url.pathname}`,
              `${accountWithSinceId["user_id"]}/${accountWithSinceId["provider_account_id"]}${thumbNailUrl.pathname}`,
              `https://s3.ap-northeast-1.amazonaws.com/save.twi-hka.com/${accountWithSinceId["user_id"]}/${accountWithSinceId["provider_account_id"]}${thumbNailUrl.pathname}`,
              video.duration_millis,
              video.aspect_ratio.join(","),
              media.type,
              tweet.full_text,
            ]);
          }
        } else if (media.type == "photo") {
          const thumbNailbody = await imageFetch(media.media_url_https);
          const thumbNailUrl = new URL(media.media_url_https!);
          const extension = path.extname(thumbNailUrl.pathname).split(".")[1];
          const contentType = ["jpg", "jpeg"].includes(extension)
            ? "image/jpeg"
            : ["png"].includes(extension)
            ? "image/png"
            : `image/${extension}`;
          await s3
            .putObject({
              Body: thumbNailbody,
              Key: `${accountWithSinceId["user_id"]}/${accountWithSinceId["provider_account_id"]}${thumbNailUrl.pathname}`,
              ContentType: contentType,
              Bucket: "save.twi-hka.com",
            })
            .promise();
          toBulkInsertPhotos.push([
            accountWithSinceId["user_id"],
            accountWithSinceId["provider_account_id"],
            contentType,
            media.media_url_https,
            `https://s3.ap-northeast-1.amazonaws.com/save.twi-hka.com/${accountWithSinceId["user_id"]}/${accountWithSinceId["provider_account_id"]}${thumbNailUrl.pathname}`,
            tweet.id_str,
            tweet.user.id_str,
            tweet.user.name,
            tweet.user.screen_name,
            "save.twi-hka.com",
            "ap-northeast-1",
            `${accountWithSinceId["user_id"]}/${accountWithSinceId["provider_account_id"]}${thumbNailUrl.pathname}`,
            media.type,
            tweet.full_text,
          ]);
        }
      }
    }
  }

  const toBulkInsertMoviesMap = toBulkInsertVideos.reduce((prev, current) => {
    return {
      ...prev,
      ...{ [`${current[0]}:${current[1]}:${current[4]}`]: current },
    };
  }, {});

  const toDuplicatedExcludedtoBulkInsertMovies = Object.keys(
    toBulkInsertMoviesMap
  ).map((key) => toBulkInsertMoviesMap[key]);

  // 本来ならs3に登録成功からの成功したものをsqlで保存したいがinsertをloopで回す選択肢はない
  if (toDuplicatedExcludedtoBulkInsertMovies.length > 0) {
    await client.query(
      format(
        `
      INSERT INTO public.batch_twitter_hometimeline_media (
        user_id,
         provider_account_id,
         content_type,
         bitrate,
         url,
         s3_url,
         tweet_id,
         tweet_user_id,
         tweet_user_name,
         tweet_user_screen_name,
         s3_bucket,
         s3_region,
         s3_key,
         thumbnail_s3_key,
         thumbnail_s3_url,
         duration_millis,
         aspect_ratio,
         type,
         description)
          VALUES %L
        ON CONFLICT (user_id, provider_account_id, url)
          DO UPDATE SET
            user_id = excluded.user_id,
            provider_account_id = excluded.provider_account_id,
            content_type = excluded.content_type,
            bitrate = excluded.bitrate,
            url = excluded.url,
            s3_url = excluded.s3_url,
            tweet_id = excluded.tweet_id,
            tweet_user_id = excluded.tweet_user_id,
            tweet_user_name = excluded.tweet_user_name,
            tweet_user_screen_name = excluded.tweet_user_screen_name,
            s3_bucket = excluded.s3_bucket,
            s3_region = excluded.s3_region,
            s3_key = excluded.s3_key,
            thumbnail_s3_key = excluded.thumbnail_s3_key,
            thumbnail_s3_url = excluded.thumbnail_s3_url,
            duration_millis = excluded.duration_millis,
            aspect_ratio = excluded.aspect_ratio,
            type = excluded.type,
            description = excluded.description
      `,
        toDuplicatedExcludedtoBulkInsertMovies
      )
    );
  }

  const toBulkInsertPhotosMap = toBulkInsertPhotos.reduce((prev, current) => {
    return {
      ...prev,
      ...{ [`${current[0]}:${current[1]}:${current[3]}`]: current },
    };
  }, {});

  const toDuplicatedExcludedtoBulkInsertPhotos = Object.keys(
    toBulkInsertPhotosMap
  ).map((key) => toBulkInsertPhotosMap[key]);

  // 本来ならs3に登録成功からの成功したものをsqlで保存したいがinsertをloopで回す選択肢はない
  if (toDuplicatedExcludedtoBulkInsertPhotos.length > 0) {
    await client.query(
      format(
        `
        INSERT INTO public.batch_twitter_hometimeline_media (
          user_id,
          provider_account_id,
          content_type,
          url,
          s3_url,
          tweet_id,
          tweet_user_id,
          tweet_user_name,
          tweet_user_screen_name,
          s3_bucket,
          s3_region,
          s3_key,
          type,
          description
        ) VALUES %L
        ON CONFLICT (user_id, provider_account_id, url)
          DO UPDATE SET
            user_id = excluded.user_id,
            provider_account_id = excluded.provider_account_id,
            content_type = excluded.content_type,
            url = excluded.url,
            s3_url = excluded.s3_url,
            tweet_id = excluded.tweet_id,
            tweet_user_id = excluded.tweet_user_id,
            tweet_user_name = excluded.tweet_user_name,
            tweet_user_screen_name = excluded.tweet_user_screen_name,
            s3_bucket = excluded.s3_bucket,
            s3_region = excluded.s3_region,
            s3_key = excluded.s3_key,
            type = excluded.type,
            description = excluded.description
              `,
        toDuplicatedExcludedtoBulkInsertPhotos
      )
    );
  }
};

export const mockSaveChunkedTweetToS3AndDb = async (
  client: Client,
  s3: AWS.S3,
  tweets: TweeetLiteType[],
  accountAndSinceId: AccessToken,
  beginId: string,
  endId: string,
  count: number,
  tweetIds: string[],
  userIds: string[]
) => {};

export const saveChunkedTweetToS3AndDb = async (
  client: Client,
  s3: AWS.S3,
  tweets: TweeetLiteType[],
  accountAndSinceId: AccessToken,
  beginId: string,
  endId: string,
  count: number,
  tweetIds: string[],
  userIds: string[]
) => {
  await s3
    .putObject({
      ContentType: "application/json",
      Bucket: "save.twi-hka.com",
      Key: `${accountAndSinceId["user_id"]}/${accountAndSinceId["provider_account_id"]}/${beginId}/${endId}`,
      Body: JSON.stringify(tweets),
    })
    .promise();

  await client.query(
    `
  INSERT INTO public.batch_twitter_hometimeline_divided_into_30 (
    user_id,
    provider_account_id,
    begin_id,
    end_id,
    count,
    s3_url,
    s3_bucket,
    s3_region,
    s3_key,
    tweet_ids,
    user_ids
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
  ON CONFLICT (user_id, end_id, begin_id)
    DO UPDATE SET
      user_id = excluded.user_id,
      provider_account_id = excluded.provider_account_id,
      begin_id = excluded.begin_id,
      end_id = excluded.end_id,
      count = excluded.count,
      s3_url = excluded.s3_url,
      s3_bucket = excluded.s3_bucket,
      s3_region = excluded.s3_region,
      s3_key = excluded.s3_key,
      tweet_ids = excluded.tweet_ids,
      user_ids = excluded.user_ids
  `,
    [
      accountAndSinceId["user_id"],
      accountAndSinceId["provider_account_id"],
      beginId,
      endId,
      count,
      `https://s3.ap-northeast-1.amazonaws.com/save.twi-hka.com/${accountAndSinceId["user_id"]}/${accountAndSinceId["provider_account_id"]}/${beginId}/${endId}`,
      "save.twi-hka.com",
      "ap-northeast-1",
      `${accountAndSinceId["user_id"]}/${accountAndSinceId["provider_account_id"]}/${beginId}/${endId}`,
      JSON.stringify(tweetIds),
      JSON.stringify(userIds)
    ]
  );
};

export const fetchAccessTokenAndSinceId = async (
  client: Client,
  userId: string | undefined
): Promise<AccessToken[]> => {
  const emptyOrConditinoQuery = userId
    ? `AND public.accounts.user_id = '${userId}'`
    : "";

  return validateAccessToken(
    await client
      .query(
        `
    SELECT
      public.accounts.secret,
      public.accounts.access_token,
      public.accounts.user_id,
      public.accounts.provider_account_id,
      since_id
    FROM
      public.accounts
      LEFT JOIN (
        SELECT
          user_id,
          max(end_id) AS since_id
        FROM
          public.batch_twitter_hometimeline_divided_into_30
        GROUP BY
          user_id) AS b ON b.user_id = accounts.user_id
    WHERE
      public.accounts.provider_id = $1 ${emptyOrConditinoQuery}`,
        ["twitter.com"]
      )
      .then((res) => res.rows)
  );
};

export const mockFetchAccessTokenAndSinceId = (
  client: Client,
  userId: string | undefined
) => {
  return validateAccessToken([
    {
      secret: "string",
      access_token: "string",
      user_id: "string",
      provider_account_id: "string",
      since_id: "string",
    },
  ]);
};

export const fetchTimeLineTweetSinceLast = async (
  userWithBatchMeta: AccessToken,
  query: { since_id?: string }
): Promise<TweeetLiteType[]> => {
  return validateAsTweet(
    await callTwitterApiWithUserAccessToken(
      "https://api.twitter.com/1.1/statuses/home_timeline.json",
      {
        secret: userWithBatchMeta["secret"],
        accessToken: userWithBatchMeta["access_token"],
        option: query,
      }
    )
  );
};

export const mockFetchTimeLineTweetSinceLast = async (
  userWithBatchMeta: AccessToken,
  query: { since_id?: string }
): Promise<TweeetLiteType[]> => {
  return validateAsTweet([{}]);
};

export const fetchUndividedTweetTimeline = async (
  client: Client,
  userWithBatchMeta: AccessToken
): Promise<OriginalTweetMetaFromPostgres[]> => {
  return validateOriginalTweetMetaFromPostgres(
    await client
      .query(
        `
  SELECT
    s3_bucket,
    s3_region,
    s3_key,
    end_id
  FROM
    public.batch_twitter_hometimeline
  WHERE
    is_devided_into_30 = FALSE
    AND provider_account_id = $1
  ORDER BY
    provider_account_id,
    end_id ASC
  `,
        [userWithBatchMeta["provider_account_id"]]
      )
      .then((res) => res.rows)
  );
};

export const mockFetchUndividedTweetTimeline = async (
  client: Client,
  userWithBatchMeta: AccessToken
): Promise<OriginalTweetMetaFromPostgres[]> => {
  return validateOriginalTweetMetaFromPostgres([]);
};

export const fetchTweetFromS3 = async (
  s3: AWS.S3,
  meta: OriginalTweetMetaFromPostgres
) => {
  const res = await s3
    .getObject({ Bucket: meta.s3_bucket, Key: meta.s3_key })
    .promise();
  return validateAsTweet(JSON.parse(res.Body!.toString("utf-8")));
};

export const mockFetchTwetFromS3 = async (
  s3: AWS.S3,
  meta: OriginalTweetMetaFromPostgres
) => {
  return validateAsTweet([]);
};
