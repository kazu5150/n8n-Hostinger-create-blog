# HTTP Requestノードの修正

## 現在のエラー
「JSON parameter needs to be valid JSON」

## 修正手順

### 1. Send Bodyセクションの設定

**Body Content Type**: `JSON`

**JSON Body**に以下をコピー＆ペースト：

```json
{
  "blogData": {
    "title": "{{ $json.title }}",
    "content": "{{ $json.content }}",
    "theme": "{{ $json.theme }}"
  }
}
```


### 2. 重要なポイント

- **中括弧の使用**: n8nでは `{{ }}` でデータを参照
- **JSONの構造**: 正しいJSON形式である必要がある
- **データの参照**: Parse AI Responseノードの出力を参照

### 3. 代替案（もし上記でも動かない場合）

**Expression**モードに切り替えて：

```javascript
{
  "blogData": {
    "title": $json.title,
    "content": $json.content,
    "theme": $json.theme
  }
}
```

### 4. 確認事項

- URLが正しい: `http://localhost:3000/api/n8n-webhook`
- Content-Typeヘッダーが設定されている: `application/json`
- Methodが `POST` になっている

### 5. デバッグ用

Parse AI Responseノードの出力形式を確認するため、まずは簡単なJSONで試してみる：

```json
{
  "blogData": {
    "title": "テストタイトル",
    "content": "テストコンテンツ",
    "theme": "テストテーマ"
  }
}
```