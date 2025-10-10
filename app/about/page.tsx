'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Award, Camera, Heart, Users, Star, CheckCircle } from 'lucide-react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  useEffect(() => {
    gsap.fromTo('.fade-in-up', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.fade-in-up',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])

  const team = [
    {
      name: 'Rajesh Sharma',
      role: 'Lead Photographer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      experience: '8+ Years',
      specialty: 'Wedding Photography'
    },
    {
      name: 'Priya Patel',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      experience: '6+ Years',
      specialty: 'Event Styling'
    },
    {
      name: 'Arjun Kumar',
      role: 'Videographer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      experience: '5+ Years',
      specialty: 'Cinematic Films'
    }
  ]

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We are passionate about capturing the emotions and beauty of your special moments.'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'We strive for excellence in every shot, ensuring the highest quality in our work.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients to understand their vision and bring it to life.'
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Our work has been recognized and appreciated by clients and industry professionals.'
    }
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary-50 to-gold-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center fade-in-up">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-6">
              About Our Story
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              With over 8 years of experience, we&apos;ve dedicated our lives to capturing the most precious moments 
              and creating timeless memories for families across India.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in-up">
              <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
                Our Journey
              </h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Wedding Vibes Photography was born from a simple belief: every moment is precious, 
                  and every story deserves to be told beautifully. What started as a passion project 
                  in 2016 has grown into one of India&apos;s most trusted photography studios.
                </p>
                <p>
                  Our founder, Rajesh Sharma, began this journey with a camera and a dream to capture 
                  the authentic emotions of Indian weddings. Over the years, we have expanded our team 
                  and services, but our core mission remains the same - to preserve your most 
                  cherished memories with artistry and care.
                </p>
                <p>
                  Today, we&apos;re proud to have captured over 500 weddings, countless celebrations, 
                  and thousands of smiles. Each project teaches us something new and reminds us 
                  why we fell in love with photography in the first place.
                </p>
              </div>
            </div>
            
            <div className="fade-in-up">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600"
                  alt="Our photography journey"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-6 rounded-xl shadow-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm opacity-90">Happy Couples</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide us in creating exceptional photography experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="fade-in-up text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
                  <value.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The talented individuals behind every beautiful photograph
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="fade-in-up text-center">
                <div className="relative mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="rounded-2xl mx-auto shadow-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                  {member.role}
                </p>
                <div className="space-y-1 text-gray-600 dark:text-gray-400">
                  <p>{member.experience} Experience</p>
                  <p>Specialty: {member.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Wedding Vibes?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              'Professional equipment and latest technology',
              'Experienced team with 8+ years in the industry',
              'Personalized approach for each client',
              'Quick turnaround time for photo delivery',
              'Comprehensive coverage of all events',
              'Competitive pricing with transparent packages',
              'Post-production and editing expertise',
              '24/7 customer support and consultation'
            ].map((feature, index) => (
              <div key={index} className="fade-in-up flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}