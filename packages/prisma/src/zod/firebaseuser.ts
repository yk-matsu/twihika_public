import * as z from "zod"
import { CompleteFirebaseUserProvider, FirebaseUserProviderModel, CompleteFirebaseUserRole, FirebaseUserRoleModel, CompleteFirebaseUserTweetDrilledDown, FirebaseUserTweetDrilledDownModel, CompleteFirebaseUserTweetStock, FirebaseUserTweetStockModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const _FirebaseUserModel = z.object({
  createdAt: z.date(),
  customClaims: jsonSchema,
  disabled: z.boolean().nullish(),
  displayName: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.boolean().nullish(),
  id: z.string(),
  metadata: jsonSchema,
  multiFactor: jsonSchema,
  phoneNumber: z.string().nullish(),
  photoUrl: z.string().nullish(),
  updatedAt: z.date(),
})

export interface CompleteFirebaseUser extends z.infer<typeof _FirebaseUserModel> {
  firebaseUserProviders: CompleteFirebaseUserProvider[]
  firebaseUserRoles: CompleteFirebaseUserRole[]
  firebaseUserTweetDrilledDowns: CompleteFirebaseUserTweetDrilledDown[]
  firebaseUserTweetStocks: CompleteFirebaseUserTweetStock[]
}

/**
 * FirebaseUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const FirebaseUserModel: z.ZodSchema<CompleteFirebaseUser> = z.lazy(() => _FirebaseUserModel.extend({
  firebaseUserProviders: FirebaseUserProviderModel.array(),
  firebaseUserRoles: FirebaseUserRoleModel.array(),
  firebaseUserTweetDrilledDowns: FirebaseUserTweetDrilledDownModel.array(),
  firebaseUserTweetStocks: FirebaseUserTweetStockModel.array(),
}))
