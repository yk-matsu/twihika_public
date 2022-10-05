import { RegisteredTweetMeta } from '../handlers/schedule/SaveRegisterdTwiterQuery/output_validator';
/**
 * every event has a following structure:
 *
 *  {
 *    type: string
 *    timestamp: number
 *    payload: object
 *  }
 *
 *  That type is created using
 *  "Events" which is passed in "CreateEventUnion" type
 */
export type Event = CreateEventUnion<Events>

interface TwitetrIntergrated {
  resourceId: string
  userId: string
  accessToken: string
  providerAccountId: string
  refreshToken?: string | null
  providerId: string
  secret: string
}

interface SignedInWIthGoogle {
  resourceId: string
  userId: string
  email: string
  providerAccountId: string
  providerId: string
}
interface NEW_ELASTIC_TWITTER_USER_CREATED {
  resourceId: string
  userId: string
  s3_bucket: string
  s3_key: string
  query_id: number
}

export type Events = {
  TWITTER_INTEGRATED: TwitetrIntergrated
  GOOGLE_SIGNIN: SignedInWIthGoogle
  NEW_ELASTIC_TWITTER_USER_CREATED: NEW_ELASTIC_TWITTER_USER_CREATED,
  NEW_ELASTIC_TWITTER_TWEET_CREATED: NEW_ELASTIC_TWITTER_USER_CREATED,

  LINK_RATED: {
    userId: string
    linkId: string
    linkUrl: string
    rating: number
  }
  LINK_TAGGED: {
    userId: string
    linkId: string
    linkUrl: string
    tags: string[]
  }
  LINK_TITLE_UPDATED: {
    userId: string
    linkId: string
    linkUrl: string
    title: string
  }
  LINK_IMAGE_UPDATED: {
    userId: string
    linkId: string
    linkUrl: string
    image: string
  }
  USER_FOLLOWED: {
    userId: string
    followedUserId: string
  }
  USER_UNFOLLOWED: {
    userId: string
    unfollowedUserId: string
  },
  CREATE_ORDER: {
    orderId: string
  },
  CREATE_TWEET: any,
  BLOCK_TWEET_USER: {
    userId: string,
    blockUserId: string,
  },
  REGISTERED_batch_twitter_search_queries: RegisteredTweetMeta[],
  UNBLOCK_TWEET_USER: {
    userId: string,
    unBlockUserId: string,
  },
  twihika_public_all: any
}

// Obj[keyof Obj] => USER_FOLLOEWED | USER_UNFOLLOWRD | something
type ConvertObjectToUnion<Obj extends object> = Obj[keyof Obj]
type CreateEventUnion<Events> = ConvertObjectToUnion<
  {
    [P in keyof Events]: {
      type: P
      timestamp?: number // optional since it is added automatically
      committedAt?: number
      payload: Events[P]
    }
  }
>
