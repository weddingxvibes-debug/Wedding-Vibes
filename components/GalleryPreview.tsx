'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { getRandomPhotos, initializePhotosDB, type Photo } from '@/lib/photos-db'
import ResponsiveGalleryCarousel from './ResponsiveGalleryCarousel'

gsap.registerPlugin(ScrollTrigger)

const GalleryPreview = () => {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [previewPhotos, setPreviewPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      initializePhotosDB()
      setPreviewPhotos(getRandomPhotos(8))
      setLoading(false)
    }
    
    loadPhotos()
  }, [])

  useEffect(() => {
    if (!loading) {
      gsap.fromTo('.gallery-section',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  }, [loading])

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 sm:mb-12 gsap-fade-in px-4 sm:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-primary-600 via-pink-500 to-gold-500 bg-clip-text text-transparent mb-3 sm:mb-4">
            Recent Work
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4">
            A glimpse of beautiful moments captured by Priyanshu Malviya
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        <div ref={galleryRef} className="gallery-section mb-8 sm:mb-12">
          <ResponsiveGalleryCarousel photos={previewPhotos} loading={loading} />
        </div>

        <div className="text-center gsap-fade-in mt-8 sm:mt-12">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-pink-600 hover:from-primary-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Photos
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default GalleryPreview