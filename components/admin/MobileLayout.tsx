'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface MobileLayoutProps {
  children: React.ReactNode
  activeTab: string
}

export default function MobileLayout({ children, activeTab }: MobileLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin')
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/admin/dashboard' },
    { id: 'bookings', label: 'Bookings', icon: '📅', path: '/admin/dashboard/bookings' },
    { id: 'users', label: 'Users', icon: '👥', path: '/admin/dashboard/users' },
    { id: 'photos', label: 'Photos', icon: '📸', path: '/admin/dashboard/photos' },
    { id: 'google-photos', label: 'Google Photos', icon: '☁️', path: '/admin/dashboard/google-photos' },
    { id: 'calendar', label: 'Calendar', icon: '🗓️', path: '/admin/dashboard/calendar' },
    { id: 'packages', label: 'Packages', icon: '📦', path: '/admin/dashboard/packages' },
    { id: 'gallery', label: 'Gallery', icon: '🖼️', path: '/admin/dashboard/gallery' }
  ]

  const activeItem = navItems.find(item => item.id === activeTab)

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Menu Button + Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl bg-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-600/50 transition-all duration-200 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">W</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-white font-semibold text-sm">Wedding Vibes</h1>
                <p className="text-gray-400 text-xs">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Center: Current Page */}
          <div className="flex items-center space-x-2 sm:hidden">
            <span className="text-lg">{activeItem?.icon}</span>
            <span className="text-white font-medium text-sm">{activeItem?.label}</span>
          </div>

          {/* Right: Logout */}
          <button
            onClick={handleLogout}
            className="px-3 py-2 bg-red-600/20 text-red-400 rounded-xl text-xs font-medium border border-red-600/30 hover:bg-red-600/30 transition-all duration-200 active:scale-95"
          >
            <span className="hidden sm:inline">Logout</span>
            <svg className="w-4 h-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      {/* Dropdown Menu */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setMenuOpen(false)} />
          <div className="absolute top-16 left-4 right-4 bg-gray-800/95 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl z-50 animate-slideUp">
            <div className="p-4">
              <h3 className="text-white font-semibold mb-3 text-sm">Navigation</h3>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-purple-600/30 text-white border border-purple-500/50'
                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                    {activeTab === item.id && (
                      <div className="ml-auto w-2 h-2 bg-purple-500 rounded-full"></div>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="pb-4">
        <div className="px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  )
}