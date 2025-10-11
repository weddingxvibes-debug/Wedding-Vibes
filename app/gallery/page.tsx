'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getPhotoFolders, initializePhotosDB, type PhotoFolder, type Photo } from '@/lib/photos-db'
import Link from 'next/link'

export default function GalleryPage() {
  const [folders, setFolders] = useState<PhotoFolder[]>([])
  const [selectedFolder, setSelectedFolder] = useState<string>('all')
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  useEffect(() => {
    initializePhotosDB()
    setFolders(getPhotoFolders())
  }, [])

  const allPhotos = folders.flatMap(folder => folder.photos)
  const displayPhotos = selectedFolder === 'all' 
    ? allPhotos 
    : folders.find(f => f.id === selectedFolder)?.photos || []

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-white hover:text-purple-300 transition-colors">
                Wedding Vibes
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/gallery" className="text-white">Gallery</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Our Gallery</h1>
          <p className="text-gray-400 text-lg">Capturing beautiful moments that last forever</p>
        </div>

        <div className="flex justify-center space-x-2 mb-8">
          <button
            onClick={() => setSelectedFolder('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              selectedFolder === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            All Photos
          </button>
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolder(folder.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedFolder === folder.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              {folder.name}
            </button>
          ))}
        </div>

        {displayPhotos.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No photos available</h3>
            <p className="text-gray-500">Photos will appear here once they are added to the gallery</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayPhotos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square bg-gray-800/30 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedPhoto(photo)}
              >
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'https://via.placeholder.com/400x400/374151/9CA3AF?text=No+Image'
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={selectedPhoto.url}
              alt={selectedPhoto.alt}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <p className="text-white text-center mt-4">{selectedPhoto.alt}</p>
          </div>
        </div>
      )}
    </div>
  )
}