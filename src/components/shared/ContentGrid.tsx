'use client'

interface ContentGridProps {
  children: React.ReactNode
  loading?: boolean
  emptyMessage?: string
  columns?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
}

export default function ContentGrid({
  children,
  loading = false,
  emptyMessage = 'No items found',
  columns: providedColumns,
}: ContentGridProps) {
  const getGridColsClass = (cols: number) => {
    const classMap: { [key: number]: string } = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
    }
    return classMap[cols] || 'grid-cols-1'
  }

  const defaultColumns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  }

  const columns = {
    ...defaultColumns,
    ...providedColumns,
  }

  const gridClass = `grid gap-6 ${getGridColsClass(columns.mobile)} md:${getGridColsClass(columns.tablet)} lg:${getGridColsClass(columns.desktop)}`

  if (loading) {
    return (
      <div className={gridClass}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!children || (Array.isArray(children) && children.length === 0)) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={gridClass}>
      {children}
    </div>
  )
} 