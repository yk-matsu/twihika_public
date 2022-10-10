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

- [Chrome拡張:文章内の単語頻出度チェック](#chrome拡張文章内の単語頻出度チェック)
- [Chrome拡張:開発用のfirebase認証トークンの取得](#chrome拡張開発用のfirebase認証トークンの取得)
- [Chrome拡張:タイムトラッキングアップ](#chrome拡張タイムトラッキングアップ)

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

### Chrome拡張:文章内の単語頻出度チェック

<img src="https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/Chrome-logo.png" width="100" />

SEO系の記事を書くときに競合の単語を抜き取り、その頻出度から自分の記事のリライトするためのちょっとしたツール。

![Chrome拡張:文章内の単語頻出度チェックデモ](https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/Kapture%202022-10-10%20at%2002.55.54.gif)

#### Chrome拡張:文章内の単語頻出度チェック:使用されている技術

- TypeScript
- jQuery
- elasticsearch

#### Chrome拡張:文章内の単語頻出度チェック:実装されている機能

- コンテキストメニューを使った機能(右クリックで選択した文をサーバーに送信)
- サーバーから取得した結果を画面に表示

[コードベースの詳細はこちら](/chrome-extension)


## Chrome拡張:開発用のfirebase認証トークンの取得

OneLoginとか、OktaのChrome拡張のように、認証したトークンなどを付与してリクエストする簡易的な仕組みを考える。

・FirebaseのCookieベースと連携したTokenの場合
・FirebaseのlocalStorageと連携したTokenの場合

![firebase demo](https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/Kapture%202022-10-10%20at%2013.53.31.gif)

[コードベースの詳細はこちら](/chrome-extension)


### Chrome拡張:タイムトラッキングアップ

![notification demo](https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/notification.png)

前職でやっていた日時採算が激しくめんどくさかったので、それを効率化するアプリ。
めんどくさい、n分ごとに何をしていたかを、

- Salesforceを開く
- Salesforceにログインする
- やっていた作業を選択する
- やっていた時間を入力する
- 登録する。

しかも、作業の選択と登録のUIがいけてなかった。

[コードベースの詳細はこちら](/chrome-extension)

