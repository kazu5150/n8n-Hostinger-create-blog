import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BlogContent from '@/components/BlogContent'

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !blog) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6"
        >
          ← ブログ一覧に戻る
        </Link>
        
        <article className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-100 mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>テーマ: {blog.theme}</span>
              <time dateTime={blog.created_at}>
                {new Date(blog.created_at).toLocaleDateString('ja-JP')}
              </time>
            </div>
          </header>
          
          <BlogContent content={blog.content} />
        </article>
      </div>
    </div>
  )
}