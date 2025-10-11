'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { getRandomPhotos, initializePhotosDB, type Photo } from '@/lib/photos-db'

gsap.registerPlugin(ScrollTrigger)

const GalleryPreview = () => {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [previewPhotos, setPreviewPhotos] = useState<Photo[]>([])

  useEffect(() => {
    initializePhotosDB()
    setPreviewPhotos(getRandomPhotos(6))
  }, [])

  useEffect(() => {
    gsap.fromTo('.gallery-preview-item',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 sm:mb-16 gsap-fade-in px-4 sm:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Recent Work
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A glimpse of beautiful moments captured by Priyanshu Malviya
          </p>
        </div>

        <div ref={galleryRef} className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-8 sm:mb-12">
          {previewPhotos.length > 0 ? previewPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="gallery-preview-item group cursor-pointer relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://via.placeholder.com/400x400/374151/9CA3AF?text=No+Image'
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            </div>
          )) : (
            // Placeholder when no photos available
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="gallery-preview-item aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center"
              >
                <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            ))
          )}
        </div>

        <div className="text-center gsap-fade-in">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View All Photos
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default GalleryPreview