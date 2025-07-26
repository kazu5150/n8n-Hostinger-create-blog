'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-400 mb-4">エラーが発生しました</h2>
        <p className="text-gray-300 mb-4">
          申し訳ございません。予期しないエラーが発生しました。
        </p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="bg-gray-900 p-4 rounded text-sm text-gray-400 mb-4 overflow-auto">
            {error.message}
          </pre>
        )}
        <button
          onClick={reset}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
        >
          もう一度試す
        </button>
      </div>
    </div>
  )
}