'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowDown } from 'lucide-react'

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
  }, [])

  const scrollToPortfolio = () => {
    const element = document.querySelector('#portfolio')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-gold-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-serif font-bold text-gray-900 dark:text-white mb-6"
        >
          Capturing Your
          <span className="block text-primary-600 dark:text-primary-400">
            Perfect Moments
          </span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Professional Indian wedding photography by Priyanshu Malviya. Capturing your unique love story through stunning visuals and timeless memories.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={scrollToPortfolio}
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Portfolio
          </button>
          <button 
            onClick={() => window.location.href = '/gallery'}
            className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Full Gallery
          </button>
          <button 
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
          >
            Get In Touch
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