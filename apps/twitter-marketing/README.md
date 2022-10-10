## Twihika商標ログ

- ElasticSearchとイベントバス周りの遊び場

### 目次
- [ElasticSearchを使っている理由](#ElasticSearchを使っている理由)
- [検索周りの実装](#検索周りの実装)
- [検索周りのReactの実装](#検索周りのReactの実装)
  - [検索周りのReactの実装コンポーネント設計](#検索周りのReactの実装コンポーネント設計)
  - [検索周りのReactの実装コンポーネント設計一覧のTwitterカードコンポーネント](#検索周りのReactの実装コンポーネント設計一覧のTwitterカードコンポーネント)
  - [検索周りのReactの実装コンポーネント設計セミモーダルの検索絞り込みUIコンポーネント](#検索周りのReactの実装コンポーネント設計セミモーダルの検索絞り込みUIコンポーネント)


### ElasticSearchを使っている理由

SQLで頑張らずに楽に下記のような検索機能を実装するため。※あくまでイメージ、そこまでして作り込みたい要件が自分の個人開発にはなかった。

<img src="https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/docy.jpg" width="300" />

### 検索周りの実装

apiベースではなく、コードそのものをリポジトリで共有している。
というのも、管理画面から呼び出すものとユーザー向けのサービスで呼び出すものを分けると分けた分だけ、
どこで何が使われるのかわからない(調査コストが上がる)のでコードベースで処理を共有している。

最近のフロントの呼び方に合わせて、[queryとmutation](https://github.com/katakatataan/twihika_public/tree/main/packages/elasticsearch/src)でディレクトリを分けてる。


[日付絞り込みがある場合は、createdAtFilterパラメータと必須のqueryIdsを一緒に問い合わせる。](https://github.com/katakatataan/twihika_public/blob/main/packages/elasticsearch/src/queries/tweets.ts#L5-L166)



書き込みは、Nestjsでおこなっている。そこに複雑性を持たせることによって読み取りの処理を簡略化できる！

[データの取得元は、RDBでもS3でもレコメンド系のモデルでもよくて任意のリードモデルを作ることができる！](https://github.com/katakatataan/twihika_public/blob/main/apps/eventbus/src/handlers/handleSaveTweetFromS3ToElastic/index.ts#L152-L159)



読み取りで複雑性を持たせるデメリット。

・オバケクエリ(めっちゃ長いSQL)
・読み込みの改修が書き込みの改修にもろに影響を受けて改修しずらくなる

これがシステム開発のオーバーヘッドになっていく。生産性の低下ーーー。

これをやるには、CDC(Change Data Capture)かN分に一回のデータ取得処理が必要になる。
個人的にはCDCを安定させる方にコストかけた方がのちのちハッピーだと思う。


### 検索周りのReactの実装

こちらの記事を参考にして実装してみた。

https://zenn.dev/mutex/articles/react-query-state-mgmt

#### 検索周りのReactの実装コンポーネント設計


<img src="https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/TwitterMarketing.svg" width="600" />

##### 検索周りのReactの実装コンポーネント設計ページ全体のコンポーネント

[コンテキストの作成](https://github.com/katakatataan/twihika_public/blob/main/apps/twitter-marketing/pages/index.tsx#L101-L120)


データの取得結果や、リストの再更新するためのinvalidation関数をわたす。

参考にした記事にもあるように取得結果だけでなく、

[reactQueryをそのまま渡す。](https://github.com/katakatataan/twihika_public/blob/main/apps/twitter-marketing/pages/index.tsx#L188-L207)



##### 検索周りのReactの実装コンポーネント設計一覧のTwitterカードコンポーネント

一覧のカード系のコンポーネントも
[Contextを使用して](https://github.com/katakatataan/twihika_public/blob/main/apps/twitter-marketing/components/TwitterCard.tsx#L59-L74)
ContainerコンポーネントとPresentationalコンポーネントを表現



##### 検索周りのReactの実装コンポーネント設計セミモーダルの検索絞り込みUIコンポーネント


https://github.com/katakatataan/twihika_public/blob/main/apps/twitter-marketing/components/Semimodal.tsx#L68-L118
