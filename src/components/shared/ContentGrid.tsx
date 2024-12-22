'use client'

interface GridColumns {
  mobile: number
  tablet: number
  desktop: number
}

interface ContentGridProps {
  children: React.ReactNode
  loading?: boolean
  emptyMessage?: string
  columns?: Partial<GridColumns>
}

const DEFAULT_COLUMNS: GridColumns = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
}

export default function ContentGrid({
  children,
  loading = false,
  emptyMessage = 'No items found',
  columns: userColumns = {},
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

  // Ensure we have valid column values with type safety
  const safeColumns = {
    mobile: userColumns.mobile !== undefined ? userColumns.mobile : DEFAULT_COLUMNS.mobile,
    tablet: userColumns.tablet !== undefined ? userColumns.tablet : DEFAULT_COLUMNS.tablet,
    desktop: userColumns.desktop !== undefined ? userColumns.desktop : DEFAULT_COLUMNS.desktop,
  } satisfies GridColumns

  const gridClass = `grid gap-6 ${getGridColsClass(safeColumns.mobile)} md:${getGridColsClass(safeColumns.tablet)} lg:${getGridColsClass(safeColumns.desktop)}`

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