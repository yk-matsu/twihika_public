import type {NextApiRequest, NextApiResponse} from 'next';
import {decodeFromSessinoCokie} from '@twihika/auth';
import {prisma, TweetDrilledDownAggregate, TweetDrilledDownRepository, TweetV2Entity, _TweetV2Model} from '@twihika/prisma';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'GET') {
    const {decoded} = await decodeFromSessinoCokie(req);
    console.log(decoded)
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
  if (req.method == 'POST') {
    const {decoded} = await decodeFromSessinoCokie(req);
    if (!decoded) {
      return res.status(400).send({
        message: 'unauthenticated',
      });
    }

    const body = await _TweetV2Model.safeParse(JSON.parse(req.body));
    if (!body.success) {
      return res.status(400).send({
        ...body.error,
      });
    }

    const entity = new TweetV2Entity(JSON.parse(req.body));
    const agg = new TweetDrilledDownAggregate(entity, decoded!.uid);
    const repo = new TweetDrilledDownRepository(prisma!);
    await repo.save(agg);

    return res.status(200).json({});
  }
}
