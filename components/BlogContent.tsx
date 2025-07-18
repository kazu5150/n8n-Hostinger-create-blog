'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface BlogContentProps {
  content: string
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg max-w-none prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({children}) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-100">{children}</h1>,
          h2: ({children}) => <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-100">{children}</h2>,
          h3: ({children}) => <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-100">{children}</h3>,
          p: ({children}) => <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>,
          ul: ({children}) => <ul className="list-disc list-inside mb-4 text-gray-300">{children}</ul>,
          ol: ({children}) => <ol className="list-decimal list-inside mb-4 text-gray-300">{children}</ol>,
          li: ({children}) => <li className="mb-1 text-gray-300">{children}</li>,
          blockquote: ({children}) => <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 text-gray-400 italic">{children}</blockquote>,
          code: ({children}) => <code className="bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>,
          pre: ({children}) => <pre className="bg-slate-900 text-gray-300 p-4 rounded-lg overflow-x-auto my-4 border border-slate-700 shadow-lg font-mono text-sm leading-relaxed">{children}</pre>,
          a: ({href, children}) => <a href={href} className="text-purple-400 hover:text-purple-300 hover:underline">{children}</a>,
          hr: () => <hr className="my-8 border-gray-700" />,
          table: ({children}) => <table className="min-w-full border-collapse my-4">{children}</table>,
          thead: ({children}) => <thead className="bg-gray-700">{children}</thead>,
          th: ({children}) => <th className="border border-gray-600 px-4 py-2 text-left font-semibold text-gray-100">{children}</th>,
          td: ({children}) => <td className="border border-gray-600 px-4 py-2 text-gray-300">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}