'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RefreshCw, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import MobileLayout from '@/components/admin/MobileLayout'

type BookingStatus = 'pending' | 'approved' | 'rejected'

type Booking = {
  id: number
  eventType: string
  date: string
  venue: string
  notes: string
  status: BookingStatus
  createdAt: string
}

export default function BookingsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [filter, setFilter] = useState<'all' | BookingStatus>('all')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [scheduleData, setScheduleData] = useState({
    meetingDate: '',
    meetingTime: '',
    location: '',
    notes: ''
  })

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchBookings()
    } else {
      router.push('/admin')
    }
  }, [router])

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings()
    }
  }, [isAuthenticated])

  const fetchBookings = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }
    
    try {
      console.log('Fetching bookings from /api/admin/bookings...')
      const response = await fetch('/api/admin/bookings')
      console.log('Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Bookings data received:', data)
        console.log('Number of bookings:', data.length)
        setBookings(data)
        if (isRefresh) {
          toast.success(`Bookings refreshed successfully (${data.length} found)`)
        }
      } else {
        const errorData = await response.json()
        console.error('API error response:', errorData)
        toast.error('Failed to fetch bookings')
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
      toast.error('Failed to fetch bookings')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleUpdateStatus = async (id: number, status: BookingStatus) => {
    try {
      const response = await fetch('/api/bookings/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId: id,
          action: status === 'approved' ? 'approve' : 'reject'
        })
      })
      
      if (response.ok) {
        await fetchBookings()
        toast.success(`Booking ${status === 'approved' ? 'approved' : 'rejected'} successfully!`)
      } else {
        toast.error('Failed to update booking status')
      }
    } catch (error) {
      console.error('Update status error:', error)
      toast.error('Failed to update booking status')
    }
  }

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter
  )

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <MobileLayout activeTab="bookings">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Bookings Management</h2>
            <p className="text-gray-400 text-sm sm:text-base">Manage customer booking requests</p>
          </div>
          
          <button
            onClick={() => fetchBookings(true)}
            disabled={refreshing}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
          
          <div className="grid grid-cols-2 sm:flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                filter === 'all' 
                  ? 'bg-purple-600 text-white border border-purple-500' 
                  : 'bg-gray-800/50 text-gray-300 border border-gray-600 hover:bg-gray-700/50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                filter === 'pending' 
                  ? 'bg-yellow-600 text-white border border-yellow-500' 
                  : 'bg-gray-800/50 text-gray-300 border border-gray-600 hover:bg-gray-700/50'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                filter === 'approved' 
                  ? 'bg-green-600 text-white border border-green-500' 
                  : 'bg-gray-800/50 text-gray-300 border border-gray-600 hover:bg-gray-700/50'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                filter === 'rejected' 
                  ? 'bg-red-600 text-white border border-red-500' 
                  : 'bg-gray-800/50 text-gray-300 border border-gray-600 hover:bg-gray-700/50'
              }`}
            >
              Rejected
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 sm:p-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500 mx-auto mb-4" />
            <div className="text-gray-300 text-lg sm:text-xl font-semibold mb-2">
              Loading bookings...
            </div>
            <p className="text-gray-500 text-sm sm:text-base">
              Please wait while we fetch the latest bookings
            </p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 sm:p-12 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-gray-300 text-lg sm:text-xl font-semibold mb-2">
              {filter === 'all' ? 'No bookings found' : `No ${filter} bookings found`}
            </div>
            <p className="text-gray-500 text-sm sm:text-base">
              Bookings will appear here when customers submit booking requests from /my-bookings page
            </p>
          </div>
        ) : (
          <div className="bg-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-2xl overflow-hidden">
            <div className="divide-y divide-gray-700">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="p-4 sm:p-6 hover:bg-gray-700/20 transition-colors">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <h3 className="text-lg font-semibold text-white">
                        {booking.eventType}
                      </h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full self-start sm:self-auto ${
                        booking.status === 'pending' ? 'bg-yellow-600/30 text-yellow-300 border border-yellow-600/50' :
                        booking.status === 'approved' ? 'bg-green-600/30 text-green-300 border border-green-600/50' :
                        'bg-red-600/30 text-red-300 border border-red-600/50'
                      }`}>
                        {booking.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center text-gray-300">
                        <svg className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="break-all">{booking.notes?.match(/Email: ([^\n]+)/)?.[1] || 'N/A'}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <svg className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {booking.notes?.match(/Contact: ([^\n]+)/)?.[1] || 'N/A'}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <svg className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {booking.venue}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <svg className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(booking.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    {booking.notes?.match(/Message: ([\s\S]*)/)?.[1] && (
                      <div className="bg-gray-700/30 rounded-lg p-3">
                        <p className="text-gray-300 text-sm">{booking.notes.match(/Message: ([\s\S]*)/)?.[1]}</p>
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(booking.id, 'approved')}
                            className="bg-green-600/20 hover:bg-green-600/30 text-green-400 hover:text-green-300 px-4 py-2 rounded-lg text-sm font-medium transition-all border border-green-600/30 flex-1 sm:flex-none"
                          >
                            ✅ Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(booking.id, 'rejected')}
                            className="bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg text-sm font-medium transition-all border border-red-600/30 flex-1 sm:flex-none"
                          >
                            ❌ Reject
                          </button>
                        </>
                      )}
                      
                      {(booking.status === 'approved' || booking.status === 'pending') && (
                        <button
                          onClick={() => {
                            setSelectedBooking(booking)
                            setShowScheduleModal(true)
                          }}
                          className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 px-4 py-2 rounded-lg text-sm font-medium transition-all border border-blue-600/30 flex-1 sm:flex-none"
                        >
                          📅 Schedule
                        </button>
                      )}
                      
                      <button
                        onClick={() => window.open(`tel:${booking.notes?.match(/Contact: ([^\n]+)/)?.[1]}`)}
                        className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 hover:text-purple-300 px-4 py-2 rounded-lg text-sm font-medium transition-all border border-purple-600/30 flex-1 sm:flex-none"
                      >
                        📞 Call
                      </button>
                      
                      <button
                        onClick={() => window.open(`mailto:${booking.notes?.match(/Email: ([^\n]+)/)?.[1]}`)}
                        className="bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 hover:text-yellow-300 px-4 py-2 rounded-lg text-sm font-medium transition-all border border-yellow-600/30 flex-1 sm:flex-none"
                      >
                        ✉️ Email
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Schedule Meeting Modal */}
      {showScheduleModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Schedule Meeting</h3>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="text-sm text-gray-300 mb-4">
                  <strong>{selectedBooking.eventType}</strong><br/>
                  {selectedBooking.venue} - {new Date(selectedBooking.date).toLocaleDateString()}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Meeting Date</label>
                  <input
                    type="date"
                    value={scheduleData.meetingDate}
                    onChange={(e) => setScheduleData({...scheduleData, meetingDate: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Meeting Time</label>
                  <input
                    type="time"
                    value={scheduleData.meetingTime}
                    onChange={(e) => setScheduleData({...scheduleData, meetingTime: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={scheduleData.location}
                    onChange={(e) => setScheduleData({...scheduleData, location: e.target.value})}
                    placeholder="Meeting location or video call link"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                  <textarea
                    value={scheduleData.notes}
                    onChange={(e) => setScheduleData({...scheduleData, notes: e.target.value})}
                    placeholder="Meeting agenda, requirements to discuss..."
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      // Here you would typically save the schedule data
                      alert(`Meeting scheduled for ${scheduleData.meetingDate} at ${scheduleData.meetingTime}`)
                      setShowScheduleModal(false)
                      setScheduleData({ meetingDate: '', meetingTime: '', location: '', notes: '' })
                    }}
                    disabled={!scheduleData.meetingDate || !scheduleData.meetingTime}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
                  >
                    Schedule Meeting
                  </button>
                  <button
                    onClick={() => {
                      setShowScheduleModal(false)
                      setScheduleData({ meetingDate: '', meetingTime: '', location: '', notes: '' })
                    }}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MobileLayout>
  )
}