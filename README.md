# AI Blog Generator with n8n Integration

AIを活用してブログ記事を自動生成するWebアプリケーションです。n8nワークフローと連携し、テーマを入力するだけで高品質なブログ記事を生成します。

## 🚀 デモ

- **アプリケーション**: https://n8n-hostinger-create-blog.vercel.app
- **n8n Webhook**: https://n8n.srv927568.hstgr.cloud/webhook-test/generate-blog

## 🛠 技術スタック

- **フロントエンド**: Next.js 15 (App Router)
- **スタイリング**: Tailwind CSS
- **データベース**: Supabase (PostgreSQL)
- **ワークフロー**: n8n (Hostinger)
- **AI**: OpenAI API
- **ホスティング**: Vercel

## ✨ 機能

- 🤖 AIによる自動ブログ生成
- 📝 Markdown形式でのコンテンツ表示
- 🎨 ダークモード対応のモダンなUI
- 📱 レスポンシブデザイン
- 🔄 リアルタイムでのブログ更新
- 🗑️ ブログの編集・削除機能

## 📋 必要な環境

- Node.js 18.0以上
- npm または yarn
- Supabaseアカウント
- n8nアカウント（またはセルフホスティング）
- OpenAI APIキー
- Vercelアカウント（デプロイ用）

## 🔧 セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/kazu5150/n8n-Hostinger-create-blog.git
cd n8n-Hostinger-create-blog
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定します：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# n8n Webhook
NEXT_PUBLIC_N8N_WEBHOOK_URL=your_n8n_webhook_url
```

### 4. Supabaseのセットアップ

1. [Supabase](https://supabase.com)でプロジェクトを作成
2. SQL Editorで以下のSQLを実行：

```sql
-- supabase/schema.sql の内容を実行
```

詳細は[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)を参照してください。

### 5. n8nワークフローのセットアップ

1. n8nで新しいワークフローを作成
2. 以下のノードを設定：
   - **Webhook**: テーマを受け取る
   - **OpenAI**: ブログ記事を生成
   - **Code**: データを整形
   - **HTTP Request**: Next.jsアプリに送信

詳細は[n8n-setup-guide.md](./n8n-setup-guide.md)を参照してください。

### 6. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリケーションが起動します。

## 🌐 Vercelへのデプロイ

1. [Vercel](https://vercel.com)でプロジェクトを作成
2. GitHubリポジトリを接続
3. 環境変数を設定
4. デプロイ

詳細な手順は[デプロイガイド](#デプロイ)を参照してください。

## 🔌 API エンドポイント

### ブログ作成（n8n webhook）
```bash
POST /api/n8n-webhook
Content-Type: application/json

{
  "title": "ブログタイトル",
  "content": "ブログ本文",
  "theme": "テーマ"
}
```

### ブログ一覧取得
```bash
GET /api/blogs
```

### ブログ詳細取得
```bash
GET /api/blogs/[id]
```

### ブログ更新
```bash
PUT /api/blogs/[id]
```

### ブログ削除
```bash
DELETE /api/blogs/[id]
```

## 📝 使用方法

### Webインターフェースから

1. アプリケーションにアクセス
2. テーマを入力
3. 「ブログを生成」ボタンをクリック
4. AIが自動的にブログ記事を生成

### curlコマンドから

```bash
curl -X POST https://n8n.srv927568.hstgr.cloud/webhook-test/generate-blog \
  -H "Content-Type: application/json" \
  -d '{
    "theme": "Next.js 15の新機能について"
  }'
```

## 🗂 プロジェクト構造

```
├── app/                    # Next.js App Router
│   ├── api/               # APIルート
│   ├── blog/              # ブログ関連ページ
│   └── page.tsx           # ホームページ
├── components/            # Reactコンポーネント
├── lib/                   # ユーティリティ
│   └── supabase/         # Supabaseクライアント
├── supabase/             # データベーススキーマ
├── n8n/                  # n8nワークフロー設定
└── types/                # TypeScript型定義
```

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🙏 謝辞

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [n8n](https://n8n.io/)
- [OpenAI](https://openai.com/)
- [Vercel](https://vercel.com/)

## 📞 サポート

問題や質問がある場合は、[Issues](https://github.com/kazu5150/n8n-Hostinger-create-blog/issues)を作成してください。