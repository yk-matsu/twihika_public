import { Module } from '@nestjs/common';
import { ConversationController } from './conversations.controller';
import { RawReadingsService } from './conversations.service';
import { ConversationRepository } from './conversatoin.repository';


@Module({
  providers: [RawReadingsService,ConversationRepository],
  controllers: [ConversationController],
  exports: [ConversationRepository]
})
export class ConversationModule {}