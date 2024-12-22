export const dynamic = 'force-dynamic'

'use client'

import { useState } from 'react'
import FilterLayout from '@/components/layout/FilterLayout'
import ContentGrid from '@/components/shared/ContentGrid'
import { ChevronDown, User, ChevronLeft, ChevronRight } from 'lucide-react'
import { useMembers } from '@/hooks/useMembers'

export default function YearMemberDropdownPage() {
  const [selectedYear, setSelectedYear] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return Number(localStorage.getItem('selectedYear')) || new Date().getFullYear()
    }
    return new Date().getFullYear()
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all')

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  )

  const { members, loading, error, totalCount, pageCount } = useMembers({
    year: selectedYear,
    status: selectedStatus,
    page: currentPage,
    pageSize: 6
  })

  const handleYearChange = (year: number) => {
    setSelectedYear(year)
    localStorage.setItem('selectedYear', year.toString())
    setCurrentPage(1)
  }

  const handleStatusChange = (status: typeof selectedStatus) => {
    setSelectedStatus(status)
    setCurrentPage(1)
  }

  const sidebarFilters = (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="status"
              checked={selectedStatus === 'all'}
              onChange={() => handleStatusChange('all')}
              className="rounded border-gray-300"
            />
            <span className="ml-2 text-sm">All</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="status"
              checked={selectedStatus === 'active'}
              onChange={() => handleStatusChange('active')}
              className="rounded border-gray-300"
            />
            <span className="ml-2 text-sm">Active</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="status"
              checked={selectedStatus === 'inactive'}
              onChange={() => handleStatusChange('inactive')}
              className="rounded border-gray-300"
            />
            <span className="ml-2 text-sm">Inactive</span>
          </label>
        </div>
      </div>
    </div>
  )

  const pagination = pageCount > 1 && (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="text-sm text-gray-600">
        Page {currentPage} of {pageCount}
      </span>
      <button
        onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
        disabled={currentPage === pageCount}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )

  if (error) {
    return (
      <FilterLayout>
        <div className="text-center py-12">
          <p className="text-red-600">Error loading members: {error.message}</p>
        </div>
      </FilterLayout>
    )
  }

  return (
    <FilterLayout
      sidebarFilters={sidebarFilters}
      pagination={pagination}
    >
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Members by Year</h1>
            <p className="text-sm text-gray-600 mt-1">
              Total members: {totalCount}
            </p>
          </div>
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(Number(e.target.value))}
              className="appearance-none bg-white border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      <ContentGrid loading={loading}>
        {members.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Joined {member.join_year}</p>
                <p className="text-sm text-gray-600">Tours: {member.tour_count}</p>
              </div>
              <div className="bg-orange-100 p-2 rounded-lg">
                <User className="text-orange-600" size={20} />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-xs px-2 py-1 rounded-full ${
                member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {member.status}
              </span>
            </div>
          </div>
        ))}
      </ContentGrid>
    </FilterLayout>
  )
} 