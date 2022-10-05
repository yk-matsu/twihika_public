// import { Event } from '../../types/event'

// export const reducerVersion = 3
// export const reducerId = 'snapshot-from-event-to-block-tweet-user-reducer'

// export function fromEventToBlockTweetUserReducer(
//   events: Event[],
//   initialState = { blockTweetUserIds: [] }
// ): { blockTweetUserIds: string[] } {
//   return events.reduce((acc, e: Event) => {
//     console.log(acc)
//     console.log(e)
//     switch (e.type) {
//       case 'BLOCK_TWEET_USER':
//         return {
//           blockTweetUserIds: acc.blockTweetUserIds.includes(e.payload.blockUserId) ? acc.blockTweetUserIds : [...acc.blockTweetUserIds, e.payload.blockUserId]
//         }
//       case 'UNBLOCK_TWEET_USER':
//         return {
//           blockTweetUserIds: acc.blockTweetUserIds.filter(blockUserId => blockUserId !== e.payload.unBlockUserId)
//         }
//       default:
//         return acc
//     }
//   }, initialState)
// }
