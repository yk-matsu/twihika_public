import { Event } from '../../types/event'

export const createBlockTweetUserEvent = ({
  userId,
  blockUserId
}): Event[] => {

  return [
    {
      type: 'BLOCK_TWEET_USER',
      payload: {
        userId,
        blockUserId,
      }
    }
  ]
}

export const createUnBlockTweetUserEvent = ({
  userId,
  unBlockUserId,
}): Event[] => {

  return [
    {
      type: 'UNBLOCK_TWEET_USER',
      payload: {
       userId,
       unBlockUserId,
      }
    }
  ]
}
