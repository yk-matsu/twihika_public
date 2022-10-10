import type {NextApiRequest, NextApiResponse} from 'next';
import {decodeFromSessinoCokie} from '@twihika/auth';
import {prisma, _TweetV2Model} from '@twihika/prisma';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'GET') {
    const {decoded} = await decodeFromSessinoCokie(req);
    if (!decoded) {
      return res.status(200).json([]);
    }
    const data = await prisma?.firebaseUserTweetDrilledDown.findMany({
      where: {
        firebaseUserId: decoded!.uid,
      },
      select: {
        tweetId: true,
      },
    });
    return res.status(200).json(data.map(item => item.tweetId));
  }
}
