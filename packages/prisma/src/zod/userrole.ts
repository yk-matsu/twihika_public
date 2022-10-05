import * as z from "zod"
import { CompleteFirebaseUserRole, FirebaseUserRoleModel } from "./index"

export const _UserRoleModel = z.object({
  createdAt: z.date(),
  id: z.string(),
  name: z.string().nullish(),
  updatedAt: z.date(),
})

export interface CompleteUserRole extends z.infer<typeof _UserRoleModel> {
  firebaseUserRoles: CompleteFirebaseUserRole[]
}

/**
 * UserRoleModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const UserRoleModel: z.ZodSchema<CompleteUserRole> = z.lazy(() => _UserRoleModel.extend({
  firebaseUserRoles: FirebaseUserRoleModel.array(),
}))
