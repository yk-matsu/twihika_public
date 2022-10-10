import { Event } from '../../types/event';
import { imageFetch } from '../../shared/image_fetch';
import * as queryString from 'query-string';
import { URL } from 'url';
import * as format from 'pg-format';
import * as path from 'path';
import type { Client } from 'pg';
import {
  createTwitterApiQueryOption,
  validateSinceIdAndQuery,
  SinceIdAndQuery,
  OriginalTweetMetaFromPostgres,
  validateOriginalTweetMetaFromPostgres,
  validateRegisteredTweetMeta,
  RegisteredTweetMeta,
} from './output_validator';
import { AxiosInstance } from 'axios';
import {
  TweeetLiteType,
  validateAsTweet,
} from '../../shared/tweet_output_validator';
import { S3 } from 'aws-sdk';
export const mocksaveCrawledTweetToS3AndDatabase = async (
  client: Client,
  s3: S3,
  tweets: TweeetLiteType[],
  twitter_user_id: string,
  beginId: string,
  endId: string,
  count: number,
  tweetIds: string[],
  userIds: string[],
): Promise<RegisteredTweetMeta[]> => {
  return validateRegisteredTweetMeta([]);
};
export const saveCrawledTweetToS3AndDatabase = async (
  client: Client,
  s3: S3,
  tweets: TweeetLiteType[],
  twitter_user_id: string,
  beginId: string,
  endId: string,
  count: number,
  tweetIds: string[],
  userIds: string[],
) => {
  await s3
    .putObject({
      ContentType: 'application/json',
      Bucket: 'save.twi-hka.com',
      Key: `${twitter_user_id}/${beginId}/${endId}`,
      Body: JSON.stringify(tweets),
    })
    .promise();

  return validateRegisteredTweetMeta(
    await client
      .query(
        `
INSERT INTO public.batch_twitter_search_users (
  twitter_user_id,
begin_id,
end_id,
count,
s3_url,
s3_bucket,
s3_region,
s3_key,
tweet_ids,
user_ids
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
ON CONFLICT (twitter_user_id, end_id, begin_id)
DO UPDATE SET
twitter_user_id = excluded.twitter_user_id,
begin_id = excluded.begin_id,
end_id = excluded.end_id,
count = excluded.count,
s3_url = excluded.s3_url,
s3_bucket = excluded.s3_bucket,
s3_region = excluded.s3_region,
s3_key = excluded.s3_key,
tweet_ids = excluded.tweet_ids,
user_ids = excluded.user_ids
returning twitter_user_id, s3_key, s3_bucket
`,
        [
          twitter_user_id,
          beginId,
          endId,
          count,
          `https://s3.ap-northeast-1.amazonaws.com/save.twi-hka.com/${twitter_user_id}/${beginId}/${endId}`,
          'save.twi-hka.com',
          'ap-northeast-1',
          `${twitter_user_id}/${beginId}/${endId}`,
          JSON.stringify(tweetIds),
          JSON.stringify(userIds),
        ],
      )
      .then((res) => res.rows),
  );
};

export const mockupdateIsDiveded = async (
  client: Client,
  unDividedOldestEndIds: string[],
  twitter_user_id: string,
) => {};
export const updateIsDiveded = async (
  client: Client,
  unDividedOldestEndIds: string[],
  twitter_user_id: string,
) => {
  await client.query(
    format(
      `
    UPDATE
      public.batch_twitter_search_queries
    SET
      is_devided_into_30 = TRUE
    WHERE
      end_id IN (%L)
      AND query_id = %L`,
      unDividedOldestEndIds,
      twitter_user_id,
    ),
  );
};

