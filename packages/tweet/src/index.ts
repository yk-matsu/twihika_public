import {TweeetLiteType, TweeetLiteV2Type} from "@twihika/types/twitter"
export const dataV1ToV2 = (data: TweeetLiteType): TweeetLiteV2Type => {
  return {
    id: data.id_str,
    text: data.full_text,
    author: {
      username: data.user.screen_name,
      profile_image_url: data.user.profile_image_url,
      name: data.user.name,
      verified: data.user.verified,
    },
    media: data.extended_entities?.media,
    polls: data.polls,
    created_at: data.created_at,
    public_metrics: {
      like_count : data.favorite_count,
      retweet_count: data.retweet_count,
    },
    referenced_tweets: null,
    video: data?.extended_entities?.media[0]?.video_info
  };
};