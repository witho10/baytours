import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/supabase'

type Member = Database['public']['Tables']['members']['Row']

interface UseMembersOptions {
  year?: number
  status?: 'active' | 'inactive' | 'all'
  page?: number
  pageSize?: number
}

export function useMembers(options: UseMembersOptions = {}) {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  const { year, status = 'all', page = 1, pageSize = 10 } = options

  useEffect(() => {
    async function fetchMembers() {
      try {
        setLoading(true)
        setError(null)

        // Build query
        let query = supabase
          .from('members')
          .select('*', { count: 'exact' })

        // Apply filters
        if (year) {
          query = query.eq('join_year', year)
        }
        if (status !== 'all') {
          query = query.eq('status', status)
        }

        // Apply pagination
        const from = (page - 1) * pageSize
        const to = from + pageSize - 1
        query = query.range(from, to)

        const { data, error, count } = await query

        if (error) throw error

        setMembers(data || [])
        setTotalCount(count || 0)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'))
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [year, status, page, pageSize])

  return {
    members,
    loading,
    error,
    totalCount,
    pageCount: Math.ceil(totalCount / pageSize)
  }
} 