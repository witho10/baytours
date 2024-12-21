'use client'

import { useState } from 'react'
import Header from './Header'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface FilterLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  sidebarFilters?: React.ReactNode
  pagination?: React.ReactNode
}

export default function FilterLayout({ 
  children, 
  showSidebar = true,
  sidebarFilters,
  pagination 
}: FilterLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {showSidebar && (
            <aside className={`
              lg:w-64 bg-white rounded-lg shadow-sm p-4
              ${isSidebarOpen ? 'block' : 'hidden lg:block'}
            `}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="lg:hidden"
                >
                  {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
              </div>
              <div className="space-y-4">
                <div className="border-t pt-4">
                  {sidebarFilters}
                </div>
              </div>
            </aside>
          )}
          
          <main className={`flex-1 ${showSidebar ? 'lg:ml-6' : ''}`}>
            {children}
          </main>
        </div>
      </div>
      
      <footer className="mt-auto py-6 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">© 2024 Tour Club Analytics</p>
            {pagination}
          </div>
        </div>
      </footer>
    </div>
  )
} 