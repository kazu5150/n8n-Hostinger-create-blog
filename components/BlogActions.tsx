'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface BlogActionsProps {
  blogId: string
}

export default function BlogActions({ blogId }: BlogActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleEdit = () => {
    router.push(`/blog/${blogId}/edit`)
  }

  const handleDelete = async () => {
    if (!confirm('このブログを削除してもよろしいですか？')) {
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('削除に失敗しました')
      }

      router.refresh()
    } catch (error) {
      console.error('Delete error:', error)
      alert('ブログの削除中にエラーが発生しました')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex gap-2 pt-2 border-t border-gray-700">
      <button
        onClick={handleEdit}
        className="flex-1 px-3 py-1.5 text-sm bg-purple-900/20 text-purple-400 rounded hover:bg-purple-900/40 transition-colors"
      >
        編集
      </button>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="flex-1 px-3 py-1.5 text-sm bg-red-900/20 text-red-400 rounded hover:bg-red-900/40 transition-colors disabled:opacity-50"
      >
        {isDeleting ? '削除中...' : '削除'}
      </button>
    </div>
  )
}