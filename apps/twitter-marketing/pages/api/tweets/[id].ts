import type {NextApiRequest, NextApiResponse} from 'next';
import {csrf} from '@twihika/share';
import {
  DeleteFromTweetsService,
  createElasticClinet,
} from '@twihika/elasticsearch';
import * as z from 'zod';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != 'DELETE') return res.status(400);
  // await csrf(req, res);
  const {id} = req.query;
  const query = z.string().safeParse(id);

  if (!query.success) {
    return res.status(400).send({
      ...query.error,
    });
  }

  await new DeleteFromTweetsService(createElasticClinet()).execute({
    tweetIds: [query.data],
  });
  // @ts-ignore
  res.status(200).json();
}