export const saveMediaToS3AndDatabase = async (
  client: Client,
  s3: S3,
  tweets: TweeetLiteType[],
  twitter_user_id: string,
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
        if (media.type == 'video') {
          // 動画の場合はmediaが一つになる
          const thumbNailbody = await imageFetch(media.media_url_https);
          const thumbNailUrl = new URL(media.media_url_https!);
          const extension = path.extname(thumbNailUrl.pathname).split('.')[1];
          const thumbNailS3Key = `${twitter_user_id}/${thumbNailUrl.pathname}`;
          await s3
            .putObject({
              Body: thumbNailbody,
              Key: thumbNailS3Key,
              ContentType: ['jpg', 'jpeg'].includes(extension)
                ? 'image/jpeg'
                : ['png'].includes(extension)
                ? 'image/png'
                : `image/${extension}`,
              Bucket: 'save.twi-hka.com',
            })
            .promise();

          const video = media.video_info!;
          for (const variant of video.variants) {
            const body = await imageFetch(variant.url);
            const url = new URL(variant.url);
            await s3
              .putObject({
                Body: body,
                Key: `${twitter_user_id}/${url.pathname}`,
                ContentType: variant['content_type'],
                Bucket: 'save.twi-hka.com',
              })
              .promise();

            toBulkInsertVideos.push([
              twitter_user_id,
              variant['content_type'],
              variant.bitrate || 0,
              variant.url,
              `https://s3.ap-northeast-1.amazonaws.com/save.twi-hka.com/${twitter_user_id}/${url.pathname}`,
              tweet.id_str,
              tweet.user.id_str,
              tweet.user.name,
              tweet.user.screen_name,
              'save.twi-hka.com',
              'ap-northeast-1',
              `${twitter_user_id}/${url.pathname}`,
              thumbNailS3Key,
              `https://s3.ap-northeast-1.amazonaws.com/save.twi-hka.com/${thumbNailS3Key}`,
              video.duration_millis,
              video.aspect_ratio.join(','),
              media.type,
              tweet.full_text,
            ]);
          }
        } else if (media.type == 'photo') {
          const thumbNailbody = await imageFetch(media.media_url_https);
          const thumbNailUrl = new URL(media.media_url_https!);
          const extension = path.extname(thumbNailUrl.pathname).split('.')[1];
          const contentType = ['jpg', 'jpeg'].includes(extension)
            ? 'image/jpeg'
            : ['png'].includes(extension)
            ? 'image/png'
            : `image/${extension}`;
          const thumbNailS3Key = `${twitter_user_id}/${thumbNailUrl.pathname}`;
          await s3
            .putObject({
              Body: thumbNailbody,
              Key: thumbNailS3Key,
              ContentType: contentType,
              Bucket: 'save.twi-hka.com',
            })
            .promise();

          toBulkInsertPhotos.push([
            twitter_user_id,
            contentType,
            media.media_url_https,
            `https://s3.ap-northeast-1.amazonaws.com/save.twi-hka.com/${twitter_user_id}/${thumbNailUrl.pathname}`,
            tweet.id_str,
            tweet.user.id_str,
            tweet.user.name,
            tweet.user.screen_name,
            'save.twi-hka.com',
            'ap-northeast-1',
            `${twitter_user_id}/${thumbNailUrl.pathname}`,
            media.type,
            tweet.full_text,
          ]);
        }
      }
    }
  }

  const toBulkInsertVideosMap = toBulkInsertVideos.reduce((prev, current) => {
    return {
      ...prev,
      ...{ [`${current[0]}:${current[3]}`]: current },
    };
  }, {});

  const toDuplicatedExcludedtoBulkInsertVideos = Object.keys(
    toBulkInsertVideosMap,
  ).map((key) => toBulkInsertVideosMap[key]);

  // 本来ならs3に登録成功からの成功したものをsqlで保存したいがinsertをloopで回す選択肢はない
  if (toDuplicatedExcludedtoBulkInsertVideos.length > 0) {
    await client.query(
      format(
        `
        INSERT INTO public.batch_twitter_search_users_divided_into_30
        (
          twitter_user_id,
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
        ON CONFLICT (twitter_user_id, url)
        DO UPDATE SET
          twitter_user_id = excluded.twitter_user_id,
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
returning url`,
        toDuplicatedExcludedtoBulkInsertVideos,
      ),
    );
  }

  const toBulkInsertPhotosMap = toBulkInsertPhotos.reduce((prev, current) => {
    return {
      ...prev,
      ...{ [`${current[0]}:${current[2]}`]: current },
    };
  }, {});

  const toDuplicatedExcludedtoBulkInsertPhotos = Object.keys(
    toBulkInsertPhotosMap,
  ).map((key) => toBulkInsertPhotosMap[key]);

  // 本来ならs3に登録成功からの成功したものをsqlで保存したいがinsertをloopで回す選択肢はない
  if (toDuplicatedExcludedtoBulkInsertPhotos.length > 0) {
    await client.query(
      format(
        `
INSERT INTO public.batch_twitter_search_users_medias
(
  twitter_user_id,
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
ON CONFLICT (twitter_user_id, url)
DO UPDATE SET
  twitter_user_id = excluded.twitter_user_id,
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
returning url`,
        toDuplicatedExcludedtoBulkInsertPhotos,
      ),
    );
  }
};

export const mockSaveMediaToS3AndDatabase = async (
  client: Client,
  s3: S3,
  tweets: TweeetLiteType[],
  twitter_user_id: string,
) => {};

export const mocksaveChunkedTweetToS3AndDb = async (
  client: Client,
  s3: S3,
  tweets: TweeetLiteType[],
  twitter_user_id: string,
  beginId: string,
  endId: string,
  count: number,
  tweetIds: string[],
  userIds: string[],
) => {};

