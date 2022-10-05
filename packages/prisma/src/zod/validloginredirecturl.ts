import * as z from "zod"

export const _ValidLoginRedirectUrlModel = z.object({
  createdAt: z.date(),
  id: z.string(),
  pattern: z.string().nullish(),
  updatedAt: z.date(),
})
