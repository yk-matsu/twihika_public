import * as z from "zod"
import { CompleteFirebaseUser, FirebaseUserModel } from "./index"

export const _FirebaseUserTweetDrilledDownModel = z.object({
  createdAt: z.date(),
  firebaseUserId: z.string().nullish(),
  id: z.string(),
  tweetId: z.string().nullish(),
  updatedAt: z.date(),
})

export interface CompleteFirebaseUserTweetDrilledDown extends z.infer<typeof _FirebaseUserTweetDrilledDownModel> {
  firebaseUser?: CompleteFirebaseUser | null
}

/**
 * FirebaseUserTweetDrilledDownModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const FirebaseUserTweetDrilledDownModel: z.ZodSchema<CompleteFirebaseUserTweetDrilledDown> = z.lazy(() => _FirebaseUserTweetDrilledDownModel.extend({
  firebaseUser: FirebaseUserModel.nullish(),
}))
