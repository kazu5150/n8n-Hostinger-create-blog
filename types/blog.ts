export interface Blog {
  id: string
  title: string
  content: string
  theme: string
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
  user_id?: string
}