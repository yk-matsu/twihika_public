import * as z from "zod"
import { CompleteFirebaseUser, FirebaseUserModel, CompleteUserRole, UserRoleModel } from "./index"

export const _FirebaseUserRoleModel = z.object({
  createdAt: z.date(),
  firebaseUserId: z.string().nullish(),
  id: z.string(),
  updatedAt: z.date(),
  userRoleId: z.string().nullish(),
})

export interface CompleteFirebaseUserRole extends z.infer<typeof _FirebaseUserRoleModel> {
  firebaseUser?: CompleteFirebaseUser | null
  userRole?: CompleteUserRole | null
}

/**
 * FirebaseUserRoleModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const FirebaseUserRoleModel: z.ZodSchema<CompleteFirebaseUserRole> = z.lazy(() => _FirebaseUserRoleModel.extend({
  firebaseUser: FirebaseUserModel.nullish(),
  userRole: UserRoleModel.nullish(),
}))
