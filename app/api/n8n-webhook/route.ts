import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received webhook data:', body)
    
    // Handle both formats: direct blogData or theme-only input
    const blogData = body.blogData || body

    if (!blogData || !blogData.theme) {
      console.error('Blog data is incomplete:', blogData)
      return NextResponse.json(
        { error: 'ブログデータが不完全です' },
        { status: 400 }
      )
    }

    // If only theme is provided, use it as title and create basic content
    const title = blogData.title || blogData.theme
    const content = blogData.content || `このブログは「${blogData.theme}」というテーマで生成されました。`
    const theme = blogData.theme

    if (!title || !content || !theme) {
      console.error('Blog data is incomplete after processing:', { title, content, theme })
      return NextResponse.json(
        { error: 'ブログデータが不完全です' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // ブログをデータベースに保存
    console.log('Attempting to insert blog:', {
      title,
      content,
      theme,
      status: 'published',
    })
    
    const { data, error } = await supabase
      .from('blogs')
      .insert({
        title,
        content,
        theme,
        status: 'published',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'ブログの保存に失敗しました', details: error.message },
        { status: 500 }
      )
    }

    console.log('Blog saved successfully:', data)
    return NextResponse.json({ success: true, blog: data })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}