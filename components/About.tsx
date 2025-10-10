'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, Camera, Heart, Users } from 'lucide-react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Parallax effect for image
    gsap.fromTo(imageRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    gsap.fromTo(contentRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Stats animation
    gsap.fromTo('.stat-number',
      { textContent: 0 },
      {
        textContent: (i: number, target: Element) => target.getAttribute('data-value'),
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: '.stats-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])

  const stats = [
    { icon: Heart, number: 500, label: 'Happy Couples', suffix: '+' },
    { icon: Camera, number: 1000, label: 'Events Captured', suffix: '+' },
    { icon: Award, number: 8, label: 'Years Experience', suffix: '' },
    { icon: Users, number: 50, label: 'Team Members', suffix: '+' }
  ]

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div ref={aboutRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
                alt="Photographer"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-8 -right-8 bg-primary-600 text-white p-6 rounded-xl shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold">8+</div>
                <div className="text-sm opacity-90">Years of Excellence</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="gsap-fade-in">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">
                About Our Story
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                With over 8 years of experience in capturing the most precious moments, 
                we specialize in Indian wedding photography that tells your unique love story. 
                Our passion lies in preserving the emotions, traditions, and joy that make 
                your special day unforgettable.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                From intimate ceremonies to grand celebrations, we blend traditional 
                photography with modern techniques to create timeless memories that 
                you&apos;ll cherish forever. Every click captures not just an image, 
                but the essence of your beautiful journey.
              </p>
            </div>

            {/* Specialties */}
            <div className="gsap-fade-in">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Our Specialties
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Indian Weddings',
                  'Pre-wedding Shoots',
                  'Baby Showers',
                  'Ganpati Celebrations',
                  'Corporate Events',
                  'Birthday Parties'
                ].map((specialty, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-container mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center gsap-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                <stat.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                <span className="stat-number" data-value={stat.number}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About