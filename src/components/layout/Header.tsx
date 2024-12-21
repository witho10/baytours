'use client'

import Image from 'next/image'
import { MapPin, Users, Calendar, Menu } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-orange-500 text-white">
      <div className="container mx-auto px-4 h-20">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-4">
            <MapPin size={32} />
            <h1 className="text-2xl font-bold">Tour Club Analytics</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="flex items-center space-x-2 hover:text-orange-200">
              <Users size={20} />
              <span>Members</span>
            </a>
            <a href="#" className="flex items-center space-x-2 hover:text-orange-200">
              <Calendar size={20} />
              <span>Tours</span>
            </a>
          </nav>

          <button className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  )
} 