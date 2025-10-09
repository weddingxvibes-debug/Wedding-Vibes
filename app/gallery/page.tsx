'use client'

import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { X, Heart, Download } from 'lucide-react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'weddings', name: 'Weddings' },
    { id: 'ceremonies', name: 'Ceremonies' },
    { id: 'couples', name: 'Couples' },
    { id: 'families', name: 'Families' }
  ]

  const galleryImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800', category: 'weddings', title: 'Beautiful Wedding Ceremony by @wedding_vibes_rp' },
    { id: 2, src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800', category: 'ceremonies', title: 'Traditional Rituals by Priyanshu' },
    { id: 3, src: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800', category: 'ceremonies', title: 'Sacred Moments' },
    { id: 4, src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800', category: 'couples', title: 'Love Portrait @wedding_vibes_rp' },
    { id: 5, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', category: 'families', title: 'Family Joy' },
    { id: 6, src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800', category: 'families', title: 'Celebration Time' },
    { id: 7, src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800', category: 'weddings', title: 'Wedding Bliss' },
    { id: 8, src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800', category: 'couples', title: 'Romantic Moments' }
  ]

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  useEffect(() => {
    gsap.fromTo('.gallery-item',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.gallery-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [selectedCategory])

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Photo Gallery
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our collection of beautiful moments captured by Priyanshu Malviya
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="gallery-item group cursor-pointer relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedImage(image.src)}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-medium text-sm">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <Image
              src={selectedImage}
              alt="Gallery image"
              width={800}
              height={600}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}