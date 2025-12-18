'use client'

import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import lightGallery from 'lightgallery'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgFullscreen from 'lightgallery/plugins/fullscreen'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'

// Import LightGallery CSS
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-fullscreen.css'

import { type Photo } from '@/lib/photos-db'

gsap.registerPlugin(ScrollTrigger)

interface ResponsiveGalleryCarouselProps {
  photos: Photo[]
  loading?: boolean
}

export default function ResponsiveGalleryCarousel({ photos, loading = false }: ResponsiveGalleryCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!galleryRef.current || photos.length === 0) return

    const gallery = lightGallery(galleryRef.current, {
      plugins: [lgThumbnail, lgZoom, lgFullscreen],
      speed: 500,
      thumbnail: true,
      animateThumb: true,
      zoomFromOrigin: true,
      allowMediaOverlap: true,
      toggleThumb: true,
      addClass: 'lg-custom-theme',
      mode: 'lg-slide',
    })

    return () => {
      try {
        if (gallery && typeof gallery.destroy === 'function') {
          gallery.destroy()
        }
      } catch (error) {
        console.warn('Gallery cleanup error:', error)
      }
    }
  }, [photos])

  useEffect(() => {
    if (carouselRef.current) {
      gsap.fromTo(carouselRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  }, [])

  const handleImageLoad = (photoId: string) => {
    setImagesLoaded(prev => {
      const newSet = new Set(prev)
      newSet.add(photoId)
      return newSet
    })
  }

  if (loading || photos.length === 0) {
    return (
      <div className="w-full">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 30 }
          }}
          className="w-full"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="aspect-square bg-gradient-to-br from-primary-50 via-pink-50 to-gold-50 dark:from-gray-800 dark:via-purple-900 dark:to-gray-700 rounded-lg overflow-hidden animate-pulse">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary-200 dark:bg-gray-600 rounded-full animate-bounce">
                    <svg className="w-6 h-6 text-primary-400 dark:text-gray-500 m-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  }

  return (
    <div ref={carouselRef} className="w-full">
      <div ref={galleryRef} className="hidden">
        {photos.map((photo) => (
          <div key={photo.id} data-src={photo.url} data-sub-html={photo.alt}></div>
        ))}
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection: false
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom'
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 15,
            centeredSlides: true
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: false
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 25,
            centeredSlides: false
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
            centeredSlides: false
          }
        }}
        effect="slide"
        speed={800}
        loop={true}
        className="w-full gallery-carousel"
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={photo.id}>
            <div
              className="group cursor-pointer relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              onClick={() => {
                const galleryElement = galleryRef.current
                if (galleryElement) {
                  const lgInstance = (galleryElement as any).lgInstance
                  if (lgInstance) {
                    lgInstance.openGallery(index)
                  }
                }
              }}
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
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-sm font-medium truncate">{photo.alt}</p>
                </div>
                
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="flex justify-center items-center mt-6 gap-4">
        <button className="swiper-button-prev-custom w-12 h-12 bg-gradient-to-r from-primary-500 to-pink-500 hover:from-primary-600 hover:to-pink-600 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary-400 rounded-full auto-play-indicator"></div>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium hidden sm:block">Auto-playing</span>
          <div className="w-2 h-2 bg-primary-400 rounded-full auto-play-indicator" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <button className="swiper-button-next-custom w-12 h-12 bg-gradient-to-r from-primary-500 to-pink-500 hover:from-primary-600 hover:to-pink-600 text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .gallery-carousel .swiper-pagination {
          bottom: -50px !important;
        }
        
        .gallery-carousel .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          margin: 0 6px !important;
          transition: all 0.3s ease !important;
        }
        
        .gallery-carousel .swiper-pagination-bullet-active {
          transform: scale(1.2) !important;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5) !important;
        }
        
        .gallery-carousel .swiper-slide {
          transition: all 0.3s ease !important;
        }
        
        .gallery-carousel .swiper-slide-active {
          transform: scale(1.02) !important;
        }
      `}</style>
    </div>
  )
}