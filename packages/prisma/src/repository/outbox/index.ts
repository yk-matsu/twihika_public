import {_OutboxModel} from './../../zod/outbox';
import {PrismaClient} from '@prisma/client';
import {z} from 'zod';
import cuid from 'cuid';
import {Entity, Result} from '../../shared';

type OutboxProps = z.infer<typeof _OutboxModel>;

export class OutboxEntity extends Entity<OutboxProps> {
  constructor(props: OutboxProps) {
    super(props);
  }
  public reconstruct(): Result<OutboxEntity> {
    const result = _OutboxModel.safeParse(this.props);

    if (result.success) {
      return Result.ok(this);
    }
    return Result.fail(result.error);
  }
}

export class OutboxRepository {
  public static providerName = 'outboxRepository';
  constructor(private prisma: PrismaClient) {}

  public async save(outbox: OutboxEntity) {
    console.log(outbox.props);
    const res = await this.prisma.outbox.create({
      data: {
        id: outbox.props.id,
        aggregateId: outbox.props.aggregateId,
        aggregateType: outbox.props.aggregateType,
        eventType: outbox.props.eventType,
        payload: outbox.props.payload,
        createdAt: outbox.props.createdAt,
        updatedAt: outbox.props.updatedAt,
      },
    });
    console.log(res)
  }
}
