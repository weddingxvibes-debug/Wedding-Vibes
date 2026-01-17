'use client'

import { Camera, Mail, Phone, MapPin, Instagram, Facebook, Youtube, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' }
  ]

  const services = [
    'Wedding Photography',
    'Wedding Videography',
    'Pre-wedding Shoots',
    'Function Photography',
    'Corporate Events',
    'Party Photography'
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Camera className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-serif font-bold">Wedding Vibes</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Capturing beautiful moments and creating timeless memories through professional photography by Priyanshu Malviya. Serving clients across India with passion and creativity.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Instagram, href: 'https://instagram.com/wedding_vibes_rp', color: 'hover:text-pink-400' },
                { icon: Facebook, href: 'https://facebook.com/wedding_vibes_rp', color: 'hover:text-blue-400' },
                { icon: Youtube, href: 'https://youtube.com/@wedding_vibes_rp', color: 'hover:text-red-400' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-colors hover:bg-gray-700`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+919425383179" className="text-gray-400 hover:text-primary-400 transition-colors block">
                    +91 94253 83179
                  </a>
                  <p className="text-gray-500 text-sm">Priyanshu Malviya - Betul, MP</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <a href="mailto:weddingxvibes@gmail.com" className="text-gray-400 hover:text-primary-400 transition-colors block">
                    weddingxvibes@gmail.com
                  </a>
                  <a href="mailto:bookings@weddingxvibes.gmail.com" className="text-gray-400 hover:text-primary-400 transition-colors block">
                    bookings@weddingxvibes.gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                <div className="text-gray-400">
                  <p>Betul, Madhya Pradesh</p>
                  <p>Available Pan-India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to get the latest updates on our work, photography tips, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-center md:text-left">
              <p>&copy; {currentYear} Wedding Vibes Photography. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-1 text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for capturing beautiful moments</span>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer