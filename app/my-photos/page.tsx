'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import UserPhotos from '@/components/UserPhotos'
import Footer from '@/components/Footer'

export default function MyPhotosPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth/login')
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-pink-50 to-gold-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800">
      <Header />
      <div className="pt-20">
        <UserPhotos />
      </div>
      <Footer />
    </div>
  )
}