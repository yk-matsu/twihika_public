// ここはaggregationに該当するところだから別にいいよな
// idの生成を遅らせるなら任意になるよな
export type Tweet = {
  tweetId?: string
  userId?: string
  text?: string
  name?: string
  screen_name?: string
  urls?: {
    url: string,
    expanded_url: string,
    display_url: string,
    indices: number[]
  }[]
  hashtags?: {
    text: string,
    indices: number[],
  }[]
  createdAt?: string
}
