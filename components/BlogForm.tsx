'use client'

import { useState } from 'react'

export default function BlogForm() {
  const [theme, setTheme] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!theme.trim()) {
      setMessage({ type: 'error', text: 'テーマを入力してください' })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      // 環境変数のチェック
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
      if (!webhookUrl) {
        throw new Error('N8N webhook URLが設定されていません。.env.localファイルにNEXT_PUBLIC_N8N_WEBHOOK_URLを設定してください。')
      }

      // n8n webhookを呼び出し
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme }),
      })

      if (!response.ok) {
        throw new Error('ブログの生成に失敗しました')
      }

      // n8nからのレスポンスを安全に処理
      const responseText = await response.text()
      console.log('Raw response:', responseText)
      
      if (responseText.trim()) {
        try {
          const result = JSON.parse(responseText)
          console.log('Blog created:', result)
        } catch {
          console.log('Non-JSON response from n8n:', responseText)
        }
      } else {
        console.log('Empty response from n8n')
      }
      
      setMessage({ type: 'success', text: 'ブログが正常に作成されました！' })
      setTheme('')
      
      // ページをリロードして新しいブログを表示
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
      let errorMessage = 'ブログの作成中にエラーが発生しました'
      
      if (error instanceof Error) {
        if (error.message.includes('N8N webhook URL')) {
          errorMessage = error.message
        } else if (error.message === 'Failed to fetch') {
          errorMessage = 'N8Nサーバーに接続できません。N8Nが起動していることを確認し、webhook URLが正しいことを確認してください。'
        } else {
          errorMessage = `エラー: ${error.message}`
        }
      }
      
      setMessage({ type: 'error', text: errorMessage })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-300 mb-2">
            ブログのテーマ
          </label>
          <input
            type="text"
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="例: Next.jsの最新機能について"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-gray-100 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition placeholder-gray-500"
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          {isLoading ? '生成中...' : 'ブログを生成'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-4 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-900/20 text-green-400 border border-green-700' 
            : 'bg-red-900/20 text-red-400 border border-red-700'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  )
}