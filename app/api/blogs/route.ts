import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // バリデーション
    if (!body.title || !body.content || !body.theme) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, theme' },
        { status: 400 }
      )
    }
    
    // blogsテーブルにデータを挿入
    const { data, error } = await supabase
      .from('blogs')
      .insert([
        {
          title: body.title,
          content: body.content,
          theme: body.theme,
          status: 'published'
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ 
      success: true, 
      data 
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}