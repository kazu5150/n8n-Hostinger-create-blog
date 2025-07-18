import { createClient } from '@/lib/supabase/server'
import { Blog } from '@/types/blog'
import Link from 'next/link'
import BlogActions from './BlogActions'

export default async function BlogList() {
  const supabase = await createClient()
  
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching blogs:', error)
    return <div className="text-red-400">ブログの取得中にエラーが発生しました</div>
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        まだブログがありません
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog: Blog) => (
        <article
          key={blog.id}
          className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl hover:border-gray-600 transition-all p-6"
        >
          <Link href={`/blog/${blog.id}`} className="block mb-4">
            <h2 className="text-xl font-semibold text-gray-100 mb-2 hover:text-purple-400 transition-colors">
              {blog.title}
            </h2>
            <p className="text-gray-400 mb-4 line-clamp-3">
              {blog.content.replace(/[#*`>\-\[\]]/g, '').slice(0, 150)}...
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>テーマ: {blog.theme}</span>
              <time dateTime={blog.created_at}>
                {new Date(blog.created_at).toLocaleDateString('ja-JP')}
              </time>
            </div>
          </Link>
          <BlogActions blogId={blog.id} />
        </article>
      ))}
    </div>
  )
}