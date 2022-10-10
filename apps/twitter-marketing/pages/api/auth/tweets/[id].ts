import type {NextApiRequest, NextApiResponse} from 'next';
import * as z from 'zod';
import {decodeFromSessinoCokie} from '@twihika/auth';
import {OutboxEntity, OutboxRepository, prisma} from '@twihika/prisma';
import cuid from 'cuid';
import { createElasticClinet, DeleteFromTweetsService } from '@twihika/elasticsearch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != 'DELETE') return res.status(400);
  const {decoded} = await decodeFromSessinoCokie(req).catch();
  if (!decoded) {
    return res.status(401).json({code: 'unauthenticated'});
  }
  const {id} = req.query;
  const query = z.string().safeParse(id);

  if (!query.success) {
    return res.status(400).send({
      ...query.error,
    });
  }
  // optimisticに制御して、その後にs3とかを削除しに行く
  await new DeleteFromTweetsService(createElasticClinet()).execute({
    tweetIds: [query.data],
  });
  const outbox = new OutboxEntity({
    id: cuid(),
    aggregateId: query.data,
    aggregateType: "Tweet",
    createdAt: new Date(),
    updatedAt: new Date(),
    payload: {},
    eventType: 'TweetDeleted',
  });
  const result = outbox.reconstruct()
  if(result.isFailure) {
    console.error(result.error)
  }

  const repository = new OutboxRepository(prisma)
  await repository.save(result.getValue()!)

  res.status(200).json({});
}
