import * as z from "zod"
import { CompleteFirebaseUser, FirebaseUserModel } from "./index"

export const _FirebaseUserProviderModel = z.object({
  createdAt: z.date(),
  displayName: z.string().nullish(),
  email: z.string(),
  firebaseUserId: z.string(),
  id: z.string(),
  phoneNumber: z.string().nullish(),
  photoUrl: z.string().nullish(),
  providerId: z.string(),
  updatedAt: z.date(),
})

export interface CompleteFirebaseUserProvider extends z.infer<typeof _FirebaseUserProviderModel> {
  firebaseUser: CompleteFirebaseUser
}

/**
 * FirebaseUserProviderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const FirebaseUserProviderModel: z.ZodSchema<CompleteFirebaseUserProvider> = z.lazy(() => _FirebaseUserProviderModel.extend({
  firebaseUser: FirebaseUserModel,
}))
