'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Blog } from '@/types/blog'

interface BlogEditFormProps {
  blog: Blog
}

export default function BlogEditForm({ blog }: BlogEditFormProps) {
  const [title, setTitle] = useState(blog.title)
  const [content, setContent] = useState(blog.content)
  const [theme, setTheme] = useState(blog.theme)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim() || !theme.trim()) {
      setMessage({ type: 'error', text: 'すべてのフィールドを入力してください' })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/blogs/${blog.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, theme }),
      })

      if (!response.ok) {
        throw new Error('ブログの更新に失敗しました')
      }

      setMessage({ type: 'success', text: 'ブログが正常に更新されました！' })
      
      // 成功後にブログ詳細ページにリダイレクト
      setTimeout(() => {
        router.push(`/blog/${blog.id}`)
      }, 1500)
    } catch (error) {
      console.error('Error:', error)
      setMessage({ type: 'error', text: 'ブログの更新中にエラーが発生しました' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push(`/blog/${blog.id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
          タイトル
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-gray-100 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="theme" className="block text-sm font-medium text-gray-300 mb-2">
          テーマ
        </label>
        <input
          type="text"
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-gray-100 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
          コンテンツ
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={20}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-gray-100 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-vertical"
          disabled={isLoading}
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          {isLoading ? '更新中...' : '更新'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          disabled={isLoading}
          className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200 disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          キャンセル
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-900/20 text-green-400 border border-green-700' 
            : 'bg-red-900/20 text-red-400 border border-red-700'
        }`}>
          {message.text}
        </div>
      )}
    </form>
  )
}