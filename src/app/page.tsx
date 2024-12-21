'use client'

import Header from '@/components/layout/Header'
import KPICard from '@/components/layout/KPICard'
import { Users, TrendingUp, Calendar, Map, UserPlus, Compass, Award, Target } from 'lucide-react'

export default function DashboardPage() {
  const kpiData = [
    { title: 'Total Members', value: '2,847', change: '+12% from last month', icon: Users, trend: 'up' },
    { title: 'Active Tours', value: '24', change: '+3 this week', icon: Map, trend: 'up' },
    { title: 'New Signups', value: '147', change: '+28% vs last month', icon: UserPlus, trend: 'up' },
    { title: 'Tour Completion', value: '94%', change: '+2% from average', icon: Target, trend: 'up' },
    { title: 'Member Growth', value: '+15%', change: 'Year over Year', icon: TrendingUp, trend: 'up' },
    { title: 'Popular Tours', value: '12', change: 'Most booked', icon: Compass, trend: 'neutral' },
    { title: 'Upcoming Tours', value: '8', change: 'Next 30 days', icon: Calendar, trend: 'neutral' },
    { title: 'Member Rating', value: '4.8', change: 'Out of 5.0', icon: Award, trend: 'up' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              change={kpi.change}
              icon={kpi.icon}
              trend={kpi.trend as 'up' | 'down' | 'neutral'}
            />
          ))}
        </div>

        {/* Placeholder for charts - to be implemented */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm min-h-[400px]">
            <h3 className="text-lg font-semibold mb-4">Total Members Cohorts</h3>
            {/* Chart component will go here */}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm min-h-[400px]">
            <h3 className="text-lg font-semibold mb-4">New Members Trend</h3>
            {/* Chart component will go here */}
          </div>
        </div>
      </main>
    </div>
  )
} 