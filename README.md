# 廃校で学園祭 メンバーポータル

Googleアカウントでログインできる、メンバー限定のポータルサイトです。Next.js + NextAuth.js で作られていて、Vercelに無料でデプロイできます。

許可するメンバーは `ALLOWED_EMAILS` という環境変数にGoogleアカウントのメールアドレスを並べるだけで管理できます（コード変更不要）。

## 1. Googleでログインできるようにする（Google Cloud Console）

1. https://console.cloud.google.com/ を開き、新しいプロジェクトを作成する（名前は何でもよい）
2. 左メニューの「APIとサービス」→「OAuth同意画面」を開く
   - User Type は「外部」を選択
   - アプリ名、サポートメール、デベロッパーの連絡先メールを入力して保存
   - スコープはデフォルトのままでよい
   - 「テストユーザー」の画面で、ログインを許可したいメンバー全員のGoogleアカウントのメールアドレスを追加する（公開審査に出さない限り、ここに登録した人しかログインできません）
3. 左メニューの「認証情報」→「認証情報を作成」→「OAuth クライアント ID」を選択
   - アプリケーションの種類は「ウェブ アプリケーション」
   - 「承認済みのリダイレクト URI」に以下を追加（本番URLはVercelでデプロイした後に分かるものに置き換える）
     - `http://localhost:3000/api/auth/callback/google`（ローカル確認用）
     - `https://（あなたのVercelのURL）/api/auth/callback/google`（本番用。例: `https://haiko-portal.vercel.app/api/auth/callback/google`）
4. 作成後に表示される「クライアント ID」と「クライアント シークレット」を控えておく

## 2. GitHubにコードを置く

1. https://github.com/ でアカウントを作成する
2. 新しいリポジトリを作成する（Public/Privateどちらでもよい。他団体に配布したい場合はPublic推奨）
3. このフォルダの中身をそのリポジトリにプッシュする

```bash
cd haiko-portal
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/【あなたのアカウント】/【リポジトリ名】.git
git push -u origin main
```

## 3. Vercelにデプロイする

1. https://vercel.com/ でアカウントを作成する（GitHubアカウントでログインすると楽）
2. 「Add New」→「Project」から、先ほどのGitHubリポジトリを選んでインポートする
3. デプロイ前に「Environment Variables」で以下を設定する

   | 変数名 | 値 |
   | --- | --- |
   | `GOOGLE_CLIENT_ID` | Google Cloud Consoleで取得したクライアントID |
   | `GOOGLE_CLIENT_SECRET` | Google Cloud Consoleで取得したクライアントシークレット |
   | `NEXTAUTH_SECRET` | ランダムな文字列（下記コマンドで生成） |
   | `NEXTAUTH_URL` | デプロイ後に決まるURL（例: `https://haiko-portal.vercel.app`）|
   | `ALLOWED_EMAILS` | ログインを許可するメンバーのGoogleアカウントのメールアドレス（カンマ区切り） |

   `NEXTAUTH_SECRET` はターミナルで以下を実行すると作れます。

   ```bash
   openssl rand -base64 32
   ```

4. 「Deploy」を押す
5. デプロイが終わったら表示されるURL（例: `https://haiko-portal.vercel.app`）を、手順1のGoogle Cloud Consoleの「承認済みのリダイレクト URI」と、Vercelの環境変数 `NEXTAUTH_URL` の両方に正しく設定し直す（URLが決まる前は仮の値で構いません）
6. 設定を変更したら、Vercelの「Deployments」タブから再デプロイする

## メンバーを追加・削除する

Vercelプロジェクトの「Settings」→「Environment Variables」で `ALLOWED_EMAILS` を編集し、カンマ区切りでメールアドレスを追加・削除して保存、再デプロイするだけです。あわせてGoogle Cloud Consoleの「OAuth同意画面」の「テストユーザー」にも同じメールアドレスを追加してください（これをしないと、そのアカウントはGoogleのログイン画面自体で弾かれます）。

## ローカルで動作確認する

```bash
npm install
cp .env.local.example .env.local
# .env.local を上記の値で埋める（NEXTAUTH_URL は空のままでOK、localhost:3000が使われます）
npm run dev
```

http://localhost:3000 を開くとログイン画面にリダイレクトされます。

## ページ構成

- `/` ポータルトップ（各ページへのボタン）
- `/onboarding` 初期研修ページ
- `/faq` よくある質問・ツールの使い方
- `/materials` 資料
- `/meeting` 会議
- `/members` メンバー紹介
- `/join` 入会

各ページの中身は `app/各ページ名/page.js` にあるので、自由に書き換えてください。
