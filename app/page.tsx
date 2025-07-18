import BlogForm from '@/components/BlogForm'
import BlogList from '@/components/BlogList'
import { Suspense } from 'react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            AI ブログジェネレーター
          </h1>
          <p className="text-lg text-gray-400">
            テーマを入力するだけで、AIが自動的にブログ記事を生成します
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center">
            新しいブログを作成
          </h2>
          <BlogForm />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-100 mb-6">
            最近のブログ記事
          </h2>
          <Suspense
            fallback={
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-100"></div>
              </div>
            }
          >
            <BlogList />
          </Suspense>
        </section>
      </div>
    </div>
  )
}