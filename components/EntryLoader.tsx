'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface EntryLoaderProps {
  onComplete: () => void
}

const EntryLoader = ({ onComplete }: EntryLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setIsVisible(false)
          onComplete()
        }, 500)
      }
    })

    // Animate letters of "Wedding Vibes"
    tl.fromTo('.letter', 
      { opacity: 0, y: 100, rotationX: -90 },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }
    )
    .fromTo('.tagline',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    .to('.loader-content', 
      { scale: 0.8, opacity: 0.8, duration: 0.5 },
      '+=1'
    )
    .to('.loader-bg',
      { 
        clipPath: 'circle(0% at 50% 50%)',
        duration: 1.2,
        ease: 'power4.inOut'
      }
    )
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="loader-bg fixed inset-0 z-50 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 flex items-center justify-center">
      <div className="loader-content text-center">
        <div className="mb-8">
          <div className="text-6xl md:text-8xl font-serif font-bold text-white mb-4">
            {'Wedding Vibes'.split('').map((char, index) => (
              <span 
                key={index} 
                className={`letter inline-block ${char === ' ' ? 'w-4' : ''}`}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
          <div className="tagline text-xl md:text-2xl text-primary-100 font-light tracking-wider">
            by Priyanshu Malviya
          </div>
        </div>
        
        {/* Loading animation */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EntryLoader