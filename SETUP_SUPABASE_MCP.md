# Supabase MCP サーバーのセットアップ

## 1. Supabase MCPサーバーの追加

Cursor/Claude CodeでSupabase MCPサーバーを使用するには、以下の手順で設定を追加する必要があります：

### 方法1: Claude Codeコマンドを使用
```bash
claude mcp add @modelcontextprotocol/server-supabase
```

### 方法2: 手動で設定ファイルを編集

`~/.cursor/mcp.json` または Claude Codeの設定ファイルに以下を追加：

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-supabase"],
      "env": {
        "SUPABASE_URL": "your_supabase_project_url",
        "SUPABASE_SERVICE_ROLE_KEY": "your_service_role_key"
      }
    }
  }
}
```

## 2. 環境変数の設定

Supabaseプロジェクトから以下の情報を取得：
- **Project URL**: Settings → API → Project URL
- **Service Role Key**: Settings → API → service_role (secret)

⚠️ **重要**: Service Role Keyは管理者権限を持つため、安全に管理してください。

## 3. 現在の代替方法

Supabase MCPが利用できない場合でも、以下の方法でSupabaseを操作できます：

### A. Supabase CLIを使用
```bash
# ローカルでSupabaseを起動
supabase start

# マイグレーションの実行
supabase db push

# データベースのリセット
supabase db reset
```

### B. JavaScript/TypeScriptクライアントを使用
既にプロジェクトに設定済みの`lib/supabase/client.ts`を使用してデータベース操作が可能です。

### C. Supabase Web UIを使用
1. https://supabase.com にアクセス
2. プロジェクトダッシュボードから直接操作

## 推奨される次のステップ

1. Supabaseプロジェクトの Web UI でデータベースをセットアップ
2. 提供されたSQLスキーマを SQL Editor で実行
3. アプリケーションの `.env.local` に認証情報を設定

これにより、MCPサーバーなしでもアプリケーションは正常に動作します。