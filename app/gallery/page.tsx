'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import LightGalleryComponent from '@/components/LightGalleryComponent'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Photo {
  id: string
  url: string
  alt: string
  category: string
  createdAt: string
}

interface PhotoFolder {
  id: string
  name: string
  photos: Photo[]
  createdAt: string
}

export default function GalleryPage() {
  const [folders, setFolders] = useState<PhotoFolder[]>([])
  const [selectedFolder, setSelectedFolder] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadGallery = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/gallery/folders')
        if (response.ok) {
          const foldersData = await response.json()
          setFolders(foldersData)
        }
      } catch (error) {
        console.error('Failed to fetch folders:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadGallery()
  }, [])

  useEffect(() => {
    if (!loading) {
      gsap.fromTo('.gallery-header',
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
      
      gsap.fromTo('.filter-button',
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.5, 
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.3
        }
      )
    }
  }, [loading, folders])

  const allPhotos = folders.flatMap(folder => folder.photos)
  const displayPhotos = selectedFolder === 'all' 
    ? allPhotos 
    : folders.find(f => f.id === selectedFolder)?.photos || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-gold-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 transition-colors duration-300">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="text-center mb-12 gallery-header">
          <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary-600 via-pink-500 to-gold-500 bg-clip-text text-transparent mb-4">
            Our Gallery
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Capturing beautiful moments that last forever - A collection of our finest wedding photography
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedFolder('all')}
            className={`filter-button px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedFolder === 'all'
                ? 'bg-gradient-to-r from-primary-600 to-pink-600 text-white shadow-lg shadow-primary-500/25'
                : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700/80 border border-gray-200 dark:border-gray-600'
            }`}
          >
            All Photos
          </button>
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolder(folder.id)}
              className={`filter-button px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedFolder === folder.id
                  ? 'bg-gradient-to-r from-primary-600 to-pink-600 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700/80 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {folder.name}
            </button>
          ))}
        </div>

        <LightGalleryComponent 
          photos={displayPhotos} 
          loading={loading}
        />
      </div>
    </div>
  )
}
