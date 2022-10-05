import { PubSub } from 'graphql-subscriptions';
// nestjsのDIだとうまく同一のobjectを参照してくれなくて、subscriptionが発火しなかった
export const pubsub = new PubSub()
