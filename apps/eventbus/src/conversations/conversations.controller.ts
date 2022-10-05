import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateConversationDto, RawReadingsService } from './conversations.service';


@Controller()
export class ConversationController {
  constructor(private readonly collection: RawReadingsService) {}

  @Get('/conversations/:conversationId')
  public async conversations(
    @Param('conversationId') conversationId: string,
  ): Promise<any> {
    return await this.collection.findById({ conversationId });
  }

  @Post('/conversations')
  public async create(@Body() body: CreateConversationDto): Promise<any> {
    return await this.collection.save(body)
  }
}
