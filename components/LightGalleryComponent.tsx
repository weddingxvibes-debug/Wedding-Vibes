'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import lightGallery from 'lightgallery'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgFullscreen from 'lightgallery/plugins/fullscreen'
import lgShare from 'lightgallery/plugins/share'
import lgRotate from 'lightgallery/plugins/rotate'
import lgHash from 'lightgallery/plugins/hash'

// Import LightGallery CSS
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-fullscreen.css'
import 'lightgallery/css/lg-share.css'
import 'lightgallery/css/lg-rotate.css'

import { type Photo } from '@/lib/photos-db'
import SkeletonLoader from './SkeletonLoader'

gsap.registerPlugin(ScrollTrigger)

interface LightGalleryComponentProps {
  photos: Photo[]
  loading?: boolean
}

export default function LightGalleryComponent({ photos, loading = false }: LightGalleryComponentProps) {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set())
  const [allImagesLoaded, setAllImagesLoaded] = useState(false)

  useEffect(() => {
    if (!galleryRef.current || photos.length === 0) return

    const gallery = lightGallery(galleryRef.current, {
      plugins: [lgThumbnail, lgZoom, lgFullscreen, lgShare, lgRotate, lgHash],
      speed: 500,
      thumbnail: true,
      animateThumb: true,
      zoomFromOrigin: true,
      allowMediaOverlap: true,
      toggleThumb: true,
      thumbWidth: 100 as any,
      thumbHeight: 80 as any,
      thumbMargin: 5 as any,
      appendSubHtmlTo: '.lg-sub-html',
      subHtmlSelectorRelative: true,
      addClass: 'lg-custom-theme',
      mode: 'lg-slide' as any,
      cssEasing: 'cubic-bezier(0.25, 0, 0.25, 1)',
      share: true as any,
      facebook: true as any,
      twitter: true as any,
      pinterest: true as any,
      fullScreen: true as any,
      zoom: true as any,
      scale: 1 as any,
      enableZoomAfter: 300 as any,
      hash: true as any,
      galleryId: 1 as any
    } as any)

    // GSAP animations for gallery items
    gsap.fromTo('.gallery-item',
      { 
        opacity: 0, 
        scale: 0.8,
        y: 30
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    return () => {
      try {
        if (gallery && typeof gallery.destroy === 'function') {
          gallery.destroy()
        }
      } catch (error) {
        console.warn('Gallery cleanup error:', error)
      }
    }
  }, [photos, allImagesLoaded])

  const handleImageLoad = (photoId: string) => {
    setImagesLoaded(prev => {
      const newSet = new Set(prev)
      newSet.add(photoId)
      
      if (newSet.size === photos.length) {
        setAllImagesLoaded(true)
      }
      
      return newSet
    })
  }

  if (loading) {
    return <SkeletonLoader count={8} />
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-pink-100 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <svg className="h-8 w-8 text-primary-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No photos available</h3>
        <p className="text-gray-500 dark:text-gray-400">Photos will appear here once they are added to the gallery</p>
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        .lg-custom-theme .lg-backdrop {
          background-color: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
        }
        
        .lg-custom-theme .lg-toolbar {
          background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.1));
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(236, 72, 153, 0.2);
        }
        
        .lg-custom-theme .lg-toolbar .lg-icon {
          color: #ec4899;
          transition: all 0.3s ease;
        }
        
        .lg-custom-theme .lg-toolbar .lg-icon:hover {
          color: #db2777;
          transform: scale(1.1);
        }
        
        .lg-custom-theme .lg-thumb-outer {
          background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.1));
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(236, 72, 153, 0.2);
        }
        
        .lg-custom-theme .lg-thumb-item.active {
          border-color: #ec4899;
          box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
        }
        
        .lg-custom-theme .lg-sub-html {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(236, 72, 153, 0.1));
          backdrop-filter: blur(10px);
          color: white;
          padding: 20px;
          border-radius: 10px 10px 0 0;
        }
        
        .lg-custom-theme .lg-outer .lg-item {
          transition: all 0.5s cubic-bezier(0.25, 0, 0.25, 1);
        }
        
        .lg-custom-theme .lg-progress-bar .lg-progress {
          background: linear-gradient(90deg, #ec4899, #db2777);
        }
      `}</style>
      
      <div 
        ref={galleryRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="gallery-item group cursor-pointer relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
            data-src={photo.url}
            data-sub-html={`<h4 class="text-lg font-semibold mb-2">${photo.alt}</h4><p class="text-sm opacity-80">Captured by Wedding Vibes Photography</p>`}
          >
            <div className="relative w-full h-full bg-gradient-to-br from-primary-50 via-pink-50 to-gold-50 dark:from-gray-800 dark:via-purple-900 dark:to-gray-700">
              {!imagesLoaded.has(photo.id) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                className={`object-cover group-hover:scale-110 transition-all duration-700 ${
                  imagesLoaded.has(photo.id) ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(photo.id)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://via.placeholder.com/400x400/ec4899/ffffff?text=Wedding+Vibes'
                  handleImageLoad(photo.id)
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-sm font-medium truncate">{photo.alt}</p>
              </div>
              
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}