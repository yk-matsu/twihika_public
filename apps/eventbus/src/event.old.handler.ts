import { EmittedMessage } from '@algoan/pubsub';
import { createClient } from '@twihika/postgres';
import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { handleSaveTwitterTimeLineToS3 } from './handlers/handleSaveTwitterTimeLineToS3/index';
import { createElasticClinet } from './infrastructure/elasticsearch_client';
import { validateTwitterIntegrateed } from './types/eventValidator';
import { handleCreateWebReadModelElastic } from './handlers/handleCreateWebReadModelElastic';
import * as AWS from 'aws-sdk';
import { Event } from './types/event';

@Controller()
export class AppController {
  constructor() {}

  /**
   * Handle the test event
   * @param data Payload sent
   */
  @EventPattern(process.env.DEVELOPMENT_MODE + '.' + 'twihika.public.all')
  public async handleTestEvent(
    @Payload() data: EmittedMessage<any>,
  ): Promise<void> {
    console.log(data);
    const client = createClient(
      process.env.DEVELOPMENT_MODE == 'local'
        ? { ssl: false, host: 'localhost', database: 'twilog' }
        : {},
    );
    await client.connect();
    try {
      await client.query(
        'insert into tweet_bot_user (id) values($1)',
        [data.payload.payload.after.id],
      );
    } catch (error) {
      console.log(error);
      await client.end();
    }

    //     import crypto from 'crypto'
    // const md5hex = (str: string ) => {
    //   const md5 = crypto.createHash('md5')
    //   return md5.update(str, 'binary').digest('hex')
    // }
    // const sns = new AWS.SNS();
    // await sns
    // .publish({
    //   TopicArn: getenv("TWIHIKA_EVENTBUS_SNS_ARN"),
    //   MessageGroupId: md5hex(JSON.stringify(data.payload)),
    //   MessageAttributes: {
    //     type: {
    //       DataType: "String",
    //       StringValue: "twihika_public_all",
    //     },
    //   },
    //   Message: JSON.stringify({
    //     type: "twihika_public_all",
    //     resourceId: ulid(Date.now()),
    //     payload: data,
    //   }),
    // })
    // .promise();
    return;
  }

  @EventPattern(
    process.env.DEVELOPMENT_MODE + '.' + 'twihika.application.eventbus',
  )
  public async handleApplicationEvent(
    @Payload() data: EmittedMessage<Event>,
  ): Promise<void> {
    const myevent = data.payload as Event;
    const client = createClient(
      process.env.DEVELOPMENT_MODE == 'local'
        ? { ssl: false, host: 'localhost', database: 'twilog' }
        : {},
    );
    if (
      myevent.type == 'NEW_ELASTIC_TWITTER_USER_CREATED' ||
      myevent.type == 'NEW_ELASTIC_TWITTER_TWEET_CREATED'
    ) {
      await handleCreateWebReadModelElastic(
        createElasticClinet(),
        myevent.payload,
      );
    } else if (myevent.type == 'twihika_public_all') {
      // todo: implemente this
    } else if (myevent.type == 'REGISTERED_batch_twitter_search_queries') {
    } else if (myevent.type == 'TWITTER_INTEGRATED') {
      await client.connect();

      const payload = myevent.payload;
      validateTwitterIntegrateed(payload);

      await client.query(
        `
      INSERT INTO public.accounts (user_id, access_token, provider_account_id, provider_id, refresh_token, secret)
        VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (provider_id, provider_account_id, access_token, secret)
        DO UPDATE SET
          user_id = excluded.user_id
      `,
        [
          payload.userId,
          payload.accessToken,
          payload.providerAccountId,
          payload.providerId,
          payload.refreshToken,
          payload.secret,
        ],
      );

      await client.query(
        `INSERT INTO public.event (type, resource_id, payload)
          VALUES ($1, $2, $3)
      `,
        [myevent.type, payload.resourceId, payload],
      );

      const s3 = new AWS.S3();
      await handleSaveTwitterTimeLineToS3(client, s3, myevent);
      // } else if (myevent.type == 'GOOGLE_SIGNIN') {
      //   const payload = myevent.payload;
      //   validateSignedInWithGoogle(payload);

      //   await client.connect();
      //   await client.query(
      //     `
      //     INSERT INTO public.users (id, email)
      //       VALUES ($1, $2)
      //     ON CONFLICT (id)
      //       DO UPDATE SET
      //         email = excluded.email
      //     `,
      //     [payload.userId, payload.email],
      //   );

      //   await client.query(
      //     `INSERT INTO public.accounts (user_id,  provider_account_id, provider_id )
      //       VALUES ($1, $2, $3)
      //     ON CONFLICT (provider_id, provider_account_id)
      //       DO UPDATE SET
      //         user_id = excluded.user_id
      //   `,
      //     [payload.userId, payload.providerAccountId, payload.providerId],
      //   );

      //   await client.query(
      //     `INSERT INTO public.event (type, resource_id, payload)
      //     VALUES ($1, $2, $3)
      //     `,
      //     [myevent.type, payload.resourceId, myevent.payload],
      //   );

      //   const adminRows = await client.query(
      //     `
      //     SELECT
      //       *
      //     FROM
      //       admin_users_emails
      //     WHERE
      //       email = $1
      //     `,
      //     [payload.email],
      //   );
      //   if (adminRows.rows.length > 0) {
      //     const sleep = (millsec) => {
      //       return new Promise((resolve, reject) => {
      //         setTimeout(() => {
      //           resolve('');
      //         }, millsec);
      //       });
      //     };
      //     await sleep(5000);
      //     await app
      //       .auth()
      //       .setCustomUserClaims(payload.userId, {
      //         'https://hasura.io/jwt/claims': {
      //           'x-hasura-default-role': 'user',
      //           'x-hasura-allowed-roles': ['user'],
      //           'x-hasura-user-id': payload.userId,
      //         },
      //         admin: true,
      //       })
      //       .then(async () => {
      //         const res = await client.query(
      //           'update public.users set "is_admin" = true where id = $1',
      //           [payload.userId],
      //         );
      //         // The new custom claims will propagate to the user's ID token the
      //         // next time a new one is issued.
      //       });
      //   }
    }
    return;
  }
}
