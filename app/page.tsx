'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import GalleryPreview from '@/components/GalleryPreview'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import UserBookings from '@/components/UserBookings'
import UserPhotos from '@/components/UserPhotos'
import Footer from '@/components/Footer'
import EntryLoader from '@/components/EntryLoader'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [showLoader, setShowLoader] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check for user
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    if (!showLoader) {
      // Initialize GSAP animations after loader
      gsap.fromTo('.gsap-fade-in', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.gsap-fade-in',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  }, [showLoader])

  if (showLoader) {
    return <EntryLoader onComplete={() => setShowLoader(false)} />
  }

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 via-pink-50 to-gold-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 transition-colors duration-300">
      <Header />
      <Hero />
      <GalleryPreview />
      <About />
      <Testimonials />
      <Footer />
    </main>
  )
}