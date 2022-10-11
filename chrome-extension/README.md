自分用の時短ツールです！ソース？テスト?何それってくらいの勢いで作る。

## Chrome拡張:使用技術

- TypeScript
- ChakraUI
- jQuery
- esbuild

## 目次

- [Chrome拡張:文章内の単語頻出度チェック](#chrome拡張文章内の単語頻出度チェック)
  - [Chrome拡張:文章内の単語頻出度チェック:実装](#chrome拡張文章内の単語頻出度チェック実装)
- [Chrome拡張:開発用の認証トークンの作成](#chrome拡張開発用のfirebase認証トークンの取得)
  - [Chrome拡張:開発用のfirebase認証トークンの取得:実装](#chrome拡張開発用のfirebase認証トークンの取得実装)
- [Chrome拡張:WIP タイムトラッキングアップ](#chrome拡張タイムトラッキングアップ)
  - [Chrome拡張:タイムトラッキングアップ:実装](#chrome拡張タイムトラッキングアップ実装)


### Chrome拡張:文章内の単語頻出度チェック

コピーしてペースとして、単語の頻出度を確認するという。ステップを省略するためのツール。

![Chrome拡張:文章内の単語頻出度チェックデモ](https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/Kapture%202022-10-10%20at%2002.55.54.gif)

#### Chrome拡張:文章内の単語頻出度チェック:実装

コンテキストメニューを使った機能(右クリックで選択した文をサーバーに送信)

文章選択時に右クリックで拡張を呼び出す設定を有効化
```background.ts
const parent = chrome.contextMenus.create({
  id: "share",
  title: "コピーテキスト",
  contexts: ["selection"],
});
```

コンテキストメニューから拡張を呼び出したときに呼び出す機能
```background.ts
chrome.contextMenus.onClicked.addListener(async(info, tab) => {
  // navigator.clipboard.writeText(info.selectionText!);
  chrome.tabs.query({ active: !0, currentWindow: !0 }, async function (e) {
    // localのelasticsearchにデータを保存
    const regist = await fetch(`http://localhost:9200/test/_doc`, {
      method: 'POST',
      body: JSON.stringify({
        "full_text" :info.selectionText
      }),
      headers: { 'content-type': 'application/json', 'Authorization': "ApiKey APIKEY" },
    });
    const id = await regist.json().then((res) => res["_id"])
    const res = await fetch(`http://localhost:9200/test/_mtermvectors`, {
      method: 'POST',
      body: JSON.stringify({
        "ids" : [id],
        "parameters": {
            "fields": ["full_text"],
            "term_statistics": true,
            "offsets":false,
            "payloads":false,
            "positions":false
        }
      }),
      headers: { 'content-type': 'application/json', 'Authorization': "ApiKey APIKEY" },
    });
    // 保存した単語の頻出度を取得
    const sample = await res.json().then(result => result.docs[0].term_vectors.full_text.terms )
    const arr = Object.keys(sample).map((key)=> {
      return {word: key,...sample[key]}
    })
    chrome.tabs.sendMessage(tab?.id!, {
      action: "dlTranslateSelectionRightClick",
      body: arr
    });
  });
  console.log(info)
  console.log(tab)
});
```

background.tsから送信したイベントをフロントのコードで取得
```content.js
const addDocument = (content: any) => {
  $('body').prepend(
    '<div style="position: fixed; top=0;font-size=100px; z-index: 100000; right:0px;"><main id="twihika-main"></main></div>'
  );
  const main = document.getElementById('twihika-main');
  const root = createRoot(main!);
  root.render(<App sample={content} />);
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  let selection;
  // console.log(request.message); // -> 選択範囲ちょうだい が出力される
  console.log(request); // -> 選択範囲ちょうだい が出力される
  addDocument(request.body)

  sendResponse(selection);
});
```

サクッと2,3時間でできたので、サーバーと通信して業務効率化が図れる領域はすごく楽。firebaseAuthenticationと組み合わせるとこで認証もかけることが可能。

## Chrome拡張:開発用のfirebase認証トークンの取得

OneLoginとか、OktaのChrome拡張のように、認証したトークンなどを付与してリクエストする簡易的な仕組みを考える。

・FirebaseのCookieベースと連携したTokenの場合
・FirebaseのlocalStorageと連携したTokenの場合

![firebase demo](https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/Kapture%202022-10-10%20at%2013.53.31.gif)
## Chrome拡張:開発用のfirebase認証トークンの取得:実装

Chromeのpopupと連携して処理を実行する。
```popup.tsx
const Popup: React.VFC = () => {
  const [value, setValue] = useState()
  const [list, setList] = useState<any[]>([])
  const handleGoogleLogin = () => {
    chrome.runtime.sendMessage({ name: 'login-with-goole' }, (response) => {
      if (response.status !== '200') {
        console.error('Error on login request', response.error);
        alert(response.error);
        return;
      }
      console.log('Login succeeded:', response.user);
    });
  };
```

Chromeのpopup.tsxからのイベントを受け取る
```background.tsx
chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.name === 'login-with-goole') {
    // Login request.

    const app = initializeApp({
      ...secret,
    });
    const auth = getAuth(app);
    auth.tenantId = 'tenantid';
    const authProvider = new GoogleAuthProvider();
    authProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    const sessionCookie = await signInWithPopup(auth, authProvider)
      .then(async (result): Promise<Session> => {
        const user = result.user;
        const status = '200';
        sendResponse({ user, status });
        const idToken = await result.user?.getIdToken();
        const [providerData] = result.user.providerData.filter(
          (item) => item.providerId == 'google.com'
        );
        return {
          idToken,
          providerAccountId: providerData?.uid,
          providerId: providerData?.providerId,
          uid: result.user.uid,
          email: result.user.email!,
        };
      })
      .then(registerSessionToken)
      .catch((error) => {
        console.log(error);
        if (error.code == 'auth/email-already-in-use') {
        }
        if (error.code === 'auth/account-exists-with-different-credential') {
          alert(
            'You have already signed up with a different auth provider for that email.'
          );
          const status = '400';
          sendResponse({ error, status });
        }
      });
     // このAPIを有効化してCookieに書き込みが可能。
    chrome.cookies.set({
      url: 'http://localhost:3000',
      name: '__session',
      value: sessionCookie as any as string,
    });
```

### Chrome拡張:タイムトラッキングアップ

前職でやっていた日時採算が激しくめんどくさかったので、それを効率化するアプリ。
めんどくさい、n分ごとに何をしていたかを、

- Salesforceを開く
- Salesforceにログインする
- やっていた作業を選択する
- やっていた時間を入力する
- 登録する。

しかも、作業の選択と登録のUIがいけてなかった。

Pushベースで何をしていたか聞いてくれるアプリを作ることで、
- n分ごとに通知。(n分の時間レンジを選択する必要がなくなる。salesforceにログインする必要がなくなる。)
- あらかじめ選択肢を選ばせるだけ。

WIP 週一かそれくらいで、sfに同期させる。
WIP SpreadSheetに書き込み

### Chrome拡張:タイムトラッキングアップ:実装

![notification demo](https://storage.googleapis.com/pubic-image-for-twi-hika-chrome-extension/notification.png)

定期実行のアラームを作成！。選択肢を通知APIで表示
```background.ts
chrome.alarms.create('testAlarm', {
  periodInMinutes: 30,
});

const notificationIds = [
  {
    title: 'プログラミング',
    message: 'progrraming',
    id: 'pro',
  },
  {
    title: 'テスト実装',
    message: 'test',
    id: 'test',
  },
  {
    title: 'ドキュメント作成',
    message: 'document',
    id: 'document',
  },
  {
    title: '調査',
    message: 'investigate',
    id: 'investigate',
  },
];
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log(alarm);
  if (alarm.name === 'testAlarm') {
    notificationIds.map((item) => {
      chrome.notifications.create(item.id, {
        type: 'basic',
        iconUrl: 'icons/icon-32.png',
        title: item.title,
        message: item.message,
      });
    });
  }
});
```
すごく簡単

通知を押した時のcallbackを登録しておく。
```background.ts
chrome.notifications.onClicked.addListener(async (notification) => {
  notificationIds.map((item) => {
    chrome.notifications.clear(item.id);
  });
  await fetch('localhost:3003', {method: "post", body: notification});
});
```

chrome拡張でfirebase認証や、spreadsheet apiに書き込むところを追加したら終わり。


