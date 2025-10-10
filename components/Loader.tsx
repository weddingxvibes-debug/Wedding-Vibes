'use client'

import { useEffect, useState } from 'react'

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [visibleLetters, setVisibleLetters] = useState(0)
  const text = 'Wedding Vibes'

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleLetters(prev => {
          if (prev >= text.length) {
            clearInterval(interval)
            setTimeout(() => setIsVisible(false), 1500)
            return prev
          }
          return prev + 1
        })
      }, 100)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-4 tracking-wider">
          {text.split('').map((letter, index) => (
            <span
              key={index}
              className={`inline-block transition-all duration-300 ${
                index < visibleLetters 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-4'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>
        <p className="text-xl text-gray-300 animate-fade-in-delayed">Capturing Love Stories</p>
      </div>

      <style jsx>{`
        @keyframes fade-in-delayed {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-delayed {
          animation: fade-in-delayed 0.8s ease-out 2s both;
        }
      `}</style>
    </div>
  )
}

export default Loader