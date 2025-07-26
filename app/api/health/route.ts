import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    // 環境変数チェック
    const env = {
      SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      N8N_WEBHOOK_URL: !!process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL,
    }

    // Supabase接続テスト
    let supabaseStatus = 'Not tested'
    try {
      const supabase = await createClient()
      const { count, error } = await supabase
        .from('blogs')
        .select('*', { count: 'exact', head: true })
      
      if (error) {
        supabaseStatus = `Error: ${error.message}`
      } else {
        supabaseStatus = `Connected (${count} blogs)`
      }
    } catch (e) {
      supabaseStatus = `Connection failed: ${e}`
    }

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      env,
      supabase: supabaseStatus,
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}