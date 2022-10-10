import { handleSaveTweetFromS3ToElastic } from './handlers/handleSaveTweetFromS3ToElastic/index';
import { handleSaveTwitterTimeLineToS3 } from './handlers/handleSaveTwitterTimeLineToS3/index';
import { Controller, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import {
  createElasticClinet,
  createAxiosElasticClinet,
} from './infrastructure/elasticsearch_client';
import { createClient } from './infrastructure/postgres_client';
import { handleCreateWebReadModelElastic } from './handlers/handleCreateWebReadModelElastic';
import * as AWS from 'aws-sdk';
import { handleSaveRegisteredTwitterQuery } from './handlers/handleSaveRegisteredTwitterQuery';
import { handleSaveRegisteredUsersTwitterQuery } from './handlers/handleSaveRegisteredUserTwitterQuery';
import { handleSaveRegisteredUserTweetFromS3ToElastic } from './handlers/handleSaveRegisteredUserTweetFromS3ToElastic';

@Controller()
export class ScheduleHandler {
  @EventPattern(
    'https://sqs.ap-northeast-1.amazonaws.com/649194519350/evebus-twihi-1-notification-queue.fifo',
  )
  public async handleMessage(message: any): Promise<any> {
    return ""
  }
  @Post('/handleCreateWebReadModelElastic')
  public async handleCreateWebReadModelElastic(): Promise<string> {
    await handleCreateWebReadModelElastic(createElasticClinet());
    return 'ss';
  }

  @Post('/handleSaveTwitterTimeLineToS3')
  public async handleSaveTwitterTimeLineToS3(body): Promise<string> {
    const client = createClient( process.env.DEVELOPMENT_MODE == "local" ? { ssl: false, host: "localhost", database: "twilog"}: {});
    const s3 = new AWS.S3();

    try {
      await client.connect();
      await handleSaveTwitterTimeLineToS3(client, s3, body);
    } catch (error) {
      console.log(error);
    } finally {
      await client.end();
      return 'fi';
    }
  }

  @Post('/handleSaveRegisteredTwitterQuery')
  public async handleSaveRegisteredTwitterQuery(body): Promise<string> {
    const client = createClient( process.env.DEVELOPMENT_MODE == "local" ? { ssl: false, host: "localhost", database: "twilog"}: {});
    const s3 = new AWS.S3();
    const snsClient = new AWS.SNS();

    console.log("hello")
    try {
      await handleSaveRegisteredTwitterQuery(client, s3, snsClient);
    } catch (error) {
      console.log(error);
    }
    return 'sss';
  }
  @Post('/handleSaveRegisterdUserTweetFromS3ToElastic')
  public async handleSaveRegisterdUserTweetFromS3ToElastic(body): Promise<string> {
    const client = createClient( process.env.DEVELOPMENT_MODE == "local" ? { ssl: false, host: "localhost", database: "twilog"}: {});
    const s3 = new AWS.S3({ region: 'ap-northeast-1' });
    const axiosElsaticClient = createAxiosElasticClinet();

    try {
      await handleSaveRegisteredUserTweetFromS3ToElastic(client, s3, axiosElsaticClient);
    } catch (error) {
      console.log(error);
    }
    return 'ssassafds';
  }

  @Post('/handleSaveTweetFromS3ToElastic')
  public async handleSaveTweetFromS3ToElastic(body): Promise<string> {
    const client = createClient( process.env.DEVELOPMENT_MODE == "local" ? { ssl: false, host: "localhost", database: "twilog"}: {});
    const s3 = new AWS.S3({ region: 'ap-northeast-1' });
    const axiosElsaticClient = createAxiosElasticClinet();

    try {
      await handleSaveTweetFromS3ToElastic(client, s3, axiosElsaticClient);
    } catch (error) {
      console.log(error);
    }
    return 'ssassafds';
  }

  @Post('/handleSaveRegisteredUsersTwitterQuery')
  public async handleSaveUsersTweetFromS3ToElastic(body): Promise<string> {
    const client = createClient( process.env.DEVELOPMENT_MODE == "local" ? { ssl: false, host: "localhost", database: "twilog"}: {});
    const s3 = new AWS.S3();


    try {
      await handleSaveRegisteredUsersTwitterQuery(client, s3);
    } catch (error) {
      console.log(error);
    }
    return 'ssassafds';
  }
}
