import * as z from "zod"

export const _TwitterBotUserModel = z.object({
  createdAt: z.date(),
  id: z.string(),
  updatedAt: z.date(),
})
