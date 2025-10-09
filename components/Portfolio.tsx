'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, Play, Instagram } from 'lucide-react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

interface PortfolioItem {
  id: string
  type: 'image' | 'video'
  url: string
  thumbnail?: string
  caption: string
  category: string
}

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const portfolioRef = useRef<HTMLDivElement>(null)

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'weddings', name: 'Weddings' },
    { id: 'functions', name: 'Functions' },
    { id: 'events', name: 'Events' },
    { id: 'parties', name: 'Parties' },
    { id: 'videos', name: 'Videos' }
  ]

  // Mock portfolio data (replace with Instagram API integration)
  const mockPortfolioData: PortfolioItem[] = [
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
      caption: 'Beautiful Indian wedding ceremony by @wedding_vibes_rp',
      category: 'weddings'
    },
    {
      id: '2',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
      caption: 'Traditional wedding rituals captured by Priyanshu',
      category: 'weddings'
    },
    {
      id: '3',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800',
      caption: 'Ganpati celebration moments',
      category: 'functions'
    },
    {
      id: '4',
      type: 'video',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
      caption: 'Wedding highlights reel by @wedding_vibes_rp',
      category: 'videos'
    },
    {
      id: '5',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      caption: 'Corporate event photography',
      category: 'events'
    },
    {
      id: '6',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800',
      caption: 'Birthday celebration memories',
      category: 'parties'
    }
  ]

  useEffect(() => {
    // Simulate loading Instagram data
    setTimeout(() => {
      setPortfolioItems(mockPortfolioData)
      setLoading(false)
    }, 1000)

    // GSAP animations
    gsap.fromTo('.portfolio-item',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: portfolioRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory)

  const openLightbox = (item: PortfolioItem) => {
    setSelectedItem(item)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedItem(null)
    document.body.style.overflow = 'unset'
  }

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 gsap-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Our Portfolio
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our collection of beautiful moments captured through the lens
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 gsap-fade-in">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div ref={portfolioRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            ))
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="portfolio-item group cursor-pointer relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => openLightbox(item)}
              >
                <Image
                  src={item.type === 'video' ? item.thumbnail! : item.url}
                  alt={item.caption}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  {item.type === 'video' && (
                    <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-medium">{item.caption}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Instagram Link */}
        <div className="text-center mt-12 gsap-fade-in">
          <a
            href="https://instagram.com/wedding_vibes_rp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Instagram className="h-5 w-5" />
            @wedding_vibes_rp
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            
            {selectedItem.type === 'image' ? (
              <Image
                src={selectedItem.url}
                alt={selectedItem.caption}
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            ) : (
              <video
                src={selectedItem.url}
                controls
                className="max-w-full max-h-[80vh] rounded-lg"
              />
            )}
            
            <p className="text-white text-center mt-4 text-lg">{selectedItem.caption}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Portfolio