## TwihikaId基盤フロント

- Twihika関連で使用するCookieを作るただそれだけの役割。

### 機能実装箇所

firebaseを使っているよということ以外ない。。。
あえていうなら、やはりセキュリティ面を考えたときにCookieを使いたいのでfirebaseの機能でそれを実装したところ。


web以外であれば、tokenをスマホに保存するのもそこまで抵抗ないけれど、webはjsがブラウザ上で実行されて盗み取られることを考えるとcookieが一番コスパ良い。
accessTokenが短命でrefreshTokenに交換する仕組みを考えるのも面倒。別のドメインで、シームレスにtokenを共有する仕組みを考えるのも大変。

- [Googleを使ったログイン(FirebaseAuthentication)](https://github.com/katakatataan/twihika_public/blob/main/apps/id/components/OAuthButtonGroup.tsx#L29-L69)
- [メールアドレスでのログイン(FirebaseAuthentication)](https://github.com/katakatataan/twihika_public/blob/main/apps/id/components/new_login.tsx#L50-L86)
- [パスワードリセット(FirebaseAuthentication)](https://github.com/katakatataan/twihika_public/blob/main/apps/id/pages/password_reset.tsx#L67-L84)
- [メールアドレスでの新規登録(FirebaseAuthentication)](https://github.com/katakatataan/twihika_public/blob/main/apps/id/components/register.tsx#L49-L76)
- [CookieベースでトップレベルのドメインでJwtSessionを共有](https://github.com/katakatataan/twihika_public/blob/main/apps/id/pages/api/session.ts#L85-L109)
- [リダイレクトURLの検証とリダイレクト](https://github.com/katakatataan/twihika_public/blob/main/apps/id/pages/api/session.ts#L118-L123)


