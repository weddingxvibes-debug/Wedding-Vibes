'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  rating: number
  text: string
  event: string
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Priya & Arjun Sharma',
      role: 'Wedding Couple',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 5,
      text: 'Wedding Vibes Photography made our special day absolutely magical! Their attention to detail and ability to capture candid moments was incredible. We couldn\'t be happier with our wedding photos.',
      event: 'Traditional Indian Wedding'
    },
    {
      id: 2,
      name: 'Meera Patel',
      role: 'Event Organizer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      rating: 5,
      text: 'Professional, creative, and reliable! They captured our Ganpati celebration beautifully. The team was so organized and made everyone feel comfortable. Highly recommended!',
      event: 'Ganpati Visarjan Celebration'
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      role: 'Corporate Client',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      rating: 5,
      text: 'Excellent work on our corporate seminar. They understood our brand requirements perfectly and delivered professional photos that exceeded our expectations. Great team to work with!',
      event: 'Corporate Seminar'
    },
    {
      id: 4,
      name: 'Anita & Family',
      role: 'Family Client',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 5,
      text: 'They made our daughter\'s first birthday so special! The photographers were patient with kids and captured the most beautiful candid moments. The photos are treasured memories now.',
      event: 'Birthday Celebration'
    },
    {
      id: 5,
      name: 'Vikram & Sneha',
      role: 'Pre-wedding Couple',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      rating: 5,
      text: 'Our pre-wedding shoot was amazing! They suggested beautiful locations and poses. The final photos were like a fairy tale. Can\'t wait for them to shoot our wedding too!',
      event: 'Pre-wedding Photoshoot'
    }
  ]

  useEffect(() => {
    gsap.fromTo('.testimonial-card',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 gsap-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear from the couples and families we've had the pleasure to work with
          </p>
        </div>

        <div ref={testimonialsRef} className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Slider */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-800 p-8 md:p-12">
            <div 
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card w-full flex-shrink-0">
                  <div className="text-center">
                    {/* Quote Icon */}
                    <Quote className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-6" />
                    
                    {/* Rating */}
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-medium">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Client Info */}
                    <div className="flex items-center justify-center space-x-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900 dark:text-white text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </div>
                        <div className="text-primary-600 dark:text-primary-400 text-sm">
                          {testimonial.event}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-600 dark:bg-primary-400'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center gsap-fade-in">
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              500+
            </div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">
              Happy Clients
            </div>
          </div>
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              4.9/5
            </div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">
              Average Rating
            </div>
          </div>
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              100%
            </div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">
              Satisfaction Rate
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials