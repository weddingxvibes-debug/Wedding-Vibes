'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowDown, Camera, Heart, Star, Sparkles } from 'lucide-react'

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check for user
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    const tl = gsap.timeline()
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )

    // Animate floating elements
    if (floatingElementsRef.current) {
      const elements = floatingElementsRef.current.children
      Array.from(elements).forEach((element, index) => {
        gsap.fromTo(element,
          { opacity: 0, scale: 0, rotation: 0 },
          {
            opacity: 0.6,
            scale: 1,
            rotation: 360,
            duration: 2,
            delay: index * 0.2,
            ease: 'back.out(1.7)',
            repeat: -1,
            repeatType: 'reverse',
            repeatDelay: 2
          }
        )
        
        gsap.to(element, {
          y: '+=20',
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.5
        })
      })
    }
  }, [])

  const scrollToGallery = () => {
    window.location.href = '/gallery'
  }

  const handleBookNow = () => {
    if (user) {
      window.location.href = '/my-bookings'
    } else {
      window.location.href = '/auth/login'
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with 3D elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-pink-50 to-gold-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
        
        {/* Floating 3D Elements */}
        <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 text-primary-300 dark:text-primary-600">
            <Camera className="h-12 w-12 transform rotate-12" />
          </div>
          <div className="absolute top-32 right-20 text-pink-300 dark:text-pink-600">
            <Heart className="h-8 w-8 transform -rotate-12" />
          </div>
          <div className="absolute top-1/4 left-1/4 text-gold-400 dark:text-gold-600">
            <Sparkles className="h-10 w-10 transform rotate-45" />
          </div>
          <div className="absolute bottom-1/3 right-1/4 text-primary-400 dark:text-primary-500">
            <Star className="h-6 w-6 transform -rotate-45" />
          </div>
          <div className="absolute bottom-20 left-20 text-pink-400 dark:text-pink-500">
            <Heart className="h-14 w-14 transform rotate-12" />
          </div>
          <div className="absolute top-1/2 right-10 text-gold-300 dark:text-gold-500">
            <Camera className="h-8 w-8 transform -rotate-12" />
          </div>
          <div className="absolute bottom-1/4 left-1/3 text-primary-300 dark:text-primary-600">
            <Sparkles className="h-12 w-12 transform rotate-90" />
          </div>
        </div>
        
        {/* Animated background shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-pink-200 dark:bg-pink-800 rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/6 w-16 h-16 bg-gold-200 dark:bg-gold-800 rounded-full opacity-25 animate-ping" style={{animationDelay: '2s'}}></div>
        </div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight"
        >
          Capturing Your
          <span className="block text-primary-600 dark:text-primary-400">
            Perfect Moments
          </span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
        >
          Professional Indian wedding photography by Priyanshu Malviya. Capturing your unique love story through stunning visuals and timeless memories.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
          <button 
            onClick={handleBookNow}
            className="w-full sm:w-auto bg-gradient-to-r from-primary-600 to-pink-600 hover:from-primary-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {user ? 'Create Booking' : 'Book Now'}
          </button>
          <button 
            onClick={scrollToGallery}
            className="w-full sm:w-auto border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 backdrop-blur-sm bg-white/10 dark:bg-gray-900/10"
          >
            View Gallery
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-gray-600 dark:text-gray-400" />
      </div>
    </section>
  )
}

export default Hero