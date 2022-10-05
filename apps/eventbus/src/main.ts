import { initializeElasticSearch } from './bootstrap.elasticsearch';
import { NestFactory } from '@nestjs/core';
// import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { GCPubSubServer } from '@algoan/nestjs-google-pubsub-microservice';
import { AppModule } from './app.module';
import { SqsServer } from '@katakatataan/nestjs-sqs';
import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.TWI_HIKA_EVENT_BUS_AWS_ACCESS_KEY,
  secretAccessKey: process.env.TWI_HIKA_EVENT_BUS_AWS_SECRET_KEY,
  region: process.env.REGION,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port =  Number(process.env.EVENTBUS_PORT) || Number(process.env.PORT)  || 3000;

  await initializeElasticSearch();

  app.connectMicroservice({
    strategy: new SqsServer({
      consumerUrl: process.env.TWI_HIKA_EVENT_BUS_SQS!,
      producerUrl: process.env.TWI_HIKA_EVENT_BUS_SQS!,
      sqs: new AWS.SQS({
        apiVersion: '2012-11-05',
      }),
    }),
  });
  app.connectMicroservice({
    strategy: new GCPubSubServer({
      subscriptionsPrefix: 'nestjs',
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      ...{
        topicsNames: [
          process.env.DEVELOPMENT_MODE + "." + 'twihika.public.all',
          process.env.DEVELOPMENT_MODE + "." + 'twihika.application.eventbus',
          process.env.DEVELOPMENT_MODE + "." + 'twihika.application.user.signup',
          process.env.DEVELOPMENT_MODE + "." + 'twihika.application.user.delete',
          process.env.DEVELOPMENT_MODE + "." + 'twihika.prisma.Outbox',
        ],
      },
    }),
  });

  await app.startAllMicroservices();
  await app.listen(port, '0.0.0.0');
}

bootstrap();
