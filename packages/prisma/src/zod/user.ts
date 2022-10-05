import * as z from "zod"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const _UserModel = z.object({
  createdAt: z.date(),
  firstName: z.string().nullish(),
  id: z.string(),
  lastName: z.string().nullish(),
  password: z.string(),
  roles: jsonSchema,
  updatedAt: z.date(),
  username: z.string(),
})
