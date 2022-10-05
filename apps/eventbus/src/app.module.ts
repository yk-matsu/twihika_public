import { Module } from '@nestjs/common';
import { AppController } from './event.old.handler';
import { ScheduleHandler } from './schedule.handler';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'path';
import { UserHandler } from './event.handler';
import { PrismaClient } from './client.prisma';
import { UserRepository } from './user.repository';
import { FirebaseClient } from './client.firebase';
import { UserModule } from './user-subscription/user.module';
import { app } from '@twihika/auth';
import { FirestoreModule } from './firestore/firestore.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConversationModule } from './conversations/conversations.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql',
          onConnect: async (connectionParams) => {
            const authToken = connectionParams.authToken;
            const decoded = await app.auth().verifyIdToken(authToken);
            console.log(decoded);
            return { userId: decoded.uid };
          },
        },
      },
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        keyFilename: configService.get<string>('GOOGLE_APPLICATION_CREDENTIALS'),
      }),
      inject: [ConfigService],
    }),
    ConversationModule,
    // GraphQL系はこの中に入れていかないと動作しない。
    UserModule,
  ],
  controllers: [AppController, ScheduleHandler, UserHandler],
  providers: [PrismaClient, UserRepository, FirebaseClient],
})
export class AppModule {}
