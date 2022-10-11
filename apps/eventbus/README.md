## Twihikaイベントバス

![eventbusデモ](https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/Kapture%202022-10-11%20at%2000.34.122.gif)

Twihikaは細かいサービスを思いついた順に作っていくので、ときにはサービス間の連携が必要になる。
サービス間の連携を同期的に行うのは実装コストも高いので、DDDのマイクロサービスをRDBで実現させるときによくあるOutboxパターンで実現する。

とくに目的に合ったデータベースを使用して、アプリケーションの開発効率を上げたり、データのレプリケーションするときに非常に有効。


Nestjs実装おもろいなーって感じで、遊んでみたリストと実装リンク

### 目次

- [debeziumでCloud Pub/Subにpublishしてsubscribe](#debeziumでcloud-pubsubにpublishしてsubscribe)
- [firestoreをNestjs wayで使用してみた。](#firestoreをnestjs-wayで使用してみた)
- [Outboxパターンで取得したイベントをWebSocket(GraphQL Subscriptionで配信)](#outboxパターンで取得したイベントをwebsocketgraphql-subscriptionで配信)
- [CloudSchedulerでPostリクエストを送信する受け口。(ただのHttpRequest)](#cloudschedulerでpostリクエストを送信する受け口ただのhttprequest)
- [複数のAWS SQSをサブスクライブする機能を実装](#複数のaws-sqsをサブスクライブする機能を実装)
- [passportjsを使用したauthguardでfirebaseのtokenを検証](#passportjsを使用したauthguardでfirebaseのtokenを検証)

### debeziumでCloud Pub/Subにpublishしてsubscribe

Nestjsのmicroサービス機能を使って用途別に複数のpubsubをsubscribeする。

[実装リンク](https://github.com/katakatataan/twihika_public/blob/main/apps/eventbus/src/main.ts#L31-L45)

Outboxテーブルに保存されたイベントをsubscribeしている実装。

[実装リンク](https://github.com/katakatataan/twihika_public/blob/main/apps/eventbus/src/event.handler.ts#L79-L104)


### firestoreをNestjs wayで使用してみた。

firestore clientをmoduleとして登録

[実装リンク](https://github.com/katakatataan/twihika_public/blob/main/apps/eventbus/src/firestore/firestore.module.ts#L9-L41)

OnionArchitectureやCleanArchitectureをかじったことがある人からするとちょっと違和感があったけど、データアクセスclientは色々なmoduleから参照される可能性がある。
データアクセス用のclientのみのmoduleを作っておくのが一番良さそう。

firestoreを使った登録処理サンプル。
controllerとrepositoryは最低限分けて実装。

[controller実装リンク](https://github.com/katakatataan/twihika_public/blob/main/apps/eventbus/src/conversations/conversations.controller.ts)

[repository実装リンク](https://github.com/katakatataan/twihika_public/blob/main/apps/eventbus/src/conversations/conversatoin.repository.ts#L15-L36)

### Outboxパターンで取得したイベントをWebSocket(GraphQL Subscriptionで配信)

次の3つの実装が必要

1. [アプリケーション内部でイベントを経由する](https://github.com/katakatataan/twihika_public/blob/main/apps/eventbus/src/client.pubsub.ts#L1-L3)
2. [Cloud Pub/Subでサブスクライブして、1に流す](https://github.com/katakatataan/twihika_public/blob/main/apps/eventbus/src/event.handler.ts#L52-L56)
3. [２で一に流したイベントをGraphqlSubscriptionに流す。](https://github.com/katakatataan/twihika_public/blob/main/apps/eventbus/src/user-subscription/user.resolver.ts)

問題は、テスタブルにするために下記の箇所もProviderとして登録したかったが、うまくイベントの経由ができなくなってしまった。
```
import { PubSub } from 'graphql-subscriptions';
// nestjsのDIだとうまく同一のobjectを参照してくれなくて、subscriptionが発火しなかった
export const pubsub = new PubSub()
```
こういうとき便利なフレームワークは調査コストが高くつく。

### CloudSchedulerでPostリクエストを送信する受け口。(ただのHttpRequest)

https://github.com/katakatataan/twihika_public/blob/main/apps/eventbus/src/schedule.handler.ts#L24-L44


### 複数のAWS SQSをサブスクライブする機能を実装

OSSで公開されているものだと、基本一つのSQSしかサブスクライブできない設定だったのでフォークして少しだけ修正。

https://github.com/katakatataan/nestjs-sqs/commit/90b447a737a7480b784044c304cdda2f503d11d5
https://github.com/katakatataan/nestjs-sqs/commit/90b447a737a7480b784044c304cdda2f503d11d5

こちらを使用して、次のようにNestJsを実装。

https://github.com/katakatataan/twihika_public/blob/main/apps/eventbus/src/event.handler.ts#L106-L112


### Passportjsを使用したAuthGuardでfirebaseのTokenを検証


Cookieセッションを受け取って、userIdで権限を取得

```
import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {auth, FirebaseError} from 'firebase-admin';
import * as firebaseAdmin from 'firebase-admin';
// import {Strategy} from 'passport-http-bearer';
import {FirebaseService} from '../tw.firebase.service';
import {Request} from 'express';
import cookie from 'cookie';
import {Strategy, ExtractJwt} from 'passport-firebase-jwt';
import {PrismaService} from 'nestjs-prisma';

type DecodedIdToken = firebaseAdmin.auth.DecodedIdToken;
export type FirebaseAuthDecodedUser = Readonly<
  Pick<DecodedIdToken, 'uid' | 'email' | 'email_verified'>
>;

export const StrategyName = 'firebase-auth';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  StrategyName
) {
  private readonly checkRevoked = false;
  private readonly logger = new Logger(FirebaseAuthStrategy.name);

  constructor(
    private readonly firebase: FirebaseService,
    private readonly prisma: PrismaService
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        let jwt = null;

        if (req && req.headers.cookie) {
          jwt = cookie.parse(req.headers.cookie!)['__session'];
        }

        return jwt;
      },
    });
  }

  async validate(jwtToken: string): Promise<auth.UserRecord> {
    const payload = await this.authorize(jwtToken);
    const user = payload.firebase.tenant
      ? await this.firebase
          .getAuth()
          .tenantManager()
          .authForTenant(payload.firebase.tenant)
          .getUser(payload.uid)
      : await this.firebase.getAuth().getUser(payload.uid);
    if (user.disabled) {
      throw new ForbiddenException();
    }

    const userRoles = await this.prisma.firebaseUser.findFirst({
      select: {
        firebaseUserRoles: {
          select: {
            userRole: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    //@ts-ignore
    user.roles = userRoles?.firebaseUserRoles.map(role => {
      return role.userRole?.name;
    });

    return user;
  }

  private async authorize(jwtToken: string): Promise<DecodedIdToken> {
    try {
      return await this.firebase
        .getAuth()
        .verifySessionCookie(jwtToken, this.checkRevoked);
    } catch (err: unknown) {
      const e = err as FirebaseError;
      if (e.code === 'auth/id-token-expired') {
        this.logger.warn('auth/id-token-expired');
      } else if (e.code === 'auth/id-token-revoked') {
        this.logger.warn('auth/id-token-revoked');
      }

      throw new UnauthorizedException();
    }
  }
}

```

JwtのAuthGuardとして定義する。

```
import { AuthGuard } from "@nestjs/passport";

export class JwtAuthGuard extends AuthGuard("firebase-auth") {}

```


NestJsのhandlerの情報を取得してアクセスコントロール
```
import { Observable } from "rxjs";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { JwtAuthGuard } from "./jwt/tw.Auth.guard";

@Injectable()
export class DefaultAuthGuard extends JwtAuthGuard {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<any> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler()
    );

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}

```
