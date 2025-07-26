import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import BlogEditForm from '@/components/BlogEditForm'

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
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
        <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-6">
          <h1 className="text-2xl font-bold text-gray-100 mb-6">ブログを編集</h1>
          <BlogEditForm blog={blog} />
        </div>
      </div>
    </div>
  )
}