import { Event } from '../../types/event'
import { Tweet } from './tweet'
import dayjs from'dayjs';

dayjs.locale('ja');

export type UserFollowing = Record<string, boolean>

export const reducerVersion = 1
export const reducerId = 'snapshot-from-event-to-tweet-reducer'
export function fromEventToTweetReducer(
  events: Event[],
  initialState = {}
): Tweet {
  return events.reduce((acc, e: Event) => {
    switch (e.type) {
      case 'CREATE_TWEET':
        return {
          ...acc,
          tweetId: e.payload.id.toString(),
          userId: e.payload.user.id.toString(),
          text: e.payload.text,
          name: e.payload.user.name,
          screen_name: e.payload.user.screen_name,
          urls: e.payload.entities.urls,
          hashtags: e.payload.entities.hashtags,
          createdAt: dayjs(e.payload.created_at).toDate().toString()
        }
      default:
        return acc
    }
  }, initialState)
}
