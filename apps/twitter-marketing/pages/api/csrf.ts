import type { NextApiRequest, NextApiResponse } from 'next'
import { csrf } from "@twihika/share"
export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  await csrf(req!, res!);
  res.status(200).json({ token: req.csrfToken() })
}