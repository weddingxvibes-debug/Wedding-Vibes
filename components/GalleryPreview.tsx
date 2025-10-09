'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { mockInstagramData } from '@/lib/mock-instagram-data'

gsap.registerPlugin(ScrollTrigger)

const GalleryPreview = () => {
  const galleryRef = useRef<HTMLDivElement>(null)

  const previewImages = mockInstagramData.slice(0, 6).map(item => item.url)

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
          {previewImages.map((image, index) => (
            <div
              key={index}
              className="gallery-preview-item group cursor-pointer relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={image}
                alt={`Gallery preview ${index + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        <div className="text-center gsap-fade-in">
          <button
            onClick={() => window.location.href = '/gallery'}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View All Photos
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default GalleryPreview