import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/supabase'

type Category = Database['public']['Tables']['marketing_categories']['Row']
type CategoryTag = Database['public']['Tables']['category_tags']['Row']

interface CategoryWithTags extends Category {
  tags: string[]
}

interface UseMarketingCategoriesOptions {
  tags?: string[]
  materialCountRange?: {
    min?: number
    max?: number
  }
  page?: number
  pageSize?: number
}

export function useMarketingCategories(options: UseMarketingCategoriesOptions = {}) {
  const [categories, setCategories] = useState<CategoryWithTags[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  const { tags, materialCountRange, page = 1, pageSize = 10 } = options

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        setError(null)

        // First, get categories with filters
        let query = supabase
          .from('marketing_categories')
          .select('*, category_tags(tag)', { count: 'exact' })

        // Apply material count filter
        if (materialCountRange?.min !== undefined) {
          query = query.gte('material_count', materialCountRange.min)
        }
        if (materialCountRange?.max !== undefined) {
          query = query.lte('material_count', materialCountRange.max)
        }

        // Apply pagination
        const from = (page - 1) * pageSize
        const to = from + pageSize - 1
        query = query.range(from, to)

        const { data: categoriesData, error: categoriesError, count } = await query

        if (categoriesError) throw categoriesError

        // Transform the data to include tags array
        const transformedCategories = (categoriesData || []).map((category: any) => ({
          ...category,
          tags: category.category_tags.map((t: CategoryTag) => t.tag)
        }))

        // Filter by tags if specified
        const filteredCategories = tags?.length
          ? transformedCategories.filter(category =>
              tags.some(tag => category.tags.includes(tag))
            )
          : transformedCategories

        setCategories(filteredCategories)
        setTotalCount(count || 0)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'))
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [tags, materialCountRange, page, pageSize])

  return {
    categories,
    loading,
    error,
    totalCount,
    pageCount: Math.ceil(totalCount / pageSize)
  }
} 