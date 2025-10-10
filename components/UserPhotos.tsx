'use client'

import { useState, useEffect } from 'react'
import { Image, Download, Eye, Calendar } from 'lucide-react'

const UserPhotos = () => {
  const [photos, setPhotos] = useState<any[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null)

  useEffect(() => {
    // Mock photos data - in real app, fetch from API
    const mockPhotos = [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500',
        eventType: 'Wedding',
        eventDate: '2024-01-15',
        album: 'Main Ceremony'
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500',
        eventType: 'Pre-Wedding',
        eventDate: '2024-01-10',
        album: 'Couple Shoot'
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500',
        eventType: 'Reception',
        eventDate: '2024-01-16',
        album: 'Reception Party'
      }
    ]
    setPhotos(mockPhotos)
  }, [])

  const handleDownload = (photo: any) => {
    // In real app, implement actual download functionality
    const link = document.createElement('a')
    link.href = photo.url
    link.download = `photo-${photo.id}.jpg`
    link.click()
  }

  return (
    <section id="photos" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            My Photos
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Access and download your beautiful memories captured by our professional photography
          </p>
        </div>

        {photos.length === 0 ? (
          <div className="text-center py-12">
            <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No photos available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your photos will appear here after your event is completed
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden aspect-square">
                <img
                  src={photo.url}
                  alt={`${photo.eventType} photo`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                    <button
                      onClick={() => setSelectedPhoto(photo)}
                      className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDownload(photo)}
                      className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-white text-sm font-medium">{photo.album}</p>
                  <div className="flex items-center text-white text-xs opacity-75">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(photo.eventDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Photo Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl z-10"
              >
                ×
              </button>
              
              <img
                src={selectedPhoto.url}
                alt={`${selectedPhoto.eventType} photo`}
                className="max-w-full max-h-full object-contain"
              />
              
              <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded-lg">
                <h3 className="text-lg font-semibold">{selectedPhoto.album}</h3>
                <p className="text-sm opacity-75">{selectedPhoto.eventType} • {new Date(selectedPhoto.eventDate).toLocaleDateString()}</p>
                
                <button
                  onClick={() => handleDownload(selectedPhoto)}
                  className="mt-2 flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default UserPhotos