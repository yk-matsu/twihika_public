import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient as PrismaClientLib } from '@twihika/prisma';

@Injectable()
export class PrismaClient extends PrismaClientLib implements OnModuleInit {
  constructor() {
    super({...{ log: ['query', 'info', 'warn', 'error'] }});
  }
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
