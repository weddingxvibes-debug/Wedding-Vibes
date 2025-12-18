'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useAuth } from '@/lib/useAuth'
import { Menu, X, Sun, Moon, Camera, User, LogOut, Calendar, Image as ImageIcon, ChevronDown } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Gallery', href: '/gallery' }
  ]

  const scrollToSection = (href: string) => {
    if (href.startsWith('/')) {
      router.push(href)
    } else if (href === '#home') {
      router.push('/')
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  const handleLogout = async () => {
    if (user?.provider === 'google') {
      await signOut({ callbackUrl: '/' })
    }
    localStorage.removeItem('user')
    localStorage.removeItem('bookings')
    router.push('/')
  }

  if (!mounted) return null

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-primary-600" />
            <div>
              <span className="text-2xl font-serif font-bold text-gray-900 dark:text-white block">
                Wedding Vibes
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                by Priyanshu Malviya
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Auth & Controls */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden md:block relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-medium">
                    {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-700/50 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name || 'User'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        router.push('/my-bookings')
                        setIsProfileOpen(false)
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Calendar className="h-4 w-4 mr-3" />
                      My Bookings
                    </button>
                    
                    <button
                      onClick={() => {
                        router.push('/my-photos')
                        setIsProfileOpen(false)
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <ImageIcon className="h-4 w-4 mr-3" />
                      My Photos
                    </button>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                      <button
                        onClick={() => {
                          setTheme(theme === 'dark' ? 'light' : 'dark')
                          setIsProfileOpen(false)
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        {theme === 'dark' ? <Sun className="h-4 w-4 mr-3" /> : <Moon className="h-4 w-4 mr-3" />}
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                      </button>
                      
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsProfileOpen(false)
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={() => router.push('/auth/login')}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push('/auth/register')}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  Sign Up
                </button>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {item.name}
              </button>
            ))}
            
            <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
              {user ? (
                <>
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name || 'User'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      router.push('/my-bookings')
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Calendar className="h-5 w-5 mr-3" />
                    My Bookings
                  </button>
                  
                  <button
                    onClick={() => {
                      router.push('/my-photos')
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <ImageIcon className="h-5 w-5 mr-3" />
                    My Photos
                  </button>
                  
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {theme === 'dark' ? <Sun className="h-5 w-5 mr-3" /> : <Moon className="h-5 w-5 mr-3" />}
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </button>
                  
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      router.push('/auth/login')
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
                  >
                    <User className="h-5 w-5 mr-3" />
                    Login
                  </button>
                  <div className="px-4 py-2">
                    <button
                      onClick={() => {
                        router.push('/auth/register')
                        setIsMenuOpen(false)
                      }}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-center"
                    >
                      Sign Up
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="flex items-center w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {theme === 'dark' ? <Sun className="h-5 w-5 mr-3" /> : <Moon className="h-5 w-5 mr-3" />}
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header