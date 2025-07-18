# n8n ブログ自動生成アプリ

n8nワークフローを使用してAIがブログ記事を自動生成するWebアプリケーションです。

## 技術スタック

- **フロントエンド**: Next.js 14 (App Router)
- **バックエンド**: Supabase
- **ワークフロー**: n8n
- **AI**: OpenAI API

## セットアップ手順

### 1. 環境変数の設定

`.env.local`ファイルに以下の環境変数を設定してください：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# n8n Webhook
NEXT_PUBLIC_N8N_WEBHOOK_URL=your_n8n_webhook_url
```

### 2. Supabaseのセットアップ

1. [Supabase](https://supabase.com)でプロジェクトを作成
2. `supabase/schema.sql`のSQLをSupabase SQL Editorで実行
3. プロジェクトURLとAnon Keyを`.env.local`に設定

### 3. n8nワークフローのセットアップ

1. n8nをインストールして起動
2. `n8n/workflow-template.json`をインポート
3. OpenAI APIキーを設定
4. 環境変数`NEXT_APP_URL`をNext.jsアプリのURLに設定（例: http://localhost:3000）
5. Webhookノードを有効化してURLを取得
6. WebhookのURLを`.env.local`の`NEXT_PUBLIC_N8N_WEBHOOK_URL`に設定

### 4. 依存関係のインストールと起動

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 使い方

1. ブラウザで`http://localhost:3000`にアクセス
2. ブログのテーマを入力
3. 「ブログを生成」ボタンをクリック
4. n8nワークフローがAIを使用してブログを生成
5. 生成されたブログが一覧に表示される

## プロジェクト構造

```
├── app/
│   ├── api/
│   │   └── n8n-webhook/    # n8nからのデータを受け取るAPI
│   ├── blog/
│   │   └── [id]/          # ブログ詳細ページ
│   └── page.tsx           # ホームページ
├── components/
│   ├── BlogForm.tsx       # ブログ作成フォーム
│   └── BlogList.tsx       # ブログ一覧
├── lib/
│   └── supabase/         # Supabaseクライアント設定
├── types/
│   └── blog.ts           # TypeScript型定義
├── n8n/
│   └── workflow-template.json  # n8nワークフローテンプレート
└── supabase/
    └── schema.sql        # データベーススキーマ
```

## ワークフローの流れ

1. ユーザーがフロントエンドでテーマを入力
2. フロントエンドがn8n Webhookを呼び出し
3. n8nがOpenAI APIを使用してブログを生成
4. n8nがNext.js APIにブログデータを送信
5. Next.js APIがSupabaseにブログを保存
6. フロントエンドが更新されて新しいブログを表示

## 注意事項

- OpenAI APIの使用には料金が発生します
- Supabaseの無料プランには制限があります
- n8nは自己ホスティングまたはクラウドサービスで利用可能です