# Supabaseデータベースセットアップ手順

## 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com) にアクセス
2. 「Start your project」をクリック
3. GitHubアカウントでログイン
4. 「New project」をクリック
5. プロジェクト情報を入力:
   - Project name: `blog-generator`（任意の名前）
   - Database Password: 強力なパスワードを設定
   - Region: 最寄りのリージョンを選択（東京など）

## 2. データベーススキーマの適用

プロジェクトが作成されたら:

1. 左サイドバーの「SQL Editor」をクリック
2. 「New query」をクリック
3. 以下のSQLをコピー＆ペースト:

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
```

4. 「Run」ボタンをクリックして実行

## 3. 認証なしでのテスト用設定（オプション）

認証なしでテストする場合は、以下のポリシーも追加:

```sql
-- Allow anonymous users to create blogs (for testing)
CREATE POLICY "Anonymous users can create blogs" ON blogs
  FOR INSERT WITH CHECK (user_id IS NULL);

-- Allow anonymous users to read their own blogs
CREATE POLICY "Anonymous users can view blogs without user_id" ON blogs
  FOR SELECT USING (user_id IS NULL);
```

## 4. API設定の取得

1. 左サイドバーの「Settings」→「API」をクリック
2. 以下の情報をコピー:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJhbGc...`（長い文字列）

3. `.env.local`ファイルに設定:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

## 5. 動作確認

1. Supabaseダッシュボードの「Table Editor」で`blogs`テーブルが作成されていることを確認
2. RLS（Row Level Security）が有効になっていることを確認
3. ポリシーが正しく設定されていることを確認

これでSupabaseのセットアップは完了です！