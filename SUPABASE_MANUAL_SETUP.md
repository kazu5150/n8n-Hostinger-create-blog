# Supabase 手動セットアップ完全ガイド

## ステップ1: Supabaseアカウントとプロジェクトの作成

### 1.1 アカウント作成
1. https://supabase.com にアクセス
2. 「Start your project」をクリック
3. GitHubアカウントでサインアップ（またはメールアドレスで登録）

### 1.2 新規プロジェクト作成
1. ダッシュボードで「New project」をクリック
2. 以下の情報を入力：
   - **Organization**: 個人用またはチーム名を選択
   - **Project name**: `blog-generator`（任意の名前でOK）
   - **Database Password**: 強力なパスワードを設定（後で必要になるので保存）
   - **Region**: `Northeast Asia (Tokyo)`を選択（日本から最も近い）
   - **Pricing Plan**: Free tier（無料）でOK

3. 「Create new project」をクリック
4. プロジェクトの作成完了まで数分待つ

## ステップ2: データベーススキーマの作成

### 2.1 SQL Editorを開く
1. 左サイドバーの「SQL Editor」アイコンをクリック
2. 「+ New query」ボタンをクリック

### 2.2 テーブル作成SQLを実行
以下のSQL全体をコピーして、SQL Editorに貼り付け：

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create blogs table
CREATE TABLE blogs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  theme TEXT NOT NULL,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_blogs_user_id ON blogs(user_id);
CREATE INDEX idx_blogs_created_at ON blogs(created_at DESC);
CREATE INDEX idx_blogs_status ON blogs(status);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow users to read all published blogs
CREATE POLICY "Published blogs are viewable by everyone" ON blogs
  FOR SELECT USING (status = 'published');

-- Allow authenticated users to read their own blogs
CREATE POLICY "Users can view own blogs" ON blogs
  FOR SELECT USING (auth.uid() = user_id);

-- Allow authenticated users to create blogs
CREATE POLICY "Authenticated users can create blogs" ON blogs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own blogs
CREATE POLICY "Users can update own blogs" ON blogs
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete their own blogs
CREATE POLICY "Users can delete own blogs" ON blogs
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- 認証なしでのテスト用ポリシー（開発用）
CREATE POLICY "Allow anonymous insert for testing" ON blogs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous select for testing" ON blogs
  FOR SELECT USING (true);
```

3. 右上の「Run」ボタンをクリック（または Cmd/Ctrl + Enter）
4. "Success. No rows returned"というメッセージが表示されれば成功

### 2.3 テーブルの確認
1. 左サイドバーの「Table Editor」をクリック
2. `blogs`テーブルが表示されることを確認
3. カラム構造が正しいことを確認

## ステップ3: API認証情報の取得

### 3.1 API設定ページへ移動
1. 左サイドバーの「Settings」（歯車アイコン）をクリック
2. 「API」セクションをクリック

### 3.2 必要な情報をコピー
以下の2つの情報をコピー：

1. **Project URL**
   - 例: `https://xyzabc123.supabase.co`
   
2. **Project API keys** → **anon public**
   - 例: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`（長い文字列）

## ステップ4: Next.jsアプリケーションの設定

### 4.1 環境変数の設定
プロジェクトの`.env.local`ファイルを開き、以下のように設定：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xyzabc123.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# n8n Webhook（後で設定）
NEXT_PUBLIC_N8N_WEBHOOK_URL=your_n8n_webhook_url
```

### 4.2 アプリケーションの起動
```bash
npm run dev
```

## ステップ5: 動作確認

### 5.1 ブラウザでアクセス
1. http://localhost:3000 を開く
2. ページが正常に表示されることを確認

### 5.2 Supabase接続テスト
1. Supabaseダッシュボードの「Table Editor」で`blogs`テーブルを開く
2. アプリケーションからブログを作成してみる（n8n未設定の場合はエラーになるが、それでOK）

## トラブルシューティング

### よくある問題と解決方法

1. **CORS エラーが発生する場合**
   - Supabaseダッシュボード → Settings → API → CORS Allowed Origins に `http://localhost:3000` を追加

2. **RLS（Row Level Security）でデータが取得できない場合**
   - 開発中は一時的にRLSを無効化：
     ```sql
     ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;
     ```

3. **環境変数が読み込まれない場合**
   - Next.jsサーバーを再起動（Ctrl+C → `npm run dev`）
   - `.env.local`ファイルの変数名が正しいか確認

## 次のステップ

1. n8nワークフローの設定
2. OpenAI APIキーの取得と設定
3. 本番環境へのデプロイ準備

これでSupabaseの手動セットアップは完了です！