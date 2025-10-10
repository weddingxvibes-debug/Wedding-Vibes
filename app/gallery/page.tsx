'use client'

import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { X, Play, Instagram } from 'lucide-react'
import Image from 'next/image'
import { mockInstagramData, MediaItem } from '@/lib/mock-instagram-data'

gsap.registerPlugin(ScrollTrigger)



export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'All Media' },
    { id: 'photography', name: 'Photography' },
    { id: 'videography', name: 'Videography' }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => 
        selectedCategory === 'photography' ? item.type === 'IMAGE' : item.type === 'VIDEO'
      )

  useEffect(() => {
    // Simulate loading time for better UX
    setTimeout(() => {
      setMediaItems(mockInstagramData)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    gsap.fromTo('.gallery-item',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.gallery-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [selectedCategory])

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-gold-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800">
      <Header />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 sm:mb-16 px-4 sm:px-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Photo Gallery
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our collection of beautiful moments captured by Priyanshu Malviya
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4 sm:px-0">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4 md:gap-6">
            {loading ? (
              Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              ))
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="gallery-item group cursor-pointer relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedItem(item)}
                >
                  <Image
                    src={item.type === 'VIDEO' ? item.thumbnail || item.url : item.url}
                    alt={item.caption}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    {item.type === 'VIDEO' ? (
                      <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    ) : (
                      <Instagram className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white font-medium text-sm">{item.caption}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No media found. Please check Instagram API configuration.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            
            {selectedItem.type === 'VIDEO' ? (
              <video
                src={selectedItem.url}
                controls
                className="max-w-full max-h-[80vh] rounded-lg"
                autoPlay
              />
            ) : (
              <Image
                src={selectedItem.url}
                alt={selectedItem.caption}
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            )}
            
            <p className="text-white text-center mt-4 text-lg">{selectedItem.caption}</p>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}