# twi_hika.com

![twitter-marketing](https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/penguine_twitter_marketing%20(1).png)![twihika-id](https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/penguine_id_logo.png)<img src="https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/Chrome-logo.png" width="100" />


以下TwiHikaは私の作っているサービスのブランド名(?)です（w)

自分で使うツールやスニペットを再利用可能な単位で分割してmonorepoで開発してます。

※ 個人開発なので、実務で使うコードの半分くらいのクオリティで書かれている前提で見てください。絶賛リファクタ中。

## 目次

- [サービス全体像](#サービス全体像)
- [twitter商標ログtwitter-marketing](#twitter商標ログtwitter-marketing)
  - [twitter商標ログtwitter-marketing(コードベース)](/apps/twitter-marketing)
  - [demo](https://twitter-marketing.twi-hika.com)

- [twihikaidフロント基盤](#twihikaidフロント基盤)
  - [twihikaidフロント基盤(コードベース)](/apps/id)
  - [demo](https://id.twi-hika.com)

- [twihikaイベントバスNestjs](#twihikaイベントバスNestjs)
  - [twihikaidイベントバスNestjs(コードベース)](/apps/eventbus)


## サービス全体像

実現したかったシステム

- ログインやユーザー管理は中央集権的に行いたいので、GoogleやTwitter、KeyCloakをIdProviderとして各サービスに対してユーザー情報を共有する。FirebaseAuthentication事態がStorageなので楽。

- 個人開発でminimalな機能を持ったサービスをリリースしていきたいので、1サービス１ドメインで別のソースを参照してます。

- 共通する処理などはmonorepoでソースコードを共有する仕組み。

- バッチ処理を書くと大体オーバーヘッド高くなったり、バッチ処理の順番の制御など暗黙知が多くなるのでChange Data Captureベースを中心としたシステム間の連携。

![twihika](https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/twihikaall_over.svg)


## デモ一覧とサマリー

![twitter-marketing](https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/penguine_twitter_marketing%20(1).png)

### Twitter商標ログ(twitter-marketing)
- [demo service link](https://twitter-marketing.twi-hika.com)


![Twitter商標ログdemo動画](https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/Kapture%202022-10-10%20at%2002.18.08.gif)

#### Twitter商標ログ:使用されている技術

- Prisma
- Next.js
- TanStack(旧React Query)
- ElasticSearch
- Debezium
- RDB(CloudSQL)
- Hasura
- ChakraUI

#### Twitter商標ログ:実装されている機能

##### Twitter商標ログ:ログイン済みユーザー向けの機能

- tweetの除外機能 (対象のツイートのみの除外、特定のユーザーが投稿したツイート全ての除外)
  - ひとこと: 除外機能は、動機的に削除するのはElasticSearchのデータのみで、あとは、非同期に削除できる場所を用意。
- 検索機能（ページング、日付絞り、取得したカテゴリベースの検索)
  - ひとこと：elasticsearchで検索用のリードモデルを作成しているの要件次第で柔軟な検索を作ることができる。

##### Twitter商標ログ:ログインしてないユーザー向けの機能

- ログインしてない場合に除外機能のボタンを押すと、クライアントサイドでリダレクトする。他はログインユーザーへの提供機能に同じ

[コードベースの詳細はこちら](/apps/twitter-marketing)



### TwiHikaIdフロント基盤

![twihika-id](https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/penguine_id_logo.png)


- [demo service link](https://id.twi-hika.com)


![TwiHikaIDフロント基板demo動画](https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/Kapture%202022-10-10%20at%2002.02.44.gif)

#### TwiHikaIdフロント基盤:使用されている技術

- Prisma
- Next.js
- RDB(CloudSQL)
- Firebase Authentication
- CloudFunctions
- ChakraUI


#### TwiHikaIdフロント基盤:実装されている機能

- Googleを使ったログイン(FirebaseAuthentication)
- メールアドレスでのログイン(FirebaseAuthentication)
- KeyCloakを使ったOIDCログイン(サービス管理者)(FirebaseAuthentication)
- パスワードリセット(FirebaseAuthentication)
- メールアドレスでの新規登録(FirebaseAuthentication)
- CookieベースでトップレベルのドメインでJwtSessionを共有
- リダイレクトURLの検証とリダイレクト

[コードベースの詳細はこちら](/apps/id)


### twihikaイベントバスNestjs

insertして、eventbusの標準出力にイベントが送信されているところ。
![eventbusデモ](https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/Kapture%202022-10-11%20at%2000.34.122.gif)


[コードベースの詳細はこちら](/apps/eventbus)


