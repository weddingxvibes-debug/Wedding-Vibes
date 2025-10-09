'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Portfolio from '@/components/Portfolio'
import About from '@/components/About'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import EntryLoader from '@/components/EntryLoader'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
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
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <Hero />
      <Portfolio />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}