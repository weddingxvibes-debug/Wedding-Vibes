'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getGalleries, initializeGalleryDB, updateGallery, type GalleryItem } from '@/lib/gallery-db'
import MobileLayout from '@/components/admin/MobileLayout'

export default function GalleryPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [galleries, setGalleries] = useState<GalleryItem[]>([])
  const [filter, setFilter] = useState<'all' | 'featured' | 'public' | 'private'>('all')

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      initializeGalleryDB()
      loadGalleries()
    } else {
      router.push('/admin')
    }
  }, [router])

  const loadGalleries = () => {
    setGalleries(getGalleries())
  }

  const filteredGalleries = galleries.filter(gallery => {
    if (filter === 'all') return true
    if (filter === 'featured') return gallery.featured
    if (filter === 'public') return gallery.public
    if (filter === 'private') return !gallery.public
    return true
  })

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <MobileLayout activeTab="gallery">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Client Galleries</h2>
            <p className="text-gray-400 text-sm sm:text-base">Manage client photo galleries and portfolios</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['all', 'featured', 'public', 'private'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType as any)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  filter === filterType 
                    ? 'bg-purple-600 text-white border border-purple-500' 
                    : 'bg-gray-800/50 text-gray-300 border border-gray-600 hover:bg-gray-700/50'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGalleries.map((gallery) => (
            <div key={gallery.id} className="bg-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all group">
              <div className="relative">
                <img
                  src={gallery.coverImage}
                  alt={gallery.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  {gallery.featured && (
                    <span className="bg-yellow-600/90 text-yellow-100 px-2 py-1 rounded-full text-xs font-semibold">
                      ⭐ Featured
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    gallery.public 
                      ? 'bg-green-600/90 text-green-100' 
                      : 'bg-red-600/90 text-red-100'
                  }`}>
                    {gallery.public ? '🌐 Public' : '🔒 Private'}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-black/70 text-white px-2 py-1 rounded-lg text-xs">
                    {gallery.images.length} photos
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white">{gallery.title}</h3>
                  <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
                    {gallery.category}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-300">
                    <span className="mr-2">👤</span>
                    <span>{gallery.client}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <span className="mr-2">📅</span>
                    <span>{new Date(gallery.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-purple-600/20 text-purple-400 rounded-lg text-sm font-medium border border-purple-600/30 hover:bg-purple-600/30 transition-all">
                    View Gallery
                  </button>
                  <button className="px-3 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm font-medium border border-blue-600/30 hover:bg-blue-600/30 transition-all">
                    Share
                  </button>
                  <button
                    onClick={() => {
                      updateGallery(gallery.id, { featured: !gallery.featured })
                      loadGalleries()
                    }}
                    className="px-3 py-2 bg-yellow-600/20 text-yellow-400 rounded-lg text-sm font-medium border border-yellow-600/30 hover:bg-yellow-600/30 transition-all"
                  >
                    ⭐
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGalleries.length === 0 && (
          <div className="bg-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-gray-300 text-xl font-semibold mb-2">
              No galleries found
            </div>
            <p className="text-gray-500">
              {filter === 'all' ? 'No galleries created yet' : `No ${filter} galleries found`}
            </p>
          </div>
        )}
      </div>
    </MobileLayout>
  )
}