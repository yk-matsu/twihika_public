type Text = string;
type TweetId = string;
type User = {
  id_str: string;
  screen_name: UserName;
  name: string;
  profile_image_url: ProfileImageUrl;
    verified: boolean;
};

type UserName = string;

type Poll = any;
type Media = {
  type: string;
  media_url_https?: string;
  video_info?: Video
};
type CreatedAt = any;

type ProfileImageUrl = any;
type FavoriteCount = number;
type RetweetCount = number;
type PublicMetrics = {
  like_count: FavoriteCount;
  retweet_count: RetweetCount;
};

type Video = {
  duration_millis?: number;
  aspect_ratio: number[];
  variants: {
    content_type: string;
    url: string;
    bitrate?: number;
  }[];
};

export interface TweeetLiteType {
  id_str: TweetId;
  full_text: Text;
  user: User;
  extended_entities?: {
    media: Media[];
  };
  polls?: Poll;
  created_at: CreatedAt;
  favorite_count: FavoriteCount;
  retweet_count: RetweetCount;
}

export interface TweeetLiteV2Type {
  id: TweetId;
  text: Text;
  author: {
    username: UserName;
    profile_image_url: ProfileImageUrl;
    name: string;
    verified: boolean;
  };
  media?: Media[];
  polls?: Poll;
  created_at: CreatedAt;
  public_metrics: PublicMetrics;
  referenced_tweets: null,
  video?: Video;
}

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
