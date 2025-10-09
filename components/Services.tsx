'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Camera, 
  Video, 
  Heart, 
  Users, 
  Calendar, 
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo('.service-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])

  const services = [
    {
      icon: Heart,
      title: 'Wedding Photography',
      description: 'Complete wedding coverage from pre-wedding shoots to reception ceremonies',
      features: [
        'Pre-wedding photoshoot',
        'Ceremony documentation',
        'Reception coverage',
        'Edited photo gallery',
        'Print-ready images'
      ],
      price: 'Starting from ₹50,000',
      popular: true
    },
    {
      icon: Video,
      title: 'Wedding Videography',
      description: 'Cinematic wedding films that tell your love story beautifully',
      features: [
        'Highlight reel (3-5 min)',
        'Full ceremony recording',
        'Drone footage',
        'Same-day edit',
        '4K quality delivery'
      ],
      price: 'Starting from ₹75,000',
      popular: false
    },
    {
      icon: Users,
      title: 'Function Photography',
      description: 'Capture special moments at baby showers, Ganpati celebrations, and more',
      features: [
        'Event documentation',
        'Candid photography',
        'Group photos',
        'Digital gallery',
        'Quick turnaround'
      ],
      price: 'Starting from ₹25,000',
      popular: false
    },
    {
      icon: Calendar,
      title: 'Corporate Events',
      description: 'Professional coverage for seminars, conferences, and corporate functions',
      features: [
        'Event highlights',
        'Speaker photography',
        'Networking moments',
        'Brand-focused shots',
        'Same-day delivery'
      ],
      price: 'Starting from ₹30,000',
      popular: false
    },
    {
      icon: Star,
      title: 'Party Photography',
      description: 'Fun and vibrant photography for birthdays, anniversaries, and celebrations',
      features: [
        'Candid moments',
        'Party highlights',
        'Group photography',
        'Fun props included',
        'Social media ready'
      ],
      price: 'Starting from ₹20,000',
      popular: false
    },
    {
      icon: Camera,
      title: 'Custom Packages',
      description: 'Tailored photography solutions for your specific needs and budget',
      features: [
        'Personalized planning',
        'Flexible timing',
        'Custom deliverables',
        'Multiple photographers',
        'Extended coverage'
      ],
      price: 'Contact for quote',
      popular: false
    }
  ]

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 gsap-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Professional photography and videography services tailored to capture your special moments
          </p>
        </div>

        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                service.popular ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                  <service.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                  {service.price}
                </div>
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2 group">
                  <span>Get Quote</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center gsap-fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Wedding Vibes Photography?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  24/7
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Customer Support
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  48hrs
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Quick Preview Delivery
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  100%
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Satisfaction Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services