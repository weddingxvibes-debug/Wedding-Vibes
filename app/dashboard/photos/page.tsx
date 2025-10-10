'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Camera, Calendar, ImageIcon } from 'lucide-react'

export default function PhotosPage() {
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [photos, setPhotos] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth/login')
      return
    }
    setUser(JSON.parse(userData))
    
    // Load bookings and photos
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    const savedPhotos = JSON.parse(localStorage.getItem('photos') || '[]')
    setBookings(savedBookings)
    setPhotos(savedPhotos)
  }, [router])

  const hasBookings = bookings.length > 0
  const hasPhotos = photos.length > 0

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="ml-6 text-2xl font-serif font-bold text-gray-900 dark:text-white">My Photos</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!hasBookings ? (
          // No bookings state
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">No Venue Booked Yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              You need to book a venue first before you can view your photos. Once you book a session, 
              your photos will appear here after the event.
            </p>
            <button
              onClick={() => router.push('/dashboard/booking')}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Book a Venue</span>
            </button>
          </div>
        ) : !hasPhotos ? (
          // Has bookings but no photos
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Camera className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">No Photos Uploaded Yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Your photos will be uploaded here by our admin team after your photography session. 
              Please check back after your event date.
            </p>
            
            {/* Show upcoming bookings */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Your Upcoming Sessions</h3>
              <div className="space-y-3">
                {bookings.map((booking, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{booking.eventType}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{booking.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Has photos - show photo gallery
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Your Photo Gallery</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {photos.map((photo, index) => (
                  <div key={index} className="group relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                      <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm font-medium">{photo.caption}</p>
                        <p className="text-xs opacity-75">{photo.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Download Options</h3>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Download All (High Res)
                </button>
                <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-2 rounded-lg font-medium transition-colors">
                  Download Selected
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}