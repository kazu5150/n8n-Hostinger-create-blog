# n8nワークフロー設定ガイド

## 問題の診断と解決

現在の問題：n8nからNext.js APIへのリクエストが正しく送信されていますが、Supabaseに保存されていません。

### 1. n8nワークフローの修正手順

1. **HTTPリクエストノードのURL変更**
   - 現在: `http://localhost:5678/webhook-test/generate-blog` （これは間違い）
   - 修正: `http://localhost:3000/api/n8n-webhook` （または3001ポートの場合は`http://localhost:3001/api/n8n-webhook`）

2. **n8nでの修正方法**
   - n8nワークフローを開く
   - 「Send to Next.js API」ノードをダブルクリック
   - URLフィールドを `http://localhost:3001/api/n8n-webhook` に変更
   - 保存して再実行

### 2. デバッグ手順

1. **Next.jsのログを確認**
   ```bash
   # ターミナルでNext.jsのログを確認
   npm run dev
   ```

2. **ブラウザの開発者ツールでネットワークタブを確認**
   - F12キーで開発者ツールを開く
   - Networkタブを選択
   - ブログ生成ボタンをクリックして、リクエストを確認

### 3. 正しいワークフローの流れ

```
1. フロントエンド（Next.js）
   ↓ POSTリクエスト
2. n8n Webhook（http://localhost:5678/webhook-test/generate-blog）
   ↓
3. OpenAI API（ブログコンテンツ生成）
   ↓
4. Parse AI Response（レスポンスの解析）
   ↓
5. HTTP Request to Next.js API（http://localhost:3001/api/n8n-webhook）
   ↓
6. Supabaseにデータ保存
   ↓
7. レスポンスをフロントエンドに返す
```

### 4. 追加の確認事項

- Supabaseの環境変数が正しく設定されているか確認
- Supabaseのテーブルに適切なポリシーが設定されているか確認
- n8nワークフローのすべてのノードが緑色（成功）になっているか確認

### 5. テスト用のcURLコマンド

n8n APIを直接テストする場合：
```bash
curl -X POST http://localhost:3001/api/n8n-webhook \
  -H "Content-Type: application/json" \
  -d '{
    "blogData": {
      "title": "テストブログ",
      "content": "これはテストコンテンツです",
      "theme": "テスト"
    }
  }'
```