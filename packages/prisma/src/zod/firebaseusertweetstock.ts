import * as z from "zod"
import { CompleteFirebaseUser, FirebaseUserModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const _FirebaseUserTweetStockModel = z.object({
  createdAt: z.date(),
  firebaseUserId: z.string().nullish(),
  id: z.string(),
  tweetId: z.string().nullish(),
  tweetRaw: jsonSchema,
  updatedAt: z.date(),
})

export interface CompleteFirebaseUserTweetStock extends z.infer<typeof _FirebaseUserTweetStockModel> {
  firebaseUser?: CompleteFirebaseUser | null
}

/**
 * FirebaseUserTweetStockModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const FirebaseUserTweetStockModel: z.ZodSchema<CompleteFirebaseUserTweetStock> = z.lazy(() => _FirebaseUserTweetStockModel.extend({
  firebaseUser: FirebaseUserModel.nullish(),
}))
