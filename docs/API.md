# API Documentation

## Overview

このドキュメントでは、AI Blog Generatorで使用できるAPIエンドポイントについて説明します。

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://n8n-hostinger-create-blog.vercel.app`

## Authentication

現在、APIエンドポイントは認証を必要としません（開発中）。

## Endpoints

### 1. Create Blog (n8n Webhook)

n8nワークフローから呼び出されるエンドポイントです。

```
POST /api/n8n-webhook
```

#### Request Body

```json
{
  "title": "ブログのタイトル",
  "content": "ブログの本文（Markdown形式）",
  "theme": "ブログのテーマ"
}
```

#### Response

**Success (200 OK)**
```json
{
  "success": true,
  "blog": {
    "id": "uuid",
    "title": "ブログのタイトル",
    "content": "ブログの本文",
    "theme": "ブログのテーマ",
    "status": "published",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z",
    "user_id": null
  }
}
```

**Error (400 Bad Request)**
```json
{
  "error": "ブログデータが不完全です"
}
```

**Error (500 Internal Server Error)**
```json
{
  "error": "ブログの保存に失敗しました",
  "details": "Error message"
}
```

### 2. List Blogs

すべてのブログを取得します。

```
GET /api/blogs
```

#### Response

```json
[
  {
    "id": "uuid",
    "title": "ブログタイトル",
    "content": "ブログ本文",
    "theme": "テーマ",
    "status": "published",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z",
    "user_id": null
  }
]
```

### 3. Get Blog by ID

特定のブログを取得します。

```
GET /api/blogs/[id]
```

#### Parameters

- `id` (string): ブログのUUID

#### Response

**Success (200 OK)**
```json
{
  "id": "uuid",
  "title": "ブログタイトル",
  "content": "ブログ本文",
  "theme": "テーマ",
  "status": "published",
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-01T00:00:00Z",
  "user_id": null
}
```

**Error (404 Not Found)**
```json
{
  "error": "ブログが見つかりません"
}
```

### 4. Update Blog

ブログを更新します。

```
PUT /api/blogs/[id]
```

#### Parameters

- `id` (string): ブログのUUID

#### Request Body

```json
{
  "title": "新しいタイトル",
  "content": "新しい本文",
  "theme": "新しいテーマ"
}
```

#### Response

**Success (200 OK)**
```json
{
  "success": true,
  "blog": {
    "id": "uuid",
    "title": "新しいタイトル",
    "content": "新しい本文",
    "theme": "新しいテーマ",
    "status": "published",
    "created_at": "2025-01-01T00:00:00Z",
    "updated_at": "2025-01-01T00:00:00Z",
    "user_id": null
  }
}
```

### 5. Delete Blog

ブログを削除します。

```
DELETE /api/blogs/[id]
```

#### Parameters

- `id` (string): ブログのUUID

#### Response

**Success (200 OK)**
```json
{
  "success": true
}
```

### 6. Health Check

システムの状態を確認します。

```
GET /api/health
```

#### Response

```json
{
  "status": "ok",
  "timestamp": "2025-01-01T00:00:00Z",
  "environment": "production",
  "env": {
    "SUPABASE_URL": true,
    "SUPABASE_ANON_KEY": true,
    "N8N_WEBHOOK_URL": true
  },
  "supabase": "Connected (10 blogs)"
}
```

## Error Handling

すべてのエラーレスポンスは以下の形式で返されます：

```json
{
  "error": "エラーメッセージ",
  "details": "詳細なエラー情報（オプション）"
}
```

## Rate Limiting

現在、レート制限は実装されていません。

## CORS

すべてのオリジンからのリクエストを許可しています（開発中）。