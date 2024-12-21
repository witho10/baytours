'use client'

import { useState } from 'react'
import FilterLayout from '@/components/layout/FilterLayout'
import ContentGrid from '@/components/shared/ContentGrid'
import { ChevronDown, Folder, Tag, ChevronLeft, ChevronRight } from 'lucide-react'
import { useMarketingCategories } from '@/hooks/useMarketingCategories'

export default function MarketingCategoryDropdownPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [materialCountFilter, setMaterialCountFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all')

  const getMaterialCountRange = (filter: typeof materialCountFilter) => {
    switch (filter) {
      case 'low':
        return { max: 15 }
      case 'medium':
        return { min: 16, max: 20 }
      case 'high':
        return { min: 21 }
      default:
        return undefined
    }
  }

  const { categories, loading, error, totalCount, pageCount } = useMarketingCategories({
    tags: selectedTags,
    materialCountRange: getMaterialCountRange(materialCountFilter),
    page: currentPage,
    pageSize: 6
  })

  // Get unique tags from all categories
  const allTags = Array.from(
    new Set(categories.flatMap(category => category.tags))
  ).sort()

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
    setCurrentPage(1)
  }

  const sidebarFilters = (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Material Count
        </label>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All' },
            { value: 'low', label: '15 or less' },
            { value: 'medium', label: '16-20' },
            { value: 'high', label: '21+' },
          ].map((option) => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name="materialCount"
                value={option.value}
                checked={materialCountFilter === option.value}
                onChange={(e) => {
                  setMaterialCountFilter(e.target.value as typeof materialCountFilter)
                  setCurrentPage(1)
                }}
                className="rounded-full border-gray-300"
              />
              <span className="ml-2 text-sm">{option.label}</span>
            </label>
          ))}
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
          <p className="text-red-600">Error loading categories: {error.message}</p>
        </div>
      </FilterLayout>
    )
  }

  const filteredCategories = selectedCategory === 'all'
    ? categories
    : categories.filter(category => category.name === selectedCategory)

  return (
    <FilterLayout
      sidebarFilters={sidebarFilters}
      pagination={pagination}
    >
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Marketing Categories</h1>
            <p className="text-sm text-gray-600 mt-1">
              Total categories: {totalCount}
            </p>
          </div>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="appearance-none bg-white border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                selectedTags.includes(tag)
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Tag size={14} className="mr-1" />
              {tag}
            </button>
          ))}
        </div>
      </div>

      <ContentGrid loading={loading}>
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                <p className="text-sm text-gray-600 mt-2">
                  {category.material_count} materials
                </p>
              </div>
              <div className="bg-orange-100 p-2 rounded-lg">
                <Folder className="text-orange-600" size={20} />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </ContentGrid>
    </FilterLayout>
  )
} 