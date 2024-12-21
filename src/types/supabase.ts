export interface Database {
  public: {
    Tables: {
      members: {
        Row: {
          id: number
          created_at: string
          name: string
          join_year: number
          tour_count: number
          status: 'active' | 'inactive'
        }
        Insert: {
          name: string
          join_year: number
          tour_count?: number
          status?: 'active' | 'inactive'
        }
        Update: {
          name?: string
          join_year?: number
          tour_count?: number
          status?: 'active' | 'inactive'
        }
      }
      marketing_categories: {
        Row: {
          id: number
          created_at: string
          name: string
          description: string
          material_count: number
        }
        Insert: {
          name: string
          description: string
          material_count?: number
        }
        Update: {
          name?: string
          description?: string
          material_count?: number
        }
      }
      category_tags: {
        Row: {
          id: number
          created_at: string
          category_id: number
          tag: string
        }
        Insert: {
          category_id: number
          tag: string
        }
        Update: {
          category_id?: number
          tag?: string
        }
      }
    }
  }
} 