export const saveChunkedTweetToS3AndDb = async (
  client: Client,
  s3: S3,
  tweets: TweeetLiteType[],
  twitter_user_id: string,
  beginId: string,
  endId: string,
  count: number,
  tweetIds: string[],
  userIds: string[],
) => {
  await s3
    .putObject({
      ContentType: 'application/json',
      Bucket: 'save.twi-hka.com',
      Key: `${twitter_user_id}/${beginId}/${endId}`,
      Body: JSON.stringify(tweets),
    })
    .promise();

  await client.query(
    `
INSERT INTO public.batch_twitter_search_users_divided_into_30 (
  twitter_user_id,
  begin_id,
  end_id,
  count,
  s3_url,
  s3_bucket,
  s3_region,
  s3_key,
  tweet_ids,
  user_ids
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
ON CONFLICT (twitter_user_id, end_id, begin_id)
DO UPDATE SET
  twitter_user_id = $1,
  begin_id = $2,
  end_id = $3,
  count = $4,
  s3_url = $5,
  s3_bucket = $6,
  s3_region = $7,
  s3_key = $8,
  tweet_ids = $9,
  user_ids = $10
  `,
    [
      twitter_user_id,
      beginId,
      endId,
      count,
      `https://s3.ap-northeast-1.amazonaws.com/save.twi-hka.com/${twitter_user_id}/${beginId}/${endId}`,
      'save.twi-hka.com',
      'ap-northeast-1',
      `${twitter_user_id}/${beginId}/${endId}`,
      JSON.stringify(tweetIds),
      JSON.stringify(userIds),
    ],
  );
};

// 結局validateして値が信用できるかどうかだけわかったら良いことにした
export const createTwitterApiQuery = (option: createTwitterApiQueryOption) => {
  const query = {
    lang: 'ja',
    locale: 'ja',
    result_type: 'recent',
    count: '100',
    tweet_mode: 'extended',
    exclude_replies: false,
    include_rts: true,
    ...option,
  };
  if (!option.since_id) {
    delete query['since_id'];
  }
  return query;
};

export const fetchRegisterdWatchingQuery = async (
  client: Client,
): Promise<SinceIdAndQuery[]> => {
  return validateSinceIdAndQuery(
    await client
      .query<SinceIdAndQuery>(
        `
SELECT
  screen_name,
  m.twitter_user_id,
  end_id AS since_id
FROM
  public.master_batch_search_users AS m
  LEFT JOIN (
    SELECT
      twitter_user_id,
      max(end_id) AS end_id
    FROM
      public.batch_twitter_search_users_divided_into_30
    GROUP BY
    twitter_user_id) AS q ON m.twitter_user_id = q.twitter_user_id
WHERE m.twitter_user_id not in (
  SELECT twitter_user_id FROM batch_search_users_processing_state
)
AND m.is_published_all = true`,
      )
      .then((res) => res.rows),
  );
};

export const mockfetchRegisterdWatchingQuery = async (
  client: Client,
): Promise<SinceIdAndQuery[]> => {
  return validateSinceIdAndQuery([]);
};

export const fetchSpecifiedTweetFromSinceId = async (
  axiosTwiterClient: AxiosInstance,
  masterQuery: SinceIdAndQuery,
  excludeUserIds: string[],
) => {
  return validateAsTweet(
    await axiosTwiterClient
      .get(
        `/1.1/statuses/user_timeline.json?${queryString.stringify(
          createTwitterApiQuery({
            user_id: masterQuery.twitter_user_id,
            since_id: masterQuery.since_id,
          }),
        )}`,
      )
      .then((res): any[] => res.data),
  ).filter((res) => !excludeUserIds.includes(res.user.id_str));
};

export const mockFetchSpecifiedTweetFromSinceId = async (
  axiosTwiterClient: AxiosInstance,
  masterQuery: SinceIdAndQuery,
) => {
  return validateAsTweet([]);
};

export const mockFetchUndividedTweetMetaAscEndId = async (
  client: Client,
  masterQuery: SinceIdAndQuery,
) => {
  return validateOriginalTweetMetaFromPostgres([]);
};
export const fetchUndividedTweetMetaAscEndId = async (
  client: Client,
  masterQuery: SinceIdAndQuery,
) => {
  return validateOriginalTweetMetaFromPostgres(
    await client
      .query<OriginalTweetMetaFromPostgres>(
        `
SELECT
s3_bucket,
s3_region,
s3_key,
end_id
FROM
public.batch_twitter_search_users
WHERE
is_devided_into_30 = FALSE
AND twitter_user_id = $1
ORDER BY
twitter_user_id,
end_id ASC`,
        [masterQuery['twitter_user_id']],
      )
      .then((res) => res.rows),
  );
};
