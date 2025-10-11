'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getBookings, initializeBookingsDB } from '@/lib/bookings-db'
import { getUsers, initializeUsersDB } from '@/lib/users-db'
import { getCalendarEvents, initializeCalendarDB } from '@/lib/calendar-db'
import { getPackages, initializePackagesDB } from '@/lib/packages-db'
import { getGalleries, initializeGalleryDB } from '@/lib/gallery-db'
import { getPhotoFolders, initializePhotosDB } from '@/lib/photos-db'
import MobileLayout from '@/components/admin/MobileLayout'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    approvedBookings: 0,
    rejectedBookings: 0
  })

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      initializeAllDatabases()
      loadStats()
    } else {
      router.push('/admin')
    }
  }, [router])

  const initializeAllDatabases = () => {
    initializeBookingsDB()
    initializeUsersDB()
    initializeCalendarDB()
    initializePackagesDB()
    initializeGalleryDB()
    initializePhotosDB()
  }

  const loadStats = () => {
    const bookings = getBookings()
    setStats({
      totalBookings: bookings.length,
      pendingBookings: bookings.filter(b => b.status === 'pending').length,
      approvedBookings: bookings.filter(b => b.status === 'approved').length,
      rejectedBookings: bookings.filter(b => b.status === 'rejected').length
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <MobileLayout activeTab="dashboard">
      <div className="space-y-6">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
          <p className="text-gray-400 text-sm sm:text-base">Monitor your wedding photography business</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="flex-shrink-0 mb-2 sm:mb-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-300">Total Bookings</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{stats.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="flex-shrink-0 mb-2 sm:mb-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-300">Pending</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{stats.pendingBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="flex-shrink-0 mb-2 sm:mb-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-300">Approved</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{stats.approvedBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="flex-shrink-0 mb-2 sm:mb-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <div className="sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-300">Rejected</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{stats.rejectedBookings}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